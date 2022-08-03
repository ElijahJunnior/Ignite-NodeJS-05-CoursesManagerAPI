import { inject, injectable } from "tsyringe";

import { IUserCreateDTO } from "../../dtos/IUserCreateDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({
    name,
    username,
    email,
    password,
    driver_license,
  }: IUserCreateDTO): Promise<void> {
    await this.userRepository.create({
      name,
      username,
      email,
      password,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
