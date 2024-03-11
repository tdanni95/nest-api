import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class IgdbAuthService {
    private accessToken: string;
    private expiresIn: number;
    private lastAuthTime: Date;

    private readonly SECONDS_TO_MILICSECONDS = 1000;

    constructor(private configService: ConfigService) {}

    async getAccessToken(): Promise<string> {
        if (!this.accessToken || new Date().getTime() - this.lastAuthTime.getTime() > this.expiresIn * this.SECONDS_TO_MILICSECONDS) {
            await this.authenticate();
        }
        return this.accessToken;
    }

    private async authenticate() {
        const clientId = this.configService.getOrThrow('IGDB_CLIENT_ID');
        const clientSecret = this.configService.getOrThrow('IGDB_CLIENT_SECRET');
        const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`, {method: 'POST'});
        const responseJSON = await response.json();
        this.accessToken = responseJSON.access_token;
        this.expiresIn = responseJSON.expires_in;
        this.lastAuthTime = new Date();
    }
}