import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    // Pegando o parametro id e mudando o nome para car_id
    const { id: car_id } = req.params;

    // Pegando as imagens inseridas pelo mutex e forçando o tipo do filename para string
    const images = req.files as IFiles[];

    // Instancia o use case com uma injeção de dependencia
    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

    // Monta um array de string com os nomes das imagens
    const images_name = images.map((image) => image.filename);

    // Executa o useCase
    await uploadCarImageUseCase.execute({ car_id, images_name });

    return res.status(201).send();
  }
}

export { UploadCarImagesController };
