import { Module } from '@nestjs/common';
import { VideoGameController } from './video-game.controller';
import { VideoGameService } from './video-game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/typeorm/entities/user.entity';
import { UserGameListEntity } from 'src/common/typeorm/entities/user-gamelist.entity';
import { IgdbService } from './igdb.service';
import { IgdbAuthService } from './igdb-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserGameListEntity])],
  controllers: [VideoGameController],
  providers: [VideoGameService, IgdbService, IgdbAuthService]
})
export class VideoGameModule {}
