import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

// Resolve path absoluto para gravação temporária da arquivos
const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
  // exporta path
  tmpFolder,
  // cria um objeto de configuração para o Multer
  storage: multer.diskStorage({
    // path onde o arquivo vai ser salvo
    destination: tmpFolder,
    // função que determina o nome do arquivo que vai ser carregado
    filename: (request, file, callback) => {
      // gera um string de caracteres aleatórios
      const fileHash = crypto.randomBytes(16).toString("hex");

      // gera o nome somando o nome original do arquivo ao string aleatório
      const fileName = `${fileHash}-${file.originalname}`;

      // retorna um callback com o nome gerado
      return callback(null, fileName);
    },
  }),
};
