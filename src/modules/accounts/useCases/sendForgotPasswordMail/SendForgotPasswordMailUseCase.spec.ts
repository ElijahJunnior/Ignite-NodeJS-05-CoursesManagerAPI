import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDataProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/InMemory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let usersRepository: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe("Send Forgot Password Mail Use Case", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    const email = "user@rentx.com.br";

    await usersRepository.create({
      driver_license: "596053",
      email,
      name: "User Test",
      password: "Password123",
    });

    await sendForgotPasswordMailUseCase.execute(email);

    expect(sendMail).toHaveBeenCalled();
  });

  it("Shouldn't be able to sent email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("un_exists@rentx.com.br")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("Should be able to create an users token", async () => {
    const tokenMailCreation = jest.spyOn(usersTokensRepository, "create");
    const email = "user@rentx.com.br";

    await usersRepository.create({
      driver_license: "596053",
      email,
      name: "User Test",
      password: "Password123",
    });

    await sendForgotPasswordMailUseCase.execute(email);

    expect(tokenMailCreation).toHaveBeenCalled();
  });
});
