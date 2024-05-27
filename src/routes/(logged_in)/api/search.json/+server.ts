import { Organization } from "$lib/db.server";
import { json } from "@sveltejs/kit";

export function GET({ url }) {
    const ret = {
        results: Organization.search({
            name: url.searchParams.get("name")
        })
    };
    console.log(ret);
    return json(ret);
}
