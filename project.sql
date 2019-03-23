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
	Specid			INTEGER,
	PRIMARY KEY (tid),
	FOREIGN KEY (Specid) REFERENCES Specializations(Specid),
	FOREIGN KEY (lid) REFERENCES Locations(lid)
);


create table Contracts(
Cid 		integer,
Date 		date,
PayAmount 	integer,
Tid 		integer,
fname 		varchar(60),
cname 		varchar(60),
PRIMARY KEY Cid,
FOREIGN KEY tid REFERENCES Tasks(tid),
FOREIGN KEY fname REFERENCES Freelancers(fname),
FOREIGN KEY cname REFERENCES Customers(cname)
);

CREATE TABLE Customers (
  cname 			VARCHAR(60),
  firstname 		VARCHAR(30),
  lastname 			VARCHAR(30),
  gender 			VARCHAR(10),
  PRIMARY KEY (cname)
);


CREATE TABLE Specializations (
Specid 				integer,	 
DifficultyLevel 	varchar(10),
Category 			varchar(60),
Tid 				integer,		 
PRIMARY KEY (Specid),
FOREIGN KEY (Tid) REFERENCES Tasks(tid)
);

CREATE TABLE PaymentMethods (
  cord 				VARCHAR(10),
  cardnumber 		VARCHAR(16),
  expdate 			DATE, 
  cname 			VARCHAR(60),
  FOREIGN KEY (cname) REFERENCES Customers(cname),
  PRIMARY KEY (cname, cardnumber)
);

CREATE TABLE ContactMethods (
  phonenumber 		VARCHAR(20),
  areacode 			VARCHAR(5),
  PRIMARY KEY (phonenumber, areacode)
);

CREATE TABLE Freelancers (
fname		varchar(60),
Name 		varchar(60), 
Gender		varchar(10),
PhoneNumber	VARCHAR(20),
AreaCode 	VARCHAR(5), 
-- same as tid, doesnt make sense
--Cid 		integer,
-- will create another table to resolve this, it doesnt make sense to link each freelancer to only one task
--Tid 		integer,
Specid 		integer,
PRIMARY KEY (fname),
FOREIGN KEY (PhoneNumber, areacode) REFERENCES ContactMethods(phonenumber,areacode),
-- mentioned above
--FOREIGN KEY (Cid) REFERENCES Contracts(Cid),
-- deleted because another table BidTasks will resolve this
--FOREIGN KEY (Tid) REFERENCES Tasks(tid),
FOREIGN KEY (Specid) REFERENCES Specializations(Specid)
);


CREATE TABLE BidTasks (
fname 		varchar(60),
tid 		integer,
FOREIGN KEY (tid) REFERENCES Tasks(tid),
FOREIGN KEY (fname) REFERENCES Freelancers(fname)
);

create table Reviews (
cname 				varchar(100) references Customers(cname),
fname 				varchar(100) references Freelancers(fname),
rating 				varchar(100),
Date 				date,
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


-- When Freelancer bids for a task, we need to make sure that he has the specialization required for the task
CREATE OR REPLACE FUNCTION check_spec()
RETURNS TRIGGER AS 
$$
DECLARE count NUMERIC;
BEGIN
	SELECT Specid INTO count1
	FROM Tasks
	WHERE NEW.tid = Tasks.Tid
	SELECT Specid INTO count2
	FROM Freelancers 
	WHERE NEW.fname = Freelancers.fname;
	IF count1 == count2 THEN
		RETURN NEW;
	ELSE 
		RETURN NULL;
	END IF;
END;

$$ 
LANGUAGE plpgsql;

CREATE TRIGGER spec_check
BEFORE INSERT OR UPDATE
ON Bidtasks					-- Specialization
FOR EACH ROW 
EXECUTE PROCEDURE check_spec();	

