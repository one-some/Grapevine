import Database from 'better-sqlite3';
import { invalidate } from '$app/navigation';
const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

export function load({ params }) {
    var campaigns = db.prepare("SELECT title, desc, money_needed, money_donated FROM campaigns WHERE owner_id = 1;").all();
	return {
		campaings: campaigns,
	};
}

export const actions = {

    add_new_campaign: async ({ request }) => {


		const data =  await request.formData()

		console.log(data);

		const name = data.get("title")
		const goal = data.get("goal")
		const desc = data.get("description")

		console.log(name, !name, goal, !goal, desc, !desc)
        
		if(!name || !goal || !desc) {
			return { message: "All boxes are mandatory!"}
		}
		else {
			console.log("here");
			try {
				Number(goal);
			}
			catch {
				return { message : "Goal must be a number!"}
			}
		}

		console.log(typeof(goal));

		db.prepare("INSERT INTO campaigns (title, desc, money_needed, money_donated) VALUES (?, ?, ?, 0)").run(name, desc, goal);

		invalidate("/campaings");

		return {success : true};

    }
}