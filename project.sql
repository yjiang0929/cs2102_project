#cs2102 Project
drop table if exists Contracts cascade;
drop table if exists Reviews cascade;
drop table if exists Freelancers cascade;
drop table if exists Specializations cascade;
DROP TABLE IF EXISTS Tasks CASCADE;
DROP TABLE IF EXISTS Locations CASCADE;
DROP TABLE IF EXISTS Supervisors CASCADE;
DROP TABLE IF EXISTS Customers CASCADE;
DROP TABLE IF EXISTS PaymentMethods CASCADE;
DROP TABLE IF EXISTS ContactMethods CASCADE;


CREATE TABLE Locations (
	lid 			INTEGER NOT NULL,
	lname			VARCHAR(20) NOT NULL,
	PRIMARY KEY (lid)
);


CREATE TABLE Tasks (
	tid				INTEGER NOT NULL, -- task id
	description		VARCHAR(200),
	tdate			DATE NOT NULL, -- task date
	lid				INTEGER NOT NULL,
	PRIMARY KEY (tid),
	FOREIGN KEY (lid) REFERENCES Locations(lid)
);


create table Contracts(
Cid integer primary key,
Date date,
PayAmount integer,
Tid integer references Tasks(tid));

CREATE TABLE Customers (
  cname VARCHAR(60),
  firstname VARCHAR(30),
  lastname VARCHAR(30),
  gender VARCHAR(10),
  PRIMARY KEY (cname)
);


CREATE TABLE Specializations (
Specid 		integer,	 
DifficultyLevel 	varchar(10),
Category 	varchar(60),
Tid 		integer,		 
PRIMARY KEY (Specid),
FOREIGN KEY (Tid) REFERENCES Tasks(tid)
);

CREATE TABLE PaymentMethods (
  cord VARCHAR(10),
  cardnumber VARCHAR(16),
  expdate DATE, 
  cname VARCHAR(60),
  FOREIGN KEY (cname) REFERENCES Customers(cname),
  PRIMARY KEY (cname, cardnumber)
);

CREATE TABLE ContactMethods (
  phonenumber VARCHAR(20),
  areacode VARCHAR(5),
  PRIMARY KEY (phonenumber, areacode)
);

CREATE TABLE Freelancers (
fname		varchar(60),
Name 		varchar(60), 
Gender		varchar(10),
PhoneNumber	VARCHAR(20),
AreaCode 	VARCHAR(5), 
Cid 		integer,
Tid 		integer,
Specid 		integer,
PRIMARY KEY (fname),
FOREIGN KEY (PhoneNumber, areacode) REFERENCES ContactMethods(phonenumber,areacode),
FOREIGN KEY (Cid) REFERENCES Contracts(Cid),
FOREIGN KEY (Tid) REFERENCES Tasks(tid),
FOREIGN KEY (Specid) REFERENCES Specializations(Specid)
);

create table Reviews (
cname varchar(100) references Customers(cname),
fname varchar(100) references Freelancers(fname),
rating varchar(100),
Date date,
primary key (cname, fname)
);

CREATE TABLE Supervisors (
	sid				INTEGER NOT NULL,
	sname 			VARCHAR(20) NOT NULL,
	sgender			VARCHAR(20) NOT NULL,
	tid				INTEGER NOT NULL, 
	PRIMARY KEY (sid),
	FOREIGN KEY (tid) REFERENCES Tasks(tid)
);
