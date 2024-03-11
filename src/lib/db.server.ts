import Database from 'better-sqlite3';
const db = new Database("db/main.db", {});
db.pragma("journal_mode = WAL");

enum OrgType {
    ForProfit,
    NonProfit
}

class Organization {
    id: number;
    orgType: OrgType;

    constructor(id: number, orgType: OrgType) {
        this.id = id;
        this.orgType = orgType;
    }

    static fromId(id: number): Organization {
        // TODO
        const row = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        console.log(row.firstName, row.lastName, row.email);
        return new Organization(id, OrgType.ForProfit);
    }

    static search(name?: string, desc?: string): Organization[] {
        return [];
    }
}
