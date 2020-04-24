interface RefreshTokenGateway{
    createRefreshToken(input: RefreshToken): Promise<void>;
    getRefreshToken(device: string, user_id: string): Promise<RefreshToken | undefined>;
    deleteRefreshToken(device: string, user_id: string): Promise<void>;
}

interface RefreshToken{
    token: string;
    device: string;
    user_id: string;
}