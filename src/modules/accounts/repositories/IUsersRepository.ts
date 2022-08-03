import { IUserCreateDTO } from "../dtos/IUserCreateDTO";

interface IUsersRepository {
  create(data: IUserCreateDTO): Promise<void>;
}

export { IUsersRepository };
