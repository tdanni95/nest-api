import { Test, TestingModule } from '@nestjs/testing';
import { VideoGameController } from './video-game.controller';

describe('VideoGameController', () => {
  let controller: VideoGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoGameController],
    }).compile();

    controller = module.get<VideoGameController>(VideoGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
