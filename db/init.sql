-- Setup SQLite tables

CREATE TABLE orgs(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    desc TEXT,
    org_type TEXT CHECK(org_type IN ('FOR_PROFIT', 'NON_PROFIT')) NOT NULL,
    employee_count INTEGER NOT NULL
);

INSERT INTO orgs(name, desc, org_type, employee_count) VALUES("Cyanhof Floors & Roofing", "Serving northeast Lousiana for 125 years.", "FOR_PROFIT", 47);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES("Evil McDonalds", "Downright malicious.", "FOR_PROFIT", 923);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES("Counting Sheep Co.", "We sleep so you don't have to!", "NON_PROFIT", 18);

CREATE TABLE donations(
    id INTEGER PRIMARY KEY,
    reason TEXT NOT NULL,
    org_id INTEGER NOT NULL,
    campaign_id INTEGER NOT NULL,
    contact_id INTEGER NOT NULL,
    amount_usd REAL NOT NULL,
    time INTEGER NOT NULL
);

CREATE TABLE campaigns(
    id INTEGER PRIMARY KEY,
    -- TODO: WARNUNIQUE
    title TEXT NOT NULL,
    desc TEXT NOT NULL
);

CREATE TABLE contacts(
    id INTEGER PRIMARY KEY,
    -- TODO: WARNUNIQUE(first_name, last_name)
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);

CREATE TABLE contact_methods(
    id INTEGER PRIMARY KEY,
    contact_method TEXT CHECK(contact_method IN ('email', 'phone', 'address')) NOT NULL,

    -- "xyz@gmail.com", "+1 (777) 319-2129", etc
    contact_address TEXT NOT NULL,

    -- Eg "personal email", "work phone", etc
    note TEXT NOT NULL
);

CREATE TABLE org_tags(
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE org_tag_mapping(
    org_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    UNIQUE(org_id, tag_id)
);
