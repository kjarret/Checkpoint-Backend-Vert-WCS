import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AppDataSource } from "../db/data-source";
import { Pays } from "../entities/Pays";

@Resolver()
export class PaysResolver {
  private paysRepository = AppDataSource.getRepository(Pays);

  @Query(() => [Pays])
  async getAllPays(): Promise<Pays[]> {
    return this.paysRepository.find();
  }

  @Query(() => Pays, { nullable: true })
  async getPaysByCode(@Arg("code") code: string): Promise<Pays | null> {
    return this.paysRepository.findOneBy({ code });
  }

  @Query(() => [Pays])
  async paysByContinent(@Arg("continent") continent: string): Promise<Pays[]> {
    return this.paysRepository.find({
      where: { continent },
    });
  }

  @Mutation(() => Pays)
  async addPays(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continent") continent: string
  ): Promise<Pays> {
    const pays = this.paysRepository.create({
      code,
      name,
      emoji,
      continent,
    });
    return this.paysRepository.save(pays);
  }
}
