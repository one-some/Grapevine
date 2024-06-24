export function commatizeNumber(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export interface JWTData {
    email: string;
    iat: number;
};

export function decodeJWT(jwt: string): JWTData {
    const b64blob = jwt.split(".")[1];
    const j = atob(b64blob);
    return JSON.parse(j);
}
