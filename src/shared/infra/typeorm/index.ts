import { Connection, createConnection, getConnectionOptions } from "typeorm";

// Altera o nome da base informado no ormconfig
export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  );
};
