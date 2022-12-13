// Os arquivos Seed tem como objetivo criar os dados iniciais na base de dados

import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection();

  const id = uuid();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS (id, name, email, password, "isAdmin", driver_license, created_at)
    VALUES ('${id}', 'Administrador', 'admin@rentx.com.br', '${password}', true, '123456', now())`
  );

  await connection.close();
}

create().then(() => console.log("User admin created"));
