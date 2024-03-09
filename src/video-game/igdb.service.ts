import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IgdbAuthService } from './igdb-auth.service';

@Injectable()
export class IgdbService {
  constructor(
    private readonly configService: ConfigService,
    private readonly igdbAuthService: IgdbAuthService,
  ) {}

  async genres() {
    const endpoint = 'genres';
    const query = 'fields checksum,name,slug; limit 500;';

    const genresResponse = await this.makeRequest(endpoint, query);

    const genresResponseJSON = await genresResponse.json();

    return genresResponseJSON;
  }

  async gamesByGenre(genre: string) {
    const endpoint = 'games';
    const query = `fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites; 
    where genres = (${genre}); limit 500;`;

    const gamesByGenre = await this.makeRequest(endpoint, query);

    const gamesByGenreJSON = await gamesByGenre.json();

    return gamesByGenreJSON;
  }

  async getCover(cover: string){
    const endpoint = 'covers'
    const query = `fields url; where game = ${cover};`

    const coverResponse = await this.makeRequest(endpoint, query);

    const coverResponseJSON = await coverResponse.json();

    return coverResponseJSON;
  }

  private async makeRequest(endpoint: string, query: string = '') {
    const baseUrl = this.configService.getOrThrow('IGDB_URL');
    const token = await this.igdbAuthService.getAccessToken();
    const clientId = this.configService.getOrThrow('IGDB_CLIENT_ID');

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Client-ID': clientId,
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: query,
    });

    return response;
  }
}
