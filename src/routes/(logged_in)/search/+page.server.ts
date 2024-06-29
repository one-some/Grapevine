import Database from 'better-sqlite3';
import { fail } from '@sveltejs/kit';
const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");


function decodeJWT(jwt: string) {
    const b64blob = jwt.split(".")[1];
    const j = atob(b64blob);
    return JSON.parse(j);
}


export const actions = {

    add_new_business: async ({ cookies, request, url }) => {

		const hack = url.pathname;
        const data = await request.formData();
		const name = data.get("name") as String;
		const type = data.get("type") as String;
		const employee_count = data.get("company_size") as String;
		const annual_profit = data.get("annual_profit") as String;
		const desc = data.get("desc") as String;
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
		
		db.prepare("INSERT INTO orgs (name, org_type, employee_count, annual_profit, desc) VALUES ( ?, ?, ?, ?, ?)").run(name, type, Number(employee_count), Number(annual_profit), desc);

		return {"message": "All Good!"}
    }
}