import { IsInt, IsNumber, Max, Min, MinLength, minLength } from "class-validator"

export class RateGameDto{
    @IsNumber()
    gameId: number

    @Min(1)
    @Max(5)
    @IsInt()
    rating: number

    @MinLength(10)
    review: string
}