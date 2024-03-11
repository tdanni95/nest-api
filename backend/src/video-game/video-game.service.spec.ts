import { Test, TestingModule } from '@nestjs/testing';
import { VideoGameService } from './video-game.service';

describe('VideoGameService', () => {
  let service: VideoGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoGameService],
    }).compile();

    service = module.get<VideoGameService>(VideoGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
