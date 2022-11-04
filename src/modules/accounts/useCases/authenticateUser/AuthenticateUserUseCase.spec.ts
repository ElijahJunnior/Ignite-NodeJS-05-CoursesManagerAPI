import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDataProvider";
import { AppError } from "@shared/errors/AppError";

let repository: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let dataProvider: DayjsDateProvider;

describe("Authenticate User", () => {
  beforeEach(() => {
    repository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    dataProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      repository,
      usersTokensRepository,
      dataProvider
    );
    createUserUseCase = new CreateUserUseCase(repository);
  });

  it("should be able to authenticate a user", async () => {
    const user: ICreateUserDTO = {
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

  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "email@teste.com",
        password: "senha123",
      })
    ).rejects.toEqual(new AppError("E-mail or password incorrect!"));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "112233",
      email: "email@teste.com",
      name: "User Teste",
      password: "senha123",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "senha321",
      })
    ).rejects.toEqual(new AppError("E-mail or password incorrect!"));
  });
});
