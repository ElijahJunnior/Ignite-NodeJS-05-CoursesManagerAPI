import { AppError } from "@errors/AppError";
import { IUserCreateDTO } from "@modules/accounts/dtos/IUserCreateDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";

let repository: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    repository = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(repository);
    createUserUseCase = new CreateUserUseCase(repository);
  });

  it("shoud be able to authenticate a user", async () => {
    const user: IUserCreateDTO = {
      driver_license: "112233",
      email: "email@teste.com",
      name: "User Teste",
      password: "senha123",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "email@teste.com",
        password: "senha123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: IUserCreateDTO = {
        driver_license: "112233",
        email: "email@teste.com",
        name: "User Teste",
        password: "senha123",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "senha321",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
