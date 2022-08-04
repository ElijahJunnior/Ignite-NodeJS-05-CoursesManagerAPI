interface IRequest {
  email: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ email, password }: IRequest) {
    // verificar se o usuario existe
    // verificar se a senha está correta
    // gerar jsonwebtoken
  }
}
