import { createConnection, getConnectionOptions } from "typeorm";

// cria uma interface para tornar possível alterar um objeto Read Only
interface IOptions {
  host: string;
}

getConnectionOptions().then((options) => {
  // copia a variável options para tornar possível editá-la
  const newOptions = options as IOptions;
  // adiciona ao host o nome do serviço do docker onde fica a sua base de dados
  newOptions.host = "database_rentx";
  // cria a conexão
  createConnection({ ...options });
});
