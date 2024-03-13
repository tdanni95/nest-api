export interface AuthenticationRequest{
    username: string
    password: string
}

export interface AuthenticationResult{
    token: string
    user: UserData
}

export interface UserData {
    id: number
    username: string
}