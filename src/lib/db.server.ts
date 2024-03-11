import Database from 'better-sqlite3';
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

interface SearchParams {
    name?: string;
    desc?: string;
    offset?: number;
    limit?: number;
}
    

export enum OrgType {
    // Must match SQL enum verification
    FOR_PROFIT,
    NON_PROFIT,
}

export class Organization {
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

    static fromSQLRow(row: any): Organization {
        return new Organization(
            row.id,
            row.name,
            row.desc,
            OrgType[row.org_type as keyof typeof OrgType],
            row.employee_count
        );
    }

    static fromId(id: number): Organization {
        const row = db.prepare(`SELECT ${Organization.FullSelectCriteria} FROM orgs WHERE id = ?;`).get(id);
        return Organization.fromSQLRow(row);
    }

    static search({ name, desc, offset = 0, limit = 25}: SearchParams = {}): Organization[] {
        // Not terribly pleased with the singleton type thing but it's the
        // best way for typed named parameters until
        // https://github.com/microsoft/TypeScript/issues/29526

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

        const rows: any[] = db.prepare(query).all(queryParams);
        return rows.map(row => Organization.fromSQLRow(row));
    }
}
