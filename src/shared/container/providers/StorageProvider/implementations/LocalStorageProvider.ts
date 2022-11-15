import fs from "fs";
import { resolve } from "path";

import upload from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    // move o arquivo de um local para outro
    await fs.promises.rename(
      // resolve o path absoluto atual do arquivo
      resolve(upload.tmpFolder, file),
      // resolve o novo path absoluto do arquivo
      resolve(`${upload.tmpFolder}/${folder}`)
    );

    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    // Resolvendo o path absoluto do arquivo
    const file_name = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      // Verifica se o arquivo está acessível
      await fs.promises.stat(file_name);
    } catch {
      return;
    }
    // apaga o arquivo
    await fs.promises.unlink(file_name);
  }
}

export { LocalStorageProvider };
