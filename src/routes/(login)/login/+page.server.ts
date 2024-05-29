import { redirect, fail } from '@sveltejs/kit';
import { scryptSync } from "crypto";
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

// function CheckPassHash(texttohash : string, salt : string) {
//     const passwordhash = pbkdf2Sync(texttohash, salt, 9001, 256, 'sha512');
//     return passwordhash.toString('hex');
// }


// crypto.randomBytes(16).toString('hex');

function CheckPassHash(texttohash : string, salt : string) {
    return scryptSync(texttohash, salt, 64, {N: 16384, r: 8, p: 1}).toString('hex')  //  https://www.tarsnap.com/scrypt/scrypt-slides.pdf reccomends this on slide 17?
}

export const actions = {

    authenticate: async ({ cookies, request, url }) => {

        const data = await request.formData();

        let userinfo;
        try {
            userinfo = db.prepare("SELECT password, salt FROM users WHERE email = ?").all(data.get("email"));
        } catch (error) {
            return fail(422, {"message": "Invalid Credentials!"})
        }

        if(userinfo.length == 0){
            return fail(422, {"message": "Invalid Credentials!"})
        }

        const password = userinfo[0].password;
        const salt = userinfo[0].salt

        if(password == CheckPassHash(data.get('password'), salt)){

            cookies.set('logged_in', '1', { path: '/'});
            throw redirect(303, "/");

        }
        else {
            return fail(422, {"message": "Invalid Credentials!"})
        }

    }
}