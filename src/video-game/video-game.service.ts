import { BadRequestException, Injectable } from '@nestjs/common';
import { UserGameListEntity } from 'src/common/typeorm/entities/user-gamelist.entity';
import { Repository } from 'typeorm';
import { GameIdDto } from './dto/game-id-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationError } from 'class-validator';
import { VideoGameErrors } from 'src/common/domain-errors/videogame.error';
import { RateGameDto } from './dto/rate-game-dto';

@Injectable()
export class VideoGameService {
  constructor(
    @InjectRepository(UserGameListEntity)
    private readonly userGameRepository: Repository<UserGameListEntity>,
  ) {}

  async addToMyGameList({
    userId,
    GameIdDto,
  }: {
    userId: number;
    GameIdDto: GameIdDto;
  }) {
    //TODO validate from external API if game id is correct
    const isSaved = await this.getGameListItem(userId, GameIdDto.gameId);
    if (isSaved) throw new BadRequestException(VideoGameErrors.AlreadyAdded);

    const userGame: Partial<UserGameListEntity> = {
      userId: userId,
      videoGameId: GameIdDto.gameId,
    };

    try {
      await this.userGameRepository.save(userGame);
    } catch (error) {
      throw new Error('Failed to save');
    }
  }

  async rateGame({
    userId,
    rateGameDto,
  }: {
    userId: number;
    rateGameDto: RateGameDto;
  }) {
    const gameListItem = await this.getGameListItem(userId, rateGameDto.gameId);
    if (!gameListItem)
      throw new BadRequestException(VideoGameErrors.NotOnYOurList);

    gameListItem.rating = rateGameDto.rating;

    try {
      return await this.userGameRepository.save(gameListItem);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to rate');
    }
  }

  async deleteGame({ userId, gameIdDto }: { userId: number; gameIdDto: GameIdDto }) {
    const gameListItem = await this.getGameListItem(userId, gameIdDto.gameId);
    if (!gameListItem)
      throw new BadRequestException(VideoGameErrors.NotOnYOurList);


    try {
      return await this.userGameRepository.delete(gameListItem);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to rate');
    }
  }

  async getGameListItem(userId: number, gameId: number) {
    const isSaved = await this.userGameRepository.findOne({
      where: { userId: userId, videoGameId: gameId },
    });

    return isSaved;
  }
}
