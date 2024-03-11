import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VideoGameService } from './video-game.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GameIdDto } from './dto/game-id-dto';
import { Request } from 'express';
import { UserEntity } from 'src/common/typeorm/entities/user.entity';
import { RateGameDto } from './dto/rate-game-dto';
import { IgdbService } from './igdb.service';

@Controller('video-game')
@UseGuards(JwtAuthGuard)
export class VideoGameController {
  constructor(private readonly videoGameService: VideoGameService, private readonly igdbService: IgdbService) {}

  @Get('my-games')
  getMyGames() {
    return 'these are your games';
  }

  @Get('genres')
  getGenres() {
    return this.igdbService.genres()
  }
  
  @Get('genres/:genreId')
  getGamesByGenre(@Param('genreId') genreId: string, @Query('startAt') offset: number = 0) {
    return this.igdbService.gamesByGenre(genreId, offset);
  }

  @Get('cover/:gameId')
  getCover(@Param('gameId') gameId: string){
    return this.igdbService.getCoverForGameId(gameId)
  }

  @Post()
  addToMyGameList(
    @Req() request: Request,
    @Body() GameIdDto: GameIdDto,
  ) {
    return this.videoGameService.addToMyGameList({
      userId: this.extractUserIdFromRequest(request),
      GameIdDto,
    });
  }

  @Put()
  rateGame(@Req() request: Request, @Body() rateGameDto: RateGameDto) {
    return this.videoGameService.rateGame({
      userId: this.extractUserIdFromRequest(request),
      rateGameDto,
    });
  }

  @Delete()
  removeFromMyGameList(
    @Req() request: Request,
    @Body() gameIdDto: GameIdDto,
  ) {
    return this.videoGameService.deleteGame({userId: this.extractUserIdFromRequest(request), gameIdDto})
  }

  private extractUserIdFromRequest(req: Request) {
    const user = req.user as UserEntity;
    return user.id;
  }
}
