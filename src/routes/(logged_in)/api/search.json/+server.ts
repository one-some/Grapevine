import { Organization } from "$lib/db.server";
import { json } from "@sveltejs/kit";

export function GET({ url }) {
    const ret = {
        results: Organization.search({
            name: url.searchParams.get("name"),
            sort: url.searchParams.get("sort") ?? "name_desc"
        })
    };
    return json(ret);
}
