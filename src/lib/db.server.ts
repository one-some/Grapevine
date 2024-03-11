import {Database, row} from 'better-sqlite3';
const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

function likeClauseSearch(text: string): string {
    // TODO: Escape % in SQLite
    text = text.replaceAll("%", "");

    text = `%${text}%`;
    return text;
}

interface SQLClause {
    text: string;
    values: any[];
}

enum OrgType {
    ForProfit,
    NonProfit
}

namespace OrgType {
    export function fromDb(orgType: string): OrgType {
        switch (orgType) {
            case "FOR_PROFIT": return OrgType.ForProfit;
            case "NON_PROFIT": return OrgType.NonProfit;
            default: throw new Error(`Invalid org '${orgType}'`);
        }
    }
}

class Organization {
    // SECURITY: Direct SQL, beware!
    static FullSelectCriteria = [
        "id",
        "name",
        "desc",
        "org_type",
        "employee_count",
    ].join(",");

    id: number;
    name: string;
    desc: string;
    orgType: OrgType;
    employeeCount: number;

    constructor(
        id: number,
        name: string,
        desc: string,
        orgType: OrgType,
        employeeCount: number,
    ) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.orgType = orgType;
        this.employeeCount = employeeCount;
    }

    static fromSQLRow(row: row): Organization {
        return new Organization(
            row.id,
            row.name,
            row.desc,
            OrgType.fromDb(row.org_type),
            row.employee_count
        );
    }

    static fromId(id: number): Organization {
        const row = db.prepare(`SELECT ${Organization.FullSelectCriteria} FROM orgs WHERE id = ?;`).get(id);
        return Organization.fromSQLRow(row);
    }

    static search(name?: string, desc?: string, offset: number = 0, limit: number = 25): Organization[] {
        let whereClauses: SQLClause[] = [];

        if (name) {
            whereClauses.push({text: "name LIKE ?", values: [likeClauseSearch(name)]});
        }

        if (desc) {
            whereClauses.push({text: "desc LIKE ?", values: [likeClauseSearch(desc)]});
        }

        let queryParts = [`SELECT ${Organization.FullSelectCriteria} FROM orgs`];
        let queryParams: any[] = [];

        if (whereClauses.length) {
            queryParts.push("WHERE");
            for (const clause of whereClauses) {
                queryParts.push(clause.text);
                queryParams.push(...clause.values);
            }
        }

        queryParts.push("LIMIT ? OFFSET ?");
        queryParams.push(limit, offset);

        const query = queryParts.join(" ");

        console.log("[query]", query);

        const rows: row[] = db.prepare(query).all(queryParams);
        return rows.map(row => Organization.fromSQLRow(row));
    }
}
