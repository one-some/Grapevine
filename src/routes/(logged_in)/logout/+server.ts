import { redirect } from "@sveltejs/kit"

export function GET({ cookies }) {
    cookies.set('logged_in', '0', { path: '/'});
    throw redirect(303, "/login")
}