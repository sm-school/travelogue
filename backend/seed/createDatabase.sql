DROP TABLE account CASCADE;

CREATE TABLE account (
	id SERIAL PRIMARY KEY,
	email VARCHAR UNIQUE NOT NULL,
	pass VARCHAR NOT NULL,
	gmail_sign_in boolean,
	display_name VARCHAR,
	first_name VARCHAR,
	last_name VARCHAR,
	photo VARCHAR,
	domain_name VARCHAR
);

INSERT INTO account VALUES
(
	DEFAULT,
	'test@example.com',
	'$2a$10$3ERluFbyZWJgOdpvbjUB3.2owUqmy.d1wJ/B4O9fuHeOr/eg0ur4a',
	NULL,
	'Display Name',
	'First1',
	'Last1',
	'https://cdn.dribbble.com/users/199982/screenshots/4044699/furkan-avatar-dribbble_1x.png',
	NULL
),
(
	DEFAULT,
	'test2@example.com',
	'$2a$10$3ERluFbyZWJgOdpvbjUB3.2owUqmy.d1wJ/B4O9fuHeOr/eg0ur4a',
	NULL,
	'First2',
	'Last2',
	NULL,
	NULL,
	NULL
),
(
	DEFAULT,
	'test3@example.com',
	'$2a$10$3ERluFbyZWJgOdpvbjUB3.2owUqmy.d1wJ/B4O9fuHeOr/eg0ur4a',
	NULL,
	NULL,
	NULL,
	NULL,
	NULL,
	NULL
);

DROP TABLE trip CASCADE;
DROP TABLE image CASCADE;
DROP TABLE landmark CASCADE;

CREATE TABLE trip (
	id SERIAL,
	name VARCHAR(200) DEFAULT 'Untitled trip',
	owner INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (owner) REFERENCES account (id)
);

CREATE TABLE image (
	id SERIAL,
	s3_id VARCHAR(100) NOT NULL UNIQUE,
	latitude NUMERIC,
	longitude NUMERIC,
	account_id INT NOT NULL,
	trip_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (account_id) REFERENCES account (id),
	FOREIGN KEY (trip_id) REFERENCES trip (id)
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

INSERT INTO trip VALUES (DEFAULT, 'Washington DC', 1);

INSERT INTO image VALUES (DEFAULT, 'DSC_0001.jpg', '38.8885', '-77.006566', 1, 1);
INSERT INTO image VALUES (DEFAULT, 'DSC_0002.jpg', '38.8885', '-77.05', 1, 1);
INSERT INTO image VALUES (DEFAULT, 'DSC_0003.jpg', '38.8885', '-77.0495', 1, 1);
INSERT INTO image VALUES (DEFAULT, 'DSC_0004.jpg', '38.890383', '-77.004666', 1, 1);
INSERT INTO image VALUES (DEFAULT, 'DSC_0005.jpg', '38.8977', '-77.036083', 1, 1);

INSERT INTO landmark VALUES (DEFAULT, 1, 'U.S. Capitol', 38.889805, -77.010673, 'United States Capitol', 'The United States Capitol, often called the Capitol Building, is the home of the United States Congress, and the seat of the legislative branch of the U.S.', false);
INSERT INTO landmark VALUES (DEFAULT, 2, 'Lincoln Memorial', '38.889296', '-77.049913', 'Lincoln Memorial', 'The Lincoln Memorial is an American national monument built to honor the 16th President of the United States, Abraham Lincoln.', false);
INSERT INTO landmark VALUES (DEFAULT, 3, 'National Mall', '38.892091', '-77.024055', 'National Mall', 'The National Mall is a landscaped park within the National Mall and Memorial Parks, an official unit of the United States National Park System.', false);
INSERT INTO landmark VALUES (DEFAULT, 4, 'United States Supreme Court building', '38.890636', '-77.005341', 'United States Supreme Court Building', 'The Supreme Court Building is the seat of the Supreme Court of the United States and the Judicial Branch thereof.', false);
INSERT INTO landmark VALUES (DEFAULT, 5, 'White House', '38.897312', '-77.036564', 'White House', 'The White House is the official residence and workplace of the President of the United States.', false);
