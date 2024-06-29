import Database from 'better-sqlite3';
import { Campaign } from '$lib/db.server.js';
import { invalidate } from '$app/navigation';
import { fail } from '@sveltejs/kit';
import { read } from '$app/server';

const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

export function load({ params }) {
    var campaigns = Campaign.getAll().map(x => x.toJSON()).reverse();
	return {
		campaigns: campaigns,
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
		const deadlineform = data.get("deadline");
		const goalform = data.get("goal") as String;
		const uid = decodeJWT(cookies.get("JWT")).email

		console.log(deadlineform)

		if (title == '' || desc == '' || goalform == '' || deadlineform == '') {
			return fail(422, {"message": "All boxes are mandatory!"})
		}

		if (deadlineform <= "2024-06-30") {
			return fail(422, {"message": "Deadline must be in the future"})
		}

		var deadline = new Date(deadlineform);
		// var deadline_now_utc = Date.UTC(deadline.getUTCFullYear(), deadline.getUTCMonth(),
		// deadline.getUTCDate(), deadline.getUTCHours(),
		// deadline.getUTCMinutes(), deadline.getUTCSeconds());

		var newdeadline = new Date(deadline.getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 1 * 3600000).getTime() / 1000

		// console.log(new Date(deadline_now_utc));
		// console.log(deadline.toDateString() ,deadline.getTime(), newdeadline.getTime(), newdeadline.toDateString());
		 // Local Time
		// Why not same???

		// const numbermatch = /(123456789)*/
		// .replace(/[0-9]/g, "")
		if (goalform.replace(/[0-9]/g, "").length != 0){
			return fail(422, {"message": "Goal must be a number!"})
		}
		
		
		db.prepare("INSERT INTO campaigns (title, desc, money_needed, money_donated, owner_id, deadline) VALUES ( ?, ?, ?, 0, ?, ?)").run(title, desc, Number(goalform), uid, newdeadline)

		return {success: true}
    }
}
