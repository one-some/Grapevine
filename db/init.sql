PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE orgs(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    desc TEXT,
    org_type TEXT CHECK(org_type IN ('FOR_PROFIT', 'NON_PROFIT')) NOT NULL,
    employee_count INTEGER NOT NULL,
    annual_profit INTEGER NOT NULL
);
INSERT INTO orgs VALUES(1,'REV Robotics','Quality parts for STEM education','NON_PROFIT',35,645);
INSERT INTO orgs VALUES(2,'Andymark','Building the next generation of engineers','NON_PROFIT',297,539);
INSERT INTO orgs VALUES(3,'McMaster-Carr','Rapid delivery of any part you need','NON_PROFIT',1078,132);
INSERT INTO orgs VALUES(4,'Radiance Technologies','Designing the technologies of the future','NON_PROFIT',118,447);
INSERT INTO orgs VALUES(5,'Kid Prints','Making memories','NON_PROFIT',10,695);
INSERT INTO orgs VALUES(6,'NASA','Space exploration of the future','NON_PROFIT',18045,488);
INSERT INTO orgs VALUES(7,'Lockheed Martin','Pushing the limits, building the future','NON_PROFIT',2078,859);
INSERT INTO orgs VALUES(8,'Boeing','Reliable planes and vehicles when quality matters','NON_PROFIT',2303,843);
INSERT INTO orgs VALUES(9,'Space Photonics','Designing outside the box','NON_PROFIT',312,118);
INSERT INTO orgs VALUES(10,'Ruston Brick','Brick you can build on','NON_PROFIT',158,950);
INSERT INTO orgs VALUES(11,'Parish Press','Home-brewed coffee and baked goods','NON_PROFIT',23,782);
INSERT INTO orgs VALUES(12,'Cracker Barrel','Hearty, homestyle foods served fast','NON_PROFIT',3582,680);
INSERT INTO orgs VALUES(13,'Intralox','Belts and sprokets for all applications','NON_PROFIT',572,818);
INSERT INTO orgs VALUES(14,'National Instruments','Control systems you can trust','NON_PROFIT',316,484);
INSERT INTO orgs VALUES(15,'Apple','Newest and best computers and phones','NON_PROFIT',16723,229);
INSERT INTO orgs VALUES(16,'AT&T','Reliable internet for all your needs','NON_PROFIT',15023,170);
INSERT INTO orgs VALUES(17,'A&H Games','Games, comics, and roleplay','NON_PROFIT',19,101);
INSERT INTO orgs VALUES(18,'El Jarrito','Serving food with pride','NON_PROFIT',138,169);
INSERT INTO orgs VALUES(19,'Tacos the Guero','Authentic Mexico City tacos','NON_PROFIT',15,329);
INSERT INTO orgs VALUES(20,'Gibson’s','High-quality, organic foods','NON_PROFIT',234,299);
INSERT INTO orgs VALUES(21,'Exxon','Affordable amenities wherever you go','NON_PROFIT',2575,377);
INSERT INTO orgs VALUES(22,'Shell','Fueling your dreams','NON_PROFIT',2487,390);
INSERT INTO orgs VALUES(23,'Walgreens','Medications brought to you at low prices','NON_PROFIT',362,410);
INSERT INTO orgs VALUES(24,'Orange Leaf','Fulfilling your cravings for quality deserts','NON_PROFIT',258,676);
INSERT INTO orgs VALUES(25,'Origin Bank','Secure, small town banking','NON_PROFIT',210,794);
CREATE TABLE donations(
    id INTEGER PRIMARY KEY,
    reason TEXT,
    org_id INTEGER NOT NULL,
    campaign_id INTEGER NOT NULL,
    contact_id INTEGER NOT NULL,
    amount_usd REAL NOT NULL,
    time INTEGER NOT NULL
);
INSERT INTO donations VALUES(1,NULL,1,1,1,2000.0,1718425403);
INSERT INTO donations VALUES(2,NULL,2,1,2,3000.0,1718535403);
INSERT INTO donations VALUES(3,NULL,2,3,2,1029.0,1718655403);
INSERT INTO donations VALUES(4,NULL,3,4,3,2000.0,1718675403);
CREATE TABLE campaigns(
    id INTEGER PRIMARY KEY,
    -- TODO: WARNUNIQUE
    title TEXT NOT NULL,
    desc TEXT NOT NULL,
    money_needed INTEGER NOT NULL,
    money_donated INTEGER NOT NULL,
    owner_id INTEGER NOT NULL
);
INSERT INTO campaigns VALUES(1,'Football State Championship','Our football team needs funding to travel to the state championship.',10000,5880,1);
INSERT INTO campaigns VALUES(2,'Eco Car','We need funding to purchase parts for our eco-car team.',5000,3208,1);
INSERT INTO campaigns VALUES(3,'Robotics','Our robotics team needs funding to purchase new motors.',2000,1029,1);
INSERT INTO campaigns VALUES(4,'FBLA','Our FBLA team needs funding to go to the State Conference.',2300,1215,1);
CREATE TABLE contacts(
    id INTEGER PRIMARY KEY,
    -- TODO: WARNUNIQUE(first_name, last_name)
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    org_id INTEGER NOT NULL
);
INSERT INTO contacts VALUES(1,'Waldo','Knight','(748) 230-1659','wknight@rev.com',1);
INSERT INTO contacts VALUES(2,'Marcel','Snyder','(891) 465-2370','msnyder@rev.com',1);
INSERT INTO contacts VALUES(3,'Jasmine','Potter','(813) 046-7529','jpotter@rev.com',1);
INSERT INTO contacts VALUES(4,'David','McCarthy','(218) 345-0967','davidm@andymark.com',2);
INSERT INTO contacts VALUES(5,'Ann','Hickman','(759) 603-1842','annh@andymark.com',2);
INSERT INTO contacts VALUES(6,'Karen','Townsend','(205) 837-1946','karent@andynark.com',2);
INSERT INTO contacts VALUES(7,'Isabel','Keller','(742) 150-8269','isab.kell@mcmastercarr.com',3);
INSERT INTO contacts VALUES(8,'Sarah','Walsh','(487) 063-2951','sara.wals@mcmastercarr.com',3);
INSERT INTO contacts VALUES(9,'Ann','Pineda','(762) 053-9184','ann.pine@mcmastercarr.com',3);
INSERT INTO contacts VALUES(10,'Richard','Meyer','(652) 198-3407','richard.meyer@radiance.org',4);
INSERT INTO contacts VALUES(11,'Glenn','Terrell','(593) 672-1408','glenn.terrell@radiance.org',4);
INSERT INTO contacts VALUES(12,'Aron','Simon','(901) 427-8653','aron.simon@radiance.org',4);
INSERT INTO contacts VALUES(13,'Gavin','McCown','(471) 690-8235','gavin.mccown@kidprints.com',5);
INSERT INTO contacts VALUES(14,'Cedric','Serio','(038) 791-5246','cedric.serio@kidprints.com',5);
INSERT INTO contacts VALUES(15,'David','Post','(381) 649-2057','david.post@kidprints.com',5);
INSERT INTO contacts VALUES(16,'Katelyn','Finch','(521) 846-9370','kafinch@nasa.gov',6);
INSERT INTO contacts VALUES(17,'Gail','Ford','(703) 268-1594','gkford@nasa.gov',6);
INSERT INTO contacts VALUES(18,'Edgar','Meyers','(251) 739-0684','enmeyers@nasa.gov',6);
INSERT INTO contacts VALUES(19,'Earl','Stanley','(968) 370-4152','stanley02@lockheedmartin.com',7);
INSERT INTO contacts VALUES(20,'Amina','Fry','(683) 957-4210','fry03@lockheedmartin.com',7);
INSERT INTO contacts VALUES(21,'Heidi','Sanford','(462) 309-7518','sanford00@lockheedmartin.com',7);
INSERT INTO contacts VALUES(22,'Theodore','Washington','(308) 692-5471','theodorew@boeing.org',8);
INSERT INTO contacts VALUES(23,'Kayne','Snow','(481) 236-0975','kaynes@boeing.org',8);
INSERT INTO contacts VALUES(24,'Lula','Wood','(167) 209-4285','lulaw@boeing.org',8);
INSERT INTO contacts VALUES(25,'Dulcie','Espinoza','(167) 925-0348','dulcie.espinoza@spacephotonics.com',9);
INSERT INTO contacts VALUES(26,'Alejandro','Leonard','(582) 419-0673','alejandro.leonard@spacephotonics.com',9);
INSERT INTO contacts VALUES(27,'Erica','Bishop','(095) 236-1847','erica.bishop@spacephotonincs.com',9);
INSERT INTO contacts VALUES(28,'Nicole','Stevenson','(087) 194-2536','nstevenson@rustonbrick.com',10);
INSERT INTO contacts VALUES(29,'Rico','Jensen','(039) 815-4672','rjensen@rustonbrick.com',10);
INSERT INTO contacts VALUES(30,'Roosevelt','Guerrero','(541) 037-9268','rguerrero@rustonbrick.com',10);
INSERT INTO contacts VALUES(31,'Richie','Tapia','(257) 906-8431','rich.tapi@parishpress.org',11);
INSERT INTO contacts VALUES(32,'Calum','Decker','(871) 406-2395','calu.deck@parishpress.org',11);
INSERT INTO contacts VALUES(33,'Hope','Lam','(367) 052-4981','hope.lam@parishpress.org',11);
INSERT INTO contacts VALUES(34,'Leenaj','Crosby','(301) 876-9524','l.crosby@crackerbarrel.com',12);
INSERT INTO contacts VALUES(35,'Annalise','Dennis','(013) 549-8276','a.dennis@crackerbarrel.com',12);
INSERT INTO contacts VALUES(36,'Jessica','Keith','(437) 580-1269','j.keith@crackerbarrel.com',12);
INSERT INTO contacts VALUES(37,'Steven','Hooper','(801) 263-5794','steven.hooper@intralox.com',13);
INSERT INTO contacts VALUES(38,'Chaya','Powell','(637) 485-1092','chaya.powell@intralox.com',13);
INSERT INTO contacts VALUES(39,'Angel','Adkins','(423) 196-8507','angel.adkins@intralox.com',13);
INSERT INTO contacts VALUES(40,'Alisa','Silva','(839) 604-7125','asilva@ni.org',14);
INSERT INTO contacts VALUES(41,'Freddy','Humphrey','(732) 014-6985','fhumphrey@ni.org',14);
INSERT INTO contacts VALUES(42,'Matilda','Matthews','(275) 638-4901','mmatthews@ni.org',14);
INSERT INTO contacts VALUES(43,'Jenna','Walls','(092) 176-3854','jw09@apple.org',15);
INSERT INTO contacts VALUES(44,'Ameera','Hobbs','(594) 217-0836','ah18@apple.org',15);
INSERT INTO contacts VALUES(45,'Orla','Watkins','(310) 524-7896','ow21@apple.org',15);
INSERT INTO contacts VALUES(46,'Musa','Moyer','(295) 068-7314','musam@att.com',16);
INSERT INTO contacts VALUES(47,'Cory','Nelson','(315) 609-8247','coryn@att.com',16);
INSERT INTO contacts VALUES(48,'Norma','McCoy','(953) 817-4260','normam@att.com',16);
INSERT INTO contacts VALUES(49,'Ty','Gordon','(174) 052-6893','tgordon@ahgames.com',17);
INSERT INTO contacts VALUES(50,'Elinor','Wright','(859) 063-1724','ewright@ahgames.com',17);
INSERT INTO contacts VALUES(51,'Harold','Summers','(351) 840-2976','hsummers@ahgames.com',17);
INSERT INTO contacts VALUES(52,'Jaime','Ayala','(956) 140-3728','jaim.ayal@eljaritto.com',18);
INSERT INTO contacts VALUES(53,'Aamir','Flores','(174) 062-9358','aami.flor@eljaritto.com',18);
INSERT INTO contacts VALUES(54,'Tomasz','Villa','(968) 450-3172','toma.vill@eljarrito.com',18);
INSERT INTO contacts VALUES(55,'Mark','Wilkerson','(506) 189-3724','mwilkerson@tacosguero.com',19);
INSERT INTO contacts VALUES(56,'Lilian','Medina','(047) 283-1569','lmedina@tacosguero.com',19);
INSERT INTO contacts VALUES(57,'Sam','Burgess','(870) 346-2195','sburgess@tacosguero.com',19);
INSERT INTO contacts VALUES(58,'Georgie','Connolly','(425) 780-6193','georgie.connolly@gibsons.org',20);
INSERT INTO contacts VALUES(59,'Milan','Davila','(357) 462-0981','milan.davila@gibsons.org',20);
INSERT INTO contacts VALUES(60,'Lili','Landry','(732) 986-4501','lili.landry@gibsons.org',20);
INSERT INTO contacts VALUES(61,'Johnathan','Wang','(913) 624-0578','jwang@exxon.com',21);
INSERT INTO contacts VALUES(62,'Camila','Hanson','(578) 402-1936','chanson@exxon.com',21);
INSERT INTO contacts VALUES(63,'Antonio','Pacheco','(792) 634-5108','apacheco@exxon.com',21);
INSERT INTO contacts VALUES(64,'Alma','Matthams','(025) 386-7941','admatthams@shell.com',22);
INSERT INTO contacts VALUES(65,'Brendom','Jenkins','(834) 619-5720','bsjenkins@shell.com',22);
INSERT INTO contacts VALUES(66,'Giovanni','Preston','(704) 695-1328','gipreston@shell.com',22);
INSERT INTO contacts VALUES(67,'Caroline','Lang','(168) 234-9507','caro.lang@walgreens.com',23);
INSERT INTO contacts VALUES(68,'Constance','Fletcher','(768) 592-1430','cons.flet@walgreens.com',23);
INSERT INTO contacts VALUES(69,'Tina','Lynch','(638) 914-7052','tina.lync@walgreens.com',23);
INSERT INTO contacts VALUES(70,'Jake','Kidd','(012) 564-7893','jake.kidd@orangeleaf.com',24);
INSERT INTO contacts VALUES(71,'Tiago','Moss','(871) 945-0326','tiago.moss@orangeleaf.com',24);
INSERT INTO contacts VALUES(72,'Tasneem','Stein','(821) 930-7456','tasneem.stein@orangeleaf.com',24);
INSERT INTO contacts VALUES(73,'Theo','Morrow','(837) 520-6419','theom04@originbank.com',25);
INSERT INTO contacts VALUES(74,'Keane','Small','(389) 625-0147','keanes02@originbank.com',25);
INSERT INTO contacts VALUES(75,'Alivia','Donnelly','(694) 078-1352','aliviad01@originbank.com',25);
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
CREATE TABLE users(
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    salt TEXT NOT NULL
);
INSERT INTO users VALUES('Anhaar','Wasi','wasiuddin2007@gmail.com','a81702a8ee3d36103ed8f424bb3c56f14abe5a4a46bf15bf383577d68c295fbd9d7680757878d78440fb3a942bd46805b343f3496f29129b3171c465aca07bb5','90c2ea80d91e2d85981f4ce0dc3fa1c6');
INSERT INTO users VALUES('Cedric','Serio','jcedricserio@gmail.com','e6bd598570e459bc19f5058de865be7cee35dd3483a4c6b5aab9f18a99a8959445843b2d1ec43c6e17a833d839adde5bc87741cf0ef5f6aa60c02a5173d2a075','c0a78593a4d88fbb4846d5d664e58b0b');
INSERT INTO users VALUES('Gavin','McCown','gavin.mccown@lincolnschoolscb.org','60020281d7c8bd36fe064ea0c01ec4c40826610604c042fa7762c92542cd2aa8b9ac6a587576be05c123af3c0be28a9495203d57d17a43e32c54e95a74d6bc1d','2a59685a5132d7496bc33202cb21ac55');
COMMIT;
