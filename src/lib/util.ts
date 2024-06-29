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

export function toCleanStamp(time: number): string {
    const parts = new Date(time * 1000).toDateString().split(" ").slice(1, 4);
    return `${parts[0]} ${parts[1]}, ${parts[2]}`;
}
