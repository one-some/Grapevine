import { createHmac } from "crypto"
import { redirect } from '@sveltejs/kit';

const key = "071d337bce1aac36695bbf69b5c1c0d479c0e5e1eb41b928ae450098262ac171ae80c593a304fee05835e8682f0a50e89c78548a2b6121d8eb973348b079db68";
const header = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."

function issueJWT(email : string) {
    const encryptor = createHmac("SHA256", key)
    const first_half = header + btoa(JSON.stringify({
        "email": email,
        "iat": Date.now()                               //  "Issued At" Unix timestamp in milliseconds. 1200000 milliseconds in 20 minutes
    }))

    encryptor.update(first_half);
    return first_half + "." + encryptor.digest('base64').replace("=", "");
}

function parseJWTPayload(payload: string) {
    return JSON.parse(atob(payload))
}



export function load( { cookies, url }) {
    const STUPIDHACK = url.pathname;                                        
/*  HACK: According to https://kit.svelte.dev/docs/load#rerunning-load-functions-when-do-load-functions-rerun
load functions will not run when changing pages unless something referenced in the function, such as url, changes. Maybe could be replaced with invalidateAll()? */

    const encryptor = createHmac("SHA256", key)
    const JWT = cookies.get("JWT")?.split(".") as Array<string>;

    if(!cookies.get("JWT")){
        throw redirect(303, "/login")                                                                // If you don't have a token, go to the login
    }
    
    encryptor.update(JWT[0] + "." + JWT[1]);                                                        // This type coerces to a string so even if JWT is a random string it will not be equal to JWT[2] which would be undefined, right? So it is protected if someone sends a cookie with random data.
    const expected_hash = encryptor.digest('base64').replace("=", "");


    if(expected_hash != JWT[2]){
        cookies.set("error-message", "Something went wrong, please sign in again", { path: "/"})    //  If your token is invalid, go to the login
        throw redirect(303, "/login")
    }
    else if(Date.now() - (JSON.parse(atob(JWT[1]))).iat >= 1200000){
        cookies.set("error-message", "You've been automatically logged out after 20 minutes, please sign in again", { path: "/"})   //  If it has been 20 minutes since the token has last been used, go to the login
        throw redirect(303, "/login")
    }
    else{
        cookies.set("JWT", issueJWT(parseJWTPayload(JWT[1]).email), { path: "/"})                                                  // Reissue token with new time
    }
}