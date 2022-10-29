import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userTokens = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userTokens);

    return userTokens;
  }

  async findByTokenAndUserId(
    refresh_token: string,
    user_id: string
  ): Promise<UserTokens> {
    return this.repository.findOne({
      where: {
        refresh_token,
        user_id,
      },
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokensRepository };
