import {copyFile} from "fs"
var time = 0;

export function load({ url}) {
    const update = url.pathname;
    if (Date.now() - time > 300000) {
        copyFile('db/main.db', 'db/backup.db', (err : Error) => {
            if (err) console.log(err);
            console.log('main.db was copied to backup.db');
          });
        time = Date.now();
    }
}