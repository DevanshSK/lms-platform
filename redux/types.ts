// Auth Types
export interface IAuthParams {
    username: string;
    password: string;
}
export interface ILoginResult{
    access_token: string;
    token_type: string;
} 
export interface ISignUpResult{
    username: string;
    id: number;
    created_at: string;
}
export interface IRefreshResponse{
    access_token: string;
    token_type: string;
}

// User Types
export interface IUser{
    email: string;
    id: number;
    created_at: string;
}
