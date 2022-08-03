import { IUserCreateDTO } from "../dtos/IUserCreateDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  create(data: IUserCreateDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
