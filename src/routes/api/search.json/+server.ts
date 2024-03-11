import { json } from "@sveltejs/kit";

export function GET({ url }) {
    return json({
        ok: "yayayyayayaya",
    });
}
