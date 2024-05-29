import { redirect, fail, text } from '@sveltejs/kit';
import { scryptSync, randomBytes } from "crypto";
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

function makePassHash(texttohash : string) {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(texttohash, salt, 64, {N: 16384, r: 8, p: 1}).toString('hex')
    return {"salt": salt, "hashedpassword": hash}
}


// crypto.randomBytes(16).toString('hex');

// function CheckPassHash(texttohash : string, salt : string) {
//     return scryptSync(texttohash, salt, 64, {N: 16384, r: 8, p: 1}).toString('hex')  //  https://www.tarsnap.com/scrypt/scrypt-slides.pdf reccomends this on slide 17?
// }

function capitalizeFirstLetter(name : string){
    return (name.charAt(0).toUpperCase() + name.slice(1));
};

export const actions = {

    register: async ({ cookies, request, url }) => {

        const data = await request.formData();

        const first_name = capitalizeFirstLetter(data.get('first_name') as string);
        const last_name = capitalizeFirstLetter(data.get('last_name') as string);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const confirm_password = data.get('confirm_password');
        const email_pattern = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
        const password_pattern = /(?=.*[A-Z])(?=.*[!@#$%^&*_\-+=\(\)])(?=.*[0-9])(?=.*[a-z]).{8,}/;

        if(!first_name || !last_name || !email || !password || !confirm_password){
            return fail(422, {"message": "All boxes are mandatory!"})
        }
        else if(!email_pattern.test(email)){
            return fail(422, {"message": "Invalid email!"})     //  TODO: Replace with email confirmation, if time allows.
        }
        else if(db.prepare("SELECT * FROM users WHERE email = ?").all(email).length != 0){
            return fail(422, {"message": "Email already exists!"})
        }
        else if(!password_pattern.test(password)){
            return fail(422, {"message": "Invalid password!"})
        }
        else if (password != confirm_password){
            return fail(422, {"message": "Passwords must match!"})
        }
        else{
            const hashed = makePassHash(password);
            db.prepare("INSERT INTO users (first_name, last_name, email, password, salt) VALUES (?, ?, ?, ?, ?)").run(first_name, last_name, email, hashed.hashedpassword, hashed.salt);
            return { "success": true};
        }

    }

}