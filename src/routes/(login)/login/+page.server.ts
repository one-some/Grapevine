import { redirect, fail } from '@sveltejs/kit';
import { scryptSync, createHmac } from "crypto";
import Database from 'better-sqlite3';

const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

// let unencrypted_jwt = {
//     "header": {
//         "alg": "HS256",
//         "typ": "JWT"
//     },
//     "payload": {
//         "email": null,
//         "eat"
//     }
// }

const header = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."           /*     btoa(JSON.stringify({
                                                                            "alg": "HS256"
                                                                            "typ": "JWT"
                                                                            })) + "."           */

const key = "071d337bce1aac36695bbf69b5c1c0d479c0e5e1eb41b928ae450098262ac171ae80c593a304fee05835e8682f0a50e89c78548a2b6121d8eb973348b079db68";

function issueJWT(email : string) {
    const encryptor = createHmac("SHA256", key)
    const first_half = header + btoa(JSON.stringify({
        "email": email,
        "iat": Date.now()                               //  "Issued At"
    }))

    encryptor.update(first_half);
    return first_half + "." + encryptor.digest('base64').replace("=", "");
}



export function load({ cookies }) {
    if(cookies.get('JWT')){
            const JWT = cookies.get('JWT')?.split(".") as Array<string>;
            const encryptioner = createHmac("SHA256", key)
            encryptioner.update(JWT[0] + '.' + JWT[1])
            if(JWT[2] == encryptioner.digest('base64').replace("=", "") && JSON.parse(atob(JWT[1])).iat - Date.now() <= 1200000) {
                return redirect(303, "/");                                                                                              //  If the token is valid (which will only return true if there is a token AND it is vaild) AND it has been less than 20 minutes since the token has been issued (the token is reissued every time it is detected to be valid), then you can go to the homepage
            }
            else {
                return {"message": cookies.get('error-message')}
            }
    }
}

// Hash using PKBDF
// function CheckPassHash(texttohash : string, salt : string) {
//     const passwordhash = pbkdf2Sync(texttohash, salt, 9001, 256, 'sha512');
//     return passwordhash.toString('hex');
// }

// Salt generator
// crypto.randomBytes(16).toString('hex');

function CheckPassHash(texttohash : string, salt : string) {
    return scryptSync(texttohash, salt, 64, {N: 16384, r: 8, p: 1}).toString('hex')  //  https://www.tarsnap.com/scrypt/scrypt-slides.pdf reccomends this on slide 17?
}

export const actions = {

    authenticate: async ({ cookies, request, url }) => {

        const data = await request.formData();

        let userinfo;
        const email = data.get("email") as string;
        try {
            userinfo = db.prepare("SELECT password, salt FROM users WHERE email = ?").all(email);
        } catch (error) {
            return fail(422, {"message": "Invalid Credentials!"})
        }

        if(userinfo.length == 0){
            return fail(422, {"message": "Invalid Credentials!"})
        }

        const password = userinfo[0].password;
        const salt = userinfo[0].salt

        if(password == CheckPassHash(data.get('password') as string, salt)){

            cookies.set("JWT", issueJWT(email), { path: "/"})
            throw redirect(303, "/");

        }
        else {
            return fail(422, {"message": "Invalid Credentials!"})
        }

    }
}