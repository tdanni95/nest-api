import { IsInt, IsNumber, Max, Min } from "class-validator"

export class RateGameDto{
    @IsNumber()
    gameId: number

    @Min(1)
    @Max(5)
    @IsInt()
    rating: number
}