import { redirect, fail } from '@sveltejs/kit';
import Database from 'better-sqlite3';

const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

export function load({ cookies }) {
    let id = cookies.get('userid')

    if(!id) {
        id = crypto.randomUUID();
        cookies.set('userid', id, { path: '/'});
        cookies.set('logged_in', '0', {path: '/'});
    }
    else if (cookies.get('logged_in') == '1'){
        throw redirect(303, "/");
    }
}



export const actions = {

    authenticate: async ({ cookies, request, url }) => {

        const data = await request.formData();
            if (!data.get("username") || !data.get("password")){

            }

        let password;
        try {
            password = db.prepare("SELECT password FROM users WHERE username = ?").all(data.get("username"))[0].password;
        } catch (error) {
            return fail(422, {"message": "Invalid Username or Password!"})
        }
        console.log("here")
        console.log("HELLO!!!!!!!!!!!!!!!!!!!!1", password);

        if(password == data.get("password")){

            cookies.set('logged_in', '1', { path: '/'});
            throw redirect(303, "/");
        }

    }
}