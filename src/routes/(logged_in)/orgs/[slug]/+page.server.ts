import { Organization } from '$lib/db.server';
import { fail, redirect } from '@sveltejs/kit';
import Database from 'better-sqlite3';
const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

export function load( {params}) {
    console.log(params.slug);
    //let contact = db.prepare("SELECT desc, org_type, employee_count FROM orgs WHERE NAME = ?").all(params.slug);
    let peoples_contact_info = db.prepare("SELECT id, first_name, last_name, email, phone FROM contacts WHERE org_id = (SELECT id FROM orgs WHERE name = ?)").all(params.slug);

	console.log(peoples_contact_info);

    const org = Organization.fromName(params.slug);
    const donations = org.getDonations();
    const negotiations = org.getNegotiations();

    //const donations = org.recent(25).map(x => x.toJSON());
    return {
        org: org.toJSON(),
        people: peoples_contact_info,
        donations: donations.map(x => x.toJSON()),
        ongoingNegotiations: negotiations.map(x => x.toJSON()),
    };
}

function decodeJWT(jwt: string) {
    const b64blob = jwt.split(".")[1];
    const j = atob(b64blob);
    return JSON.parse(j);
}

export const actions = {

    edit_business: async ({ cookies, request, url }) => {

		const hack = url.pathname;
        const data = await request.formData();
		const name = data.get("name") as String;
		const type = data.get("type") as String;
		const employee_count = data.get("company_size") as String;
		const annual_profit = data.get("annual_profit") as String;
		const desc = data.get("desc") as String;
		const org_id = data.get("org_id") as String;
		const uid = decodeJWT(cookies.get("JWT")).email;

		console.log(name, type, employee_count, annual_profit, desc);

		if (name == '' || type == '' || employee_count == '' || annual_profit == '' || desc == '') {
			return fail(422, {"message": "All boxes are mandatory!"});
		}
		if (employee_count.replace(/[0-9]/g, "").length != 0){
			return fail(422, {"message": "Employee Count must be a number!"});
		}
		if (annual_profit.replace(/[0-9]/g, "").length != 0){
			return fail(422, {"message": "Annual Profit must be a number!"});
		}
		if (!(type == "FOR_PROFIT" || type == "NON_PROFIT")) {
			return fail(422, {"message": "Type must be Non-Profit or For-Profit"});
		}
		
		db.prepare("UPDATE orgs SET name = ?, org_type = ?, employee_count = ?, annual_profit = ?, desc = ? WHERE id = ?").run(name, type, Number(employee_count), Number(annual_profit), desc, Number(org_id));

		return redirect(303, "/orgs/"+name);
    },
    
    add_contact: async ({ cookies, request, url }) => {

		const hack = url.pathname;
        const data = await request.formData();
		const first_name = data.get("first_name") as String;
		const last_name = data.get("last_name") as String;
		const phone = data.get("phone") as String;
		const email = data.get("email") as String;
		const org_id = data.get("org_id") as String;
		const uid = decodeJWT(cookies.get("JWT")).email;

		console.log(name, phone, email);

		if (first_name == '' && last_name) {
			return fail(422, {"message": "Must have at least either first name or last name!"});
		}
        if (phone == '' && email == '') {
            return fail(422, {"message": "Must have either phone or email!"});
        }
		if (phone.replace(/[0-9]/g, "").length != 0 || phone.length != 10){
			return fail(422, {"message": "Not a valid phone number!"});
		}
		
		db.prepare("INSERT INTO contacts (first_name, last_name, phone, email, org_id) VALUES (?, ?, ?, ?, ?)").run(first_name, last_name, phone, email, org_id);

		return {"message": "All Good!"}
    },
    
    new_neg: async ({ cookies, request, url }) => {

		const hack = url.pathname;
        const data = await request.formData();
		const org_id = data.get("org_id") as String;
		const contact = data.get("contact") as String;
		const uid = decodeJWT(cookies.get("JWT")).email;
		
        // console.log("reason", "", "org_id", Number(org_id), "campaign_id", 1, "contact_id", Number(contact), "amount_usd", 0, "time_started", Math.floor(Date.now()/1000), "time_last_action", Math.floor(Date.now()/1000), "donation_stage", 'PROPOSAL_MADE')
		db.prepare("INSERT INTO donations_in_progress (reason, org_id, campaign_id, contact_id, amount_usd, time_started, time_last_action, donation_stage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").run("", Number(org_id), 1, Number(contact), 0, Math.floor(Date.now()/1000), Math.floor(Date.now()/1000), 'PROPOSAL_MADE');

		return {"message": "All Good!"}
    },
    
    new_donate: async ({ cookies, request, url }) => {

		const hack = url.pathname;
        const data = await request.formData();
		const org_id = data.get("org_id") as String;
		const contact_id = data.get("contact_id") as String;
		const amount = data.get("amount") as String;
		const donate_date = data.get("date") as string;
		const uid = decodeJWT(cookies.get("JWT")).email;
		
		let interpret_date = new Date(donate_date);
		let full_date = new Date(interpret_date.getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 1 * 3600000).getTime() / 1000;
		
        // console.log("reason", "", "org_id", Number(org_id), "campaign_id", 1, "contact_id", Number(contact_id), "amount_usd", Number(amount), "date", Number(full_date));
		db.prepare("INSERT INTO donations (reason, org_id, campaign_id, contact_id, amount_usd, time) VALUES (?, ?, ?, ?, ?, ?)").run("", Number(org_id), 1, Number(contact_id), Number(amount), Number(full_date));

		return {"message": "All Good!"}
    }
}
