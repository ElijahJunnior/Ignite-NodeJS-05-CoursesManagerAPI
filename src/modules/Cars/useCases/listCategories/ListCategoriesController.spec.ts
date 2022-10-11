import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List Categories", () => {
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

  it("Should be able to list all categories", async () => {
    const resToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = resToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Sedan",
        description: "Carros longos e baixos",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const res = await request(app).get("/categories");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0].name).toBe("Sedan");
  });
});
