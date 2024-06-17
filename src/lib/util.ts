export function commatizeNumber(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
