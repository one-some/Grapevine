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

    static fromId(id: string) {
        const query = "SELECT id,reason,org_id,campaign_id,contact_id,amount_usd,time_started,time_last_action,donation_stage FROM donations_in_progress WHERE id = ?;";
        const row: any = db.prepare(query).get(id);

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
    }

    static updateStage(donation: DonationInProgress) {
        // UPDATE (table) SET (x = ?) WHERE (x = 1);
        const query = "UPDATE donations_in_progress SET amount_usd = ?,time_last_action = ?,donation_stage = ? WHERE id = ?;";
        const row: any = db.prepare(query).run(donation.amountUsd, donation.time_last_action, donation.donation_stage, donation.id);
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
    potentialDonation: number;
    potentialStatus: number;

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

        let ret = Organization.calcPotentialDonation(this);
        this.potentialDonation = ret.amount;
        this.potentialStatus = ret.status;
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
    
    static getDonationsJSONed(organization: Organization) {
        const query = "SELECT id,reason,campaign_id,contact_id,amount_usd,time FROM donations WHERE org_id = ?;";
        const rows: any[] = db.prepare(query).all([organization.id]);

        // Little odd but will satisfy typing
        const org = organization;
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

    getNegotiations() {
        const query = "SELECT id,reason,org_id,campaign_id,contact_id,amount_usd,time_started,time_last_action,donation_stage FROM donations_in_progress WHERE org_id = ?;";
        const rows: any[] = db.prepare(query).all([this.id]);

        // Little odd but will satisfy typing
        const org = this;
        return rows.map(function(row: any) {
            return new DonationInProgress(
                row.id,
                row.reason,
                org,
                row.campaign_id,
                Contact.fromId(row.contact_id),
                row.amount_usd,
                row.time_started,
                row.time_last_action,
                NegotiationStage[row.donation_stage as keyof typeof NegotiationStage]
            );
        });
    }


    static getAll() {
        const query = `SELECT ${Organization.FullSelectCriteria} FROM orgs WHERE 1 = 1;`;
        const rows: any[] = db.prepare(query).all();

        return rows.map(function(row: any) {
            return Organization.fromSQLRow(row);
        });
    }

    static calcPotentialDonation(org: Organization) {
        let donations = Organization.getDonationsJSONed(org);

        if (donations.length == 0) {
            return {amount: 1000, status: 3};
        }

        donations.sort((a, b) => b.time-a.time);

        let average = 0;
        for (let donation of donations) {
            average += donation.amountUsd;
        }
        average /= donations.length;

        const time_to_avoid = 7776000000; // 3 months
        const time_to_ramp = 7776000000; // 3 months

        let status = 0;
        // console.log("start", Date.now());
        let time_mod = Date.now()-(donations[0].time)*1000;
        // console.log("start", time_mod);

        time_mod -= time_to_avoid;
        time_mod /= time_to_ramp
        // console.log(time_mod);
        if (time_mod <= 0) {
            status = 0; // DO NOT ASK
        }else if (time_mod <= 0.5) {
            status = 1; // NOT Good Idea
        }else if (time_mod <= 1) {
            status = 2; // In a pinch
        }else {
            status = 3; // Ask away!
        }
        // console.log(time_mod);
        time_mod = Math.max(0, Math.min(1, time_mod));
        // console.log(time_mod);

        return {amount: Math.floor(average*time_mod), status: status};
    }

    toJSON() {
        return {...this};
    }
}

export class Campaign {
    static FullSelectCriteria = [
        "id",
        "title",
        "desc",
        "money_needed",
        "owner_id",
        "deadline",
    ].join(",");

    id: number;
    title: string;
    desc: string;
    money_needed: number;
    money_donated: number;
    owner_id: number;
    deadline: number;
    money_per_day: number;
    days_left: number;

    constructor(
        id: number,
        title: string,
        desc: string,
        money_needed: number,
        money_donated: number,
        owner_id: number,
        deadline: number,
    ) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.money_needed = money_needed;
        this.money_donated = money_donated;
        this.owner_id = owner_id;
        this.deadline = deadline;
        
        let ret = Campaign.calcMoneyPerDay(this);
        this.money_per_day = ret.money_per_day;
        this.days_left = ret.days_left;
    }

    static fromSQLRow(row: any): Campaign {
        const d = db.prepare("SELECT SUM(amount_usd) FROM donations WHERE campaign_id = ?").get(row.id)["SUM(amount_usd)"] ?? 0;
        return new Campaign(
            row.id,
            row.title,
            row.desc,
            row.money_needed,
            d,
            row.owner_id,
            row.deadline
        );
    }

    static fromId(id: number): Campaign {
        const row = db.prepare(`SELECT ${Campaign.FullSelectCriteria} FROM campaigns WHERE id = ?;`).get(id);
        return Campaign.fromSQLRow(row);
    }

    static fromName(name: string): Campaign {
        const row = db.prepare(`SELECT ${Campaign.FullSelectCriteria} FROM campaigns WHERE name = ?;`).get(name);
        return Campaign.fromSQLRow(row);
    }

    static getAll() {
        const query = `SELECT ${Campaign.FullSelectCriteria} FROM campaigns WHERE 1 = 1;`;
        const rows: any[] = db.prepare(query).all();

        return rows.map(function(row: any) {
            return Campaign.fromSQLRow(row);
        });
    }

    static calcMoneyPerDay(campaign: Campaign) {
        const unixDay = 86400;
        let days_left = campaign.deadline-(Date.now() / 1000);
        days_left = Math.ceil(days_left/unixDay);
        let money_left = campaign.money_needed-campaign.money_donated;
        return {money_per_day: Math.ceil(money_left/days_left), days_left: days_left};
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
        const data = decodeJWT(token);
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

