CREATE TABLE account (
    id serial PRIMARY KEY,
    username varchar (25) UNIQUE NOT NULL ,
    pass varchar NOT NULL
);

INSERT INTO account
(username, pass)
VALUES('username','$2a$10$3ERluFbyZWJgOdpvbjUB3.2owUqmy.d1wJ/B4O9fuHeOr/eg0ur4a');