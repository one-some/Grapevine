import { redirect } from "@sveltejs/kit"


export function GET({ cookies }) {
    cookies.delete("JWT", { path: '/'})
    throw redirect(303, "/login")
}