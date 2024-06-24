import Database from 'better-sqlite3';
import { Connect } from 'vite';
import { OrgType, NegotiationStage } from './types';
import { decodeJWT } from './util';
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
    sort?: string;
}
    

export class Contact {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
    ) {
        this.id = id;
        // Statically defined for auto serialization
        this.name = `${firstName} ${lastName}`;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
    }

    static fromId(id: number): Contact {
        const row = db.prepare(`SELECT first_name,last_name,email,phone FROM contacts WHERE id = ?;`).get(id);
        return new Contact(
            id,
            row.first_name,
            row.last_name,
            row.email,
            row.phone,
        );
    }

    toJSON() {
        return {...this};
    }
}

export class Donation {
    // Note: keep these as basic JS objects so serialization is ezpz
    id: number;
    reason: string;
    org: Organization;
    campaignId: number;
    contact: Contact;
    amountUsd: number;
    time: number;

    constructor(
        id: number,
        reason: string,
        org: Organization,
        campaignId: number,
        contact: Contact,
        amountUsd: number,
        time: number,
    ) {
        this.id = id;
        this.reason = reason;
        this.org = org;
        this.campaignId = campaignId;
        this.contact = contact;
        this.amountUsd = amountUsd;
        this.time = time;
    }

    static recent(count: number = 25) {
        const query = "SELECT id,reason,org_id,campaign_id,contact_id,amount_usd,time FROM donations ORDER BY time DESC LIMIT ?;";
        const rows: any[] = db.prepare(query).all([count]);

        return rows.map(function(row: any) {
            return new Donation(
                row.id,
                row.reason,
                Organization.fromId(row.org_id),
                row.campaign_id,
                Contact.fromId(row.contact_id),
                row.amount_usd,
                row.time,
            );
        });
    }

    toJSON() {
        const out = {...this};
        out.org = out.org.toJSON();
        out.contact = out.contact.toJSON();
        return out;
    }
}

export class DonationInProgress {
    // Note: keep these as basic JS objects so serialization is ezpz
    id: number;
    reason: string;
    org: Organization;
    campaignId: number;
    contact: Contact;
    amountUsd: number;
    time_started: number;
    time_last_action: number;
    donation_stage: NegotiationStage;

    constructor(
        id: number,
        reason: string,
        org: Organization,
        campaignId: number,
        contact: Contact,
        amountUsd: number,
        time_started: number,
        time_last_action: number,
        donation_stage: NegotiationStage,
    ) {
        this.id = id;
        this.reason = reason;
        this.org = org;
        this.campaignId = campaignId;
        this.contact = contact;
        this.amountUsd = amountUsd;
        this.time_started = time_started;
        this.time_last_action = time_last_action;
        this.donation_stage = donation_stage;
    }

    static recent(count: number = 25) {
        const query = "SELECT id,reason,org_id,campaign_id,contact_id,amount_usd,time_started,time_last_action,donation_stage FROM donations_in_progress ORDER BY time_last_action DESC LIMIT ?;";
        const rows: any[] = db.prepare(query).all([count]);

        return rows.map(function(row: any) {
            return new DonationInProgress(
                row.id,
                row.reason,
                Organization.fromId(row.org_id),
                row.campaign_id,
                Contact.fromId(row.contact_id),
                row.amount_usd,
                row.time_started,
                row.time_last_action,
                NegotiationStage[row.donation_stage as keyof typeof NegotiationStage],
            );
        });
    }

    toJSON() {
        const out = {...this};
        out.org = out.org.toJSON();
        out.contact = out.contact.toJSON();
        return out;
    }
}

export class Organization {
    // SECURITY: Direct SQL, beware!
    static FullSelectCriteria = [
        "id",
        "name",
        "desc",
        "org_type",
        "employee_count",
        "annual_profit",
    ].join(",");

    id: number;
    name: string;
    desc: string;
    orgType: OrgType;
    employeeCount: number;
    tags: string[];
    annual_profit: number;

    constructor(
        id: number,
        name: string,
        desc: string,
        orgType: OrgType,
        employeeCount: number,
        tags: string[],
        annual_profit: number,
    ) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.orgType = orgType;
        this.employeeCount = employeeCount;
        this.tags = tags;
        this.annual_profit = annual_profit;
    }

    static fromSQLRow(row: any): Organization {
        return new Organization(
            row.id,
            row.name,
            row.desc,
            OrgType[row.org_type as keyof typeof OrgType],
            row.employee_count,
            [],
            row.annual_profit,
        );
    }

    static fromId(id: number): Organization {
        const row = db.prepare(`SELECT ${Organization.FullSelectCriteria} FROM orgs WHERE id = ?;`).get(id);
        return Organization.fromSQLRow(row);
    }

    static fromName(name: string): Organization {
        const row = db.prepare(`SELECT ${Organization.FullSelectCriteria} FROM orgs WHERE name = ?;`).get(name);
        return Organization.fromSQLRow(row);
    }

    static search({
        name,
        desc,
        offset = 0,
        limit = 25,
        sort = "name_desc",
    }: SearchParams = {}): Organization[] {
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

        queryParts.push("ORDER BY " + {
            // HACK: ASC and DESC are switched for name field because it's backwards 4 somereason.........!
            "name_desc": "name ASC",
            "name_asc": "name DESC",
            "emp_count_desc": "employee_count DESC",
            "emp_count_asc": "employee_count ASC",
        }[sort]);

        queryParts.push("LIMIT ? OFFSET ?");
        queryParams.push(limit, offset);

        const query = queryParts.join(" ");

        // console.log("[query]", query);
        // console.log("[query]", queryParams);

        const rows: any[] = db.prepare(query).all(queryParams);
        return rows.map(row => Organization.fromSQLRow(row));
    }

    getDonations() {
        const query = "SELECT id,reason,campaign_id,contact_id,amount_usd,time FROM donations WHERE org_id = ?;";
        const rows: any[] = db.prepare(query).all([this.id]);

        // Little odd but will satisfy typing
        const org = this;
        return rows.map(function(row: any) {
            return new Donation(
                row.id,
                row.reason,
                org,
                row.campaign_id,
                Contact.fromId(row.contact_id),
                row.amount_usd,
                row.time,
            );
        });
    }

    toJSON() {
        return {...this};
    }
}

export class User {
    firstName: string;
    lastName: string;
    email: string;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    static fromJWT(token: string): User {
        console.log("TOKEN", token);
        const data = decodeJWT(token);
        console.log("data", data);
        return User.fromEmail(data.email);
    }

    static fromEmail(email: string): User {
        const row: any = db.prepare(
            "SELECT first_name,last_name FROM users WHERE email = ?",
        ).get(email);

        return new User(
            row.first_name,
            row.last_name,
            row.email
        );
    }

    toJSON() {
        return {...this};
    }
}

