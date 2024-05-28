import { redirect, fail } from '@sveltejs/kit';
import { pbkdf2Sync } from "crypto";
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

function CheckPassHash(texttohash : string, salt : string) {
    const passwordhash = pbkdf2Sync(texttohash, salt, 9001, 256, 'sha512');
    return passwordhash.toString('hex');
}

function salt() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 16) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export const actions = {

    authenticate: async ({ cookies, request, url }) => {

        const data = await request.formData();

        let userinfo;
        try {
            userinfo = db.prepare("SELECT password, salt FROM users WHERE username = ?").all(data.get("username"));
        } catch (error) {
            return fail(422, {"message": "Invalid Credentials!"})
        }

        if(userinfo.length == 0){
            return fail(422, {"message": "Invalid Credentials!"})
        }

        const password = userinfo[0].password;
        const salt = userinfo[0].salt

        if(password == CheckPassHash(data.get('password'), salt)){

            console.log('authenticated')

            cookies.set('logged_in', '1', { path: '/'});
            throw redirect(303, "/");

        }
        else {
            return fail(422, {"message": "Invalid Credentials!"})
        }

    }
}