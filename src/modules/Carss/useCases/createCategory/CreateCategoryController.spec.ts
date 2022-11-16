import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS (id, name, email, password, "isAdmin", driver_license, created_at)
      VALUES ('${id}', 'Administrador', 'admin@rentx.com.br', '${password}', true, '123456', now())`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    connection.close();
  });

  it("Should be able to create a new category", async () => {
    const resToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = resToken.body;

    const res = await request(app)
      .post("/categories")
      .send({
        name: "Sedan",
        description: "Carros longos e baixos",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(res.status).toBe(201);
  });

  it("should not be able to create a two or more categories with same name", async () => {
    const resToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = resToken.body;

    const resCategory1 = await request(app)
      .post("/categories")
      .send({
        name: "Sedan2",
        description: "Carros longos e baixos",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const resCategory2 = await request(app)
      .post("/categories")
      .send({
        name: "Sedan2",
        description: "Carros longos e baixos",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(resCategory1.status).toBe(201);
    expect(resCategory2.status).toBe(400);
  });
});
