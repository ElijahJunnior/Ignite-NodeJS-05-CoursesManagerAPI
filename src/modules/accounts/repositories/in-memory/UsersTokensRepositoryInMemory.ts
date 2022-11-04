import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByToken(refresh_token: string): Promise<UserTokens> {
    return this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );
  }

  async findByTokenAndUserId(
    refresh_token: string,
    user_id: string
  ): Promise<UserTokens> {
    return this.usersTokens.find(
      (userToken) =>
        userToken.refresh_token === refresh_token &&
        userToken.user_id === user_id
    );
  }

  async deleteById(id: string): Promise<void> {
    this.usersTokens.splice(
      this.usersTokens.findIndex((usersTokens) => usersTokens.id === id)
    );
  }
}

export { UsersTokensRepositoryInMemory };
