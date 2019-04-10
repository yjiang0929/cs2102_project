delete from Locations;
delete from Tasks;
delete from Contracts;
delete from Customers;
delete from Specializations;
delete from PaymentMethods;
delete from ContactMethods;
delete from Freelancers;
delete from Reviews;
delete from Supervisors;
delete from BidTasks;

insert into Locations (lid, lname) values
(1, 'A'),
(2, 'B'),
(3, 'C');

insert into Specializations (Specid, DifficultyLevel, Category, Tid) values 
(1, 'A', 'Lifting', 02),
(2, 'A', 'Cleaning', 03),
(3, 'B', 'Cooking', 04);

insert into Customers (cname, firstname, lastname, gender, password) values
('Jiang Yichen', 'Yichen', 'Jiang', 'M', '111111'),
('Luna Tao', 'Luna', 'Tao', 'F', '222222');

insert into Tasks (tid, description, tdate, lid, Specid, cname) values
(01, 'Hard', '2019-09-01',1, 1, 'Jiang Yichen'),
(02, 'Easy', '2019-09-01',2, 1, 'Jiang Yichen'),
(03, 'Intermediate', '2019-11-10',3, 2, 'Jiang Yichen'),
(04, 'Super Hard', '2019-09-01', 1, 1, 'Luna Tao'),
(05, 'Easy', '2019-09-01', 2, 3, 'Luna Tao'),
(06, 'Intermediate', '2018-12-19', 1, 2, 'Luna Tao');

insert into PaymentMethods (cardnumber, expdate, currency, cname) values
('1111', '2020-02-02', 'SGD', 'Jiang Yichen'),
('2222', '2020-03-02', 'USD', 'Jiang Yichen'),
('3333', '2020-02-02', 'SGD', 'Luna Tao');

insert into ContactMethods (name, phonenumber, areacode) values
( 'Jiang Yichen', '1234567', '11111'),
( 'Luna Tao', '7654321', '22222');

insert into Freelancers (fname, firstname, lastname, Gender, password, Specid) values
('Licheng Sun', 'Licheng', 'Sun', 'M', '111111', 1),
('Haoyang Li', 'Haoyang', 'Li', 'M', '222222', 2);

insert into BidTasks (fname, tid, bidPrice) values
('Licheng Sun', 01, 100),
('Licheng Sun', 02, 200), --test for trigger 1: When Freelancer bids for a Task, we need to make sure he has not bid for other Task that happens at the same time. 
('Haoyang Li', 04, 300); -- test for trigger 2: When Freelancer bids for a Task, we need to make sure that he has the Specialization required for the Task. 

insert into Supervisors (sname, firstname, lastname, gender, password) values
('Allan Chan', 'Allan', 'Chan', 'M', '111111'),
('Herman Tang', 'Herman', 'Tang', 'M', '222222');

insert into Contracts (Cid, Date, PayAmount, Tid, fname, cname, sname) values
(101, '2018-05-27', 500, 01, 'Licheng Sun', 'Jiang Yichen', 'Herman Tang'),
(102, '2018-02-03', 1000, 02, 'Licheng Sun', 'Jiang Yichen', 'Allan Chan'),
(103, '2018-12-19', 200, 03, 'Haoyang Li', 'Jiang Yichen', 'Herman Tang');

insert into Reviews (cname, fname, rating, review, rdate) values
('Jiang Yichen', 'Licheng Sun', 10, 'Pretty good!', '2019-12-31'),
('Luna Tao', 'Haoyang Li', 10, 'Pretty good!', '2019-12-31'); -- test for trigger 3: When Customer writes Review for Freelancer, we need to make sure Freelancer had a contract with Customer before.
