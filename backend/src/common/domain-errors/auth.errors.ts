export class AuthErrors{
    public static get InvalidCredentials(): string {
        return "Invalid credentials"
    }

    public static get UsernameTaken(): string {
        return "Username taken"
    }
} 