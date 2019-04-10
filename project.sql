--cs2102 Project
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
drop table if exists Bidtasks cascade;
drop table if exists FreelancerSpecs cascade;


CREATE TABLE Locations (
	lid 			INTEGER NOT NULL,
	city			VARCHAR(20) NOT NULL,
	country		VARCHAR(20),
	PRIMARY KEY (lid)
);

CREATE TABLE Specializations (
Specid 				integer,
DifficultyLevel 	varchar(10),
Category 			varchar(60),
PRIMARY KEY (Specid)
);


CREATE TABLE Customers (
  cname 			VARCHAR(60),
  firstname 		VARCHAR(30),
  lastname 			VARCHAR(30),
  gender 			VARCHAR(10),
	password		VARCHAR(20),
  PRIMARY KEY (cname)
);


CREATE TABLE Tasks (
	tid				INTEGER NOT NULL, -- task id
	description		VARCHAR(200),
	tdate			VARCHAR(50) NOT NULL, -- task date
	lid				INTEGER NOT NULL,
	Specid			INTEGER,
	cname 		VARCHAR(60),
	address VARCHAR(100),
	PRIMARY KEY (tid),
	FOREIGN KEY (cname) REFERENCES Customers(cname),
	FOREIGN KEY (Specid) REFERENCES Specializations(Specid),
	FOREIGN KEY (lid) REFERENCES Locations(lid)
);


CREATE TABLE PaymentMethods (
  cardnumber 		VARCHAR(16),
  expdate 			VARCHAR(10),
	currency		VARCHAR(12),
  cname 			VARCHAR(60),
  FOREIGN KEY (cname) REFERENCES Customers(cname),
  PRIMARY KEY (cname, cardnumber)
);

CREATE TABLE ContactMethods (
	name	VARCHAR(60),
  phonenumber 		VARCHAR(20),
  areacode 			VARCHAR(5),
  PRIMARY KEY (name, phonenumber)
);

CREATE TABLE Freelancers (
fname		varchar(60),
firstname 		varchar(60),
lastname  varchar(60),
Gender		varchar(10),
password 	VARCHAR(20),
PRIMARY KEY (fname)
);

CREATE TABLE FreelancerSpecs (
	fname VARCHAR(60),
	Specid integer,
	PRIMARY KEY (fname, Specid),
	FOREIGN KEY (fname) REFERENCES Freelancers(fname),
	FOREIGN KEY (Specid) REFERENCES Specializations(Specid)
);


CREATE TABLE BidTasks (
fname 		varchar(60),
tid 		integer,
bidPrice	integer,
FOREIGN KEY (tid) REFERENCES Tasks(tid),
FOREIGN KEY (fname) REFERENCES Freelancers(fname)
);

create table Reviews (
cname 				varchar(100) references Customers(cname),
fname 				varchar(100) references Freelancers(fname),
rating 				integer,
review				varchar(100),
rdate 				varchar(10),
primary key (cname, fname, rdate)
);

CREATE TABLE Supervisors (
	sname 			VARCHAR(20) NOT NULL,
	firstname 		VARCHAR(20),
	lastname		VARCHAR(20),
	gender			VARCHAR(20) NOT NULL,
	password		VARCHAR(20),
	PRIMARY KEY (sname)
);


create table Contracts(
Cid 		integer,
Date 		varchar(10),
PayAmount 	integer,
Tid 		integer,
fname 		varchar(60),
cname 		varchar(60),
sname 		varchar(20),
address 	varchar(100),
PRIMARY KEY (Cid),
FOREIGN KEY (Tid) REFERENCES Tasks(tid),
FOREIGN KEY (fname) REFERENCES Freelancers(fname),
FOREIGN KEY (cname) REFERENCES Customers(cname),
FOREIGN KEY (sname) REFERENCES Supervisors(sname)
);
