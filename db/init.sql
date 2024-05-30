-- Setup SQLite tables

CREATE TABLE orgs(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    desc TEXT,
    org_type TEXT CHECK(org_type IN ('FOR_PROFIT', 'NON_PROFIT')) NOT NULL,
    employee_count INTEGER NOT NULL
);

CREATE TABLE users(
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULl,
    salt TEXT NOT NULL
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
    reason TEXT,
    org_id INTEGER NOT NULL,
    campaign_id INTEGER NOT NULL,
    contact_id INTEGER NOT NULL,
    amount_usd REAL NOT NULL
    --time INTEGER NOT NULL
);

INSERT INTO donations(org_id, campaign_id, contact_id, amount_usd) VALUES(1, 1, 0, 2000);
INSERT INTO donations(org_id, campaign_id, contact_id, amount_usd) VALUES(2, 1, 0, 3000);
INSERT INTO donations(org_id, campaign_id, contact_id, amount_usd) VALUES(2, 3, 0, 1029);
INSERT INTO donations(org_id, campaign_id, contact_id, amount_usd) VALUES(3, 4, 0, 2000);

CREATE TABLE campaigns(
    id INTEGER PRIMARY KEY,
    -- TODO: WARNUNIQUE
    title TEXT NOT NULL,
    desc TEXT NOT NULL,
    money_needed INTEGER NOT NULL,
    money_donated INTEGER NOT NULL,
    owner_id INTEGER NOT NULL
);

INSERT INTO campaigns(title, desc, money_needed, money_donated, owner_id) VALUES('Football State Championship', 'Our football team needs funding to travel to the state championship.', 10000, 5880, 1);
INSERT INTO campaigns(title, desc, money_needed, money_donated, owner_id) VALUES('Eco Car', 'We need funding to purchase parts for our eco-car team.', 5000, 3208, 1);
INSERT INTO campaigns(title, desc, money_needed, money_donated, owner_id) VALUES('Robotics', 'Our robotics team needs funding to purchase new motors.', 2000, 1029, 1);
INSERT INTO campaigns(title, desc, money_needed, money_donated, owner_id) VALUES('FBLA', 'Our FBLA team needs funding to go to the State Conference.', 2300, 1215, 1);

CREATE TABLE contacts(
    id INTEGER PRIMARY KEY,
    -- TODO: WARNUNIQUE(first_name, last_name)
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    org_id INTEGER NOT NULL
);

-- INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Gerard', 'Bonifactus', '(382) 473-2834', 'gbonifact@rev.com', 1);
-- INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Donald', 'Nordixon', '(382) 234-3843', 'dnordixon@rev.com', 1);
-- INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Hamilton', 'Vernift', '(307) 248-5238', 'hvernift@gmail.com', 1);
-- INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Privit', 'Indot', '(247) 883-1853', 'privit.indot@andymark.com', 2);
-- INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Jordan', 'Nixolidian', '(283) 742-4172', 'jordanix918@gmail.com', 2);
-- INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Iolanus', 'Flickworth', '(247) 294-1753', 'iolanus.flickworth@andymark.com', 2);
-- INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('John', 'Smon', '(147) 195-2439', 'johns03@mcmastercarr.com', 3);
-- INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Enzo', 'Goronza', '(147) 140-1237', 'enzog01@mcmastercarr.com', 3);
-- INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Zeruda', 'Intrant', '(127) 174-1279', 'zerudai04@mcmastercarr.com', 3);


INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Waldo', 'Knight', '(748) 230-1659', 'wknight@rev.com', 1);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Marcel', 'Snyder', '(891) 465-2370', 'msnyder@rev.com', 1);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Jasmine', 'Potter', '(813) 046-7529', 'jpotter@rev.com', 1);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('David', 'McCarthy', '(218) 345-0967', 'davidm@andymark.com', 2);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Ann', 'Hickman', '(759) 603-1842', 'annh@andymark.com', 2);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Karen', 'Townsend', '(205) 837-1946', 'karent@andynark.com', 2);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Isabel', 'Keller', '(742) 150-8269', 'isab.kell@mcmastercarr.com', 3);	
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Sarah', 'Walsh', '(487) 063-2951', 'sara.wals@mcmastercarr.com', 3);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Ann', 'Pineda', '(762) 053-9184', 'ann.pine@mcmastercarr.com', 3);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Richard', 'Meyer', '(652) 198-3407', 'richard.meyer@radiance.org', 4);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Glenn', 'Terrell', '(593) 672-1408', 'glenn.terrell@radiance.org', 4);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Aron', 'Simon', '(901) 427-8653', 'aron.simon@radiance.org', 4);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Gavin', 'McCown', '(471) 690-8235', 'gavin.mccown@kidprints.com', 5);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Cedric', 'Serio', '(038) 791-5246', 'cedric.serio@kidprints.com', 5);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('David', 'Post', '(381) 649-2057', 'david.post@kidprints.com', 5);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Katelyn', 'Finch', '(521) 846-9370', 'kafinch@nasa.gov', 6);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Gail', 'Ford', '(703) 268-1594', 'gkford@nasa.gov', 6);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Edgar', 'Meyers', '(251) 739-0684', 'enmeyers@nasa.gov', 6);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Earl', 'Stanley', '(968) 370-4152', 'stanley02@lockheedmartin.com', 7);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Amina', 'Fry', '(683) 957-4210', 'fry03@lockheedmartin.com', 7);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Heidi', 'Sanford', '(462) 309-7518', 'sanford00@lockheedmartin.com', 7);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Theodore', 'Washington', '(308) 692-5471', 'theodorew@boeing.org', 8);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Kayne', 'Snow', '(481) 236-0975', 'kaynes@boeing.org', 8);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Lula', 'Wood', '(167) 209-4285', 'lulaw@boeing.org', 8);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Dulcie', 'Espinoza', '(167) 925-0348', 'dulcie.espinoza@spacephotonics.com', 9);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Alejandro', 'Leonard', '(582) 419-0673', 'alejandro.leonard@spacephotonics.com', 9);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Erica', 'Bishop', '(095) 236-1847', 'erica.bishop@spacephotonincs.com', 9);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Nicole', 'Stevenson', '(087) 194-2536', 'nstevenson@rustonbrick.com', 10);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Rico', 'Jensen', '(039) 815-4672', 'rjensen@rustonbrick.com', 10);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Roosevelt', 'Guerrero', '(541) 037-9268', 'rguerrero@rustonbrick.com', 10);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Richie', 'Tapia', '(257) 906-8431', 'rich.tapi@parishpress.org', 11);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Calum', 'Decker', '(871) 406-2395', 'calu.deck@parishpress.org', 11);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Hope', 'Lam', '(367) 052-4981', 'hope.lam@parishpress.org', 11);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Leenaj', 'Crosby', '(301) 876-9524', 'l.crosby@crackerbarrel.com', 12);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Annalise', 'Dennis', '(013) 549-8276', 'a.dennis@crackerbarrel.com', 12);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Jessica', 'Keith', '(437) 580-1269', 'j.keith@crackerbarrel.com', 12);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Steven', 'Hooper', '(801) 263-5794', 'steven.hooper@intralox.com', 13);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Chaya', 'Powell', '(637) 485-1092', 'chaya.powell@intralox.com', 13);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Angel', 'Adkins', '(423) 196-8507', 'angel.adkins@intralox.com', 13);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Alisa', 'Silva', '(839) 604-7125', 'asilva@ni.org', 14);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Freddy', 'Humphrey', '(732) 014-6985', 'fhumphrey@ni.org', 14);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Matilda', 'Matthews', '(275) 638-4901', 'mmatthews@ni.org', 14);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Jenna', 'Walls', '(092) 176-3854', 'jw09@apple.org', 15);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Ameera', 'Hobbs', '(594) 217-0836', 'ah18@apple.org', 15);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Orla', 'Watkins', '(310) 524-7896', 'ow21@apple.org', 15);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Musa', 'Moyer', '(295) 068-7314', 'musam@att.com', 16);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Cory', 'Nelson', '(315) 609-8247', 'coryn@att.com', 16);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Norma', 'McCoy', '(953) 817-4260', 'normam@att.com', 16);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Ty', 'Gordon', '(174) 052-6893', 'tgordon@ahgames.com', 17);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Elinor', 'Wright', '(859) 063-1724', 'ewright@ahgames.com', 17);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Harold', 'Summers', '(351) 840-2976', 'hsummers@ahgames.com', 17);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Jaime', 'Ayala', '(956) 140-3728', 'jaim.ayal@eljaritto.com', 18);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Aamir', 'Flores', '(174) 062-9358', 'aami.flor@eljaritto.com', 18);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Tomasz', 'Villa', '(968) 450-3172', 'toma.vill@eljarrito.com', 18);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Mark', 'Wilkerson', '(506) 189-3724', 'mwilkerson@tacosguero.com', 19);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Lilian', 'Medina', '(047) 283-1569', 'lmedina@tacosguero.com', 19);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Sam', 'Burgess', '(870) 346-2195', 'sburgess@tacosguero.com', 19);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Georgie', 'Connolly', '(425) 780-6193', 'georgie.connolly@gibsons.org', 20);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Milan', 'Davila', '(357) 462-0981', 'milan.davila@gibsons.org', 20);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Lili', 'Landry', '(732) 986-4501', 'lili.landry@gibsons.org', 20);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Johnathan', 'Wang', '(913) 624-0578', 'jwang@exxon.com', 21);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Camila', 'Hanson', '(578) 402-1936', 'chanson@exxon.com', 21);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Antonio', 'Pacheco', '(792) 634-5108', 'apacheco@exxon.com', 21);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Alma', 'Matthams', '(025) 386-7941', 'admatthams@shell.com', 22);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Brendom', 'Jenkins', '(834) 619-5720', 'bsjenkins@shell.com', 22);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Giovanni', 'Preston', '(704) 695-1328', 'gipreston@shell.com', 22);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Caroline', 'Lang', '(168) 234-9507', 'caro.lang@walgreens.com', 23);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Constance', 'Fletcher', '(768) 592-1430', 'cons.flet@walgreens.com', 23);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Tina', 'Lynch', '(638) 914-7052', 'tina.lync@walgreens.com', 23);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Jake', 'Kidd', '(012) 564-7893', 'jake.kidd@orangeleaf.com', 24);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Tiago', 'Moss', '(871) 945-0326', 'tiago.moss@orangeleaf.com', 24);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Tasneem', 'Stein', '(821) 930-7456', 'tasneem.stein@orangeleaf.com', 24);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Theo', 'Morrow', '(837) 520-6419', 'theom04@originbank.com', 25);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Keane', 'Small', '(389) 625-0147', 'keanes02@originbank.com', 25);
INSERT INTO contacts(first_name, last_name, phone, email, org_id) VALUES('Alivia', 'Donnelly', '(694) 078-1352', 'aliviad01@originbank.com', 25);

CREATE TABLE contact_methods(
    id INTEGER PRIMARY KEY,
    contact_method TEXT CHECK(contact_method IN ('email', 'phone', 'address')) NOT NULL,

    -- 'xyz@gmail.com', 1);', '+1 (777) 319-2129', etc
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
