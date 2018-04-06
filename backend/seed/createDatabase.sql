DROP TABLE account CASCADE;
DROP TABLE image CASCADE;
DROP TABLE landmark CASCADE;

CREATE TABLE account (
    id serial PRIMARY KEY,
   	email varchar UNIQUE NOT NULL,
    pass varchar NOT NULL
);

alter table account add column gmail_sign_in boolean;
alter table account add column display_name boolean;
alter table account add column first_fame varchar;
alter table account add column last_name varchar;
alter table account add column photo varchar;
alter table account add column domain_name varchar;


INSERT INTO account
(email, pass)
VALUES('test@test.com','$2a$10$3ERluFbyZWJgOdpvbjUB3.2owUqmy.d1wJ/B4O9fuHeOr/eg0ur4a');


CREATE TABLE image (
	id SERIAL,
	s3_id VARCHAR(100) NOT NULL UNIQUE,
	latitude NUMERIC,
	longitude NUMERIC,
	account_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (account_id) REFERENCES account (id)
);

CREATE TABLE landmark (
	id SERIAL,
	image_id INT NOT NULL,
	name VARCHAR(200) NOT NULL,
	latitude NUMERIC NOT NULL,
	longitude NUMERIC NOT NULL,
	page VARCHAR(200) NOT NULL,
	extract VARCHAR(1000) NOT NULL,
	accepted BOOLEAN NOT NULL DEFAULT FALSE,
	PRIMARY KEY (id),
	FOREIGN KEY (image_id) REFERENCES image (id),
	UNIQUE (image_id, name)
);


INSERT INTO image VALUES (DEFAULT, 'parliament.jpg', 51.499355, -0.124683, 1);
INSERT INTO image VALUES (DEFAULT, 'pisa.jpg', NULL, NULL, 1);

INSERT INTO landmark VALUES (DEFAULT, 1, 'London Eye', 51.502999, -0.120742, 'London Eye', 'The London Eye is a giant Ferris wheel on the South Bank of the River Thames in London.');
INSERT INTO landmark VALUES (DEFAULT, 1, 'Big Ben', 51.500782, -0.124626, 'Big Ben', 'Big Ben is the nickname for the Great Bell of the clock at the north end of the Palace of Westminster in London and is usually extended to refer to both the clock and the clock tower.');
INSERT INTO landmark VALUES (DEFAULT, 1, 'Houses of Parliament', 51.499355, -0.124683, 'Palace of Westminster', 'The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom.', true);
INSERT INTO landmark VALUES (DEFAULT, 2, 'Piazza dei Miracoli', 43.722855, 10.395813, 'Piazza dei Miracoli', 'The Piazza dei Miracoli, formally known as Piazza del Duomo, is a walled 8.87-hectare area located in Pisa, Tuscany, Italy, recognized as an important center of European medieval art and one of the finest architectural complexes in the world.');
INSERT INTO landmark VALUES (DEFAULT, 2, 'Pisa', 43.759192, 10.371093, 'Pisa', 'Pisa is a city in the Tuscany region of Central Italy straddling the Arno just before it empties into the Ligurian Sea.');
