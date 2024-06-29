import Database from 'better-sqlite3';
import { invalidate } from '$app/navigation';
import { fail } from '@sveltejs/kit';
import { read } from '$app/server';

const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

export function load({ params }) {
    var campaigns = db.prepare("SELECT title, desc, money_needed, money_donated FROM campaigns WHERE owner_id = 1;").all();
	return {
		campaings: campaigns,
	};
}

function decodeJWT(jwt: string) {
    const b64blob = jwt.split(".")[1];
    const j = atob(b64blob);
    return JSON.parse(j);
}

const months = {
	"01": "January",
	"02": "February",
	"03": "March",
	"04": "April",
	"05": "May",
	"06": "June",
	"07": "July",
	"08": "August",
	"09": "September",
	"10": "October",
	"11": "November",
	"12": "December"
}
function readableDate(date : String) {
	const newdate =  date.split("-")
	return `${months[newdate[1]]} ${newdate[2]}, ${newdate[0]}`
}

function dateString() {
	const date =  Date().split(" ")
	return date[1] 
}

export const actions = {

    add_new_campaign: async ({ cookies, request, url }) => {

		const hack = url.pathname
        const data = await request.formData();
		const title = data.get("title") as String;
		const desc = data.get("description") as String;
		const deadlineform = data.get("deadline") as String;
		const goalform = data.get("goal") as String;
		const uid = decodeJWT(cookies.get("JWT")).email

		if (title == '' || desc == '' || goalform == '' || deadlineform == '') {
			return fail(422, {"message": "All boxes are mandatory!"})
		}

		if (deadlineform <= "2024-06-29") {
			return fail(422, {"message": "Deadline must be in the future"})
		}

		const deadline = readableDate(deadlineform);

		try {
			const goal = Number(goalform);
		} catch {
			return fail(422, {"message": "Goal must be a number!"})
		}
		
		// db.prepare("INSERT INTO campaigns (")

		return {"message": "Alright then!"}
    }
}
