-- Setup SQLite tables

CREATE TABLE orgs(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    desc TEXT,
    org_type TEXT CHECK(org_type IN ('FOR_PROFIT', 'NON_PROFIT')) NOT NULL,
    employee_count INTEGER NOT NULL
);

INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('REV Robotics', 'Quality parts for STEM education', 'NON_PROFIT', 147);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Andymark', 'Building the next generation of engineers', 'NON_PROFIT', 297);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('McMaster-Carr', 'Rapid delivery of any part you need', 'NON_PROFIT', 1078);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Radiance Technologies', 'Designing the technologies of the future', 'NON_PROFIT', 118);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Kid Prints', 'Making memories', 'NON_PROFIT', 10);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('NASA', 'Space exploration of the future', 'NON_PROFIT', 18045);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Lockheed Martin', 'Pushing the limits, building the future', 'NON_PROFIT', 2078);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Boeing', 'Reliable planes and vehicles when quality matters', 'NON_PROFIT', 2303);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Space Photonics', 'Designing outside the box', 'NON_PROFIT', 312);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Ruston Brick', 'Brick you can build on', 'NON_PROFIT', 158);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Parish Press', 'Home-brewed coffee and baked goods', 'NON_PROFIT', 23);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Cracker Barrel', 'Hearty, homestyle foods served fast', 'NON_PROFIT', 3582);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Intralox', 'Belts and sprokets for all applications', 'NON_PROFIT', 572);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('National Instruments', 'Control systems you can trust', 'NON_PROFIT', 316);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Apple', 'Newest and best computers and phones', 'NON_PROFIT', 16723);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('AT&T', 'Reliable internet for all your needs', 'NON_PROFIT', 15023);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('A&H Games', 'Games, comics, and roleplay', 'NON_PROFIT', 19);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('El Jarrito', 'Serving food with pride', 'NON_PROFIT', 138);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Tacos the Guero', 'Authentic Mexico City tacos', 'NON_PROFIT', 15);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Gibson’s', 'High-quality, organic foods', 'NON_PROFIT', 234);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Exxon', 'Affordable amenities wherever you go', 'NON_PROFIT', 2575);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Shell', 'Fueling your dreams', 'NON_PROFIT', 2487);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Walgreens', 'Medications brought to you at low prices', 'NON_PROFIT', 362);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Orange Leaf', 'Fulfilling your cravings for quality deserts', 'NON_PROFIT', 258);
INSERT INTO orgs(name, desc, org_type, employee_count) VALUES('Origin Bank', 'Secure, small town banking', 'NON_PROFIT', 210);

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
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    org_id INTEGER NOT NULL
);

INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Gerard', 'Bonifactus', '(382) 473-2834', 'gbonifact@rev.com', 1);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Donald', 'Nordixon', '(382) 234-3843', 'dnordixon@rev.com', 1);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Hamilton', 'Vernift', '(307) 248-5238', 'hvernift@gmail.com', 1);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Privit', 'Indot', '(247) 883-1853', 'privit.indot@andymark.com', 2);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Jordan', 'Nixolidian', '(283) 742-4172', 'jordanix918@gmail.com', 2);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Iolanus', 'Flickworth', '(247) 294-1753', 'iolanus.flickworth@andymark.com', 2);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('John', 'Smon', '(147) 195-2439', 'johns03@mcmastercarr.com', 3);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Enzo', 'Goronza', '(147) 140-1237', 'enzog01@mcmastercarr.com', 3);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Zeruda', 'Intrant', '(127) 174-1279', 'zerudai04@mcmastercarr.com', 3);

CREATE TABLE contact_methods(
    id INTEGER PRIMARY KEY,
    contact_method TEXT CHECK(contact_method IN ('email', 'phone', 'address')) NOT NULL,

    -- 'xyz@gmail.com', '+1 (777) 319-2129', etc
    contact_address TEXT NOT NULL,

    -- Eg 'personal email', 'work phone', etc
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
