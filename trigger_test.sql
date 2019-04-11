delete from Reviews;
delete from Contracts;
delete from Supervisors;
delete from BidTasks;
delete from FreelancerSpecs;
delete from Freelancers;
delete from ContactMethods;
delete from PaymentMethods;
delete from Tasks;
delete from Customers;
delete from Specializations;
delete from Locations;

insert into Locations (lid, city, country) values
(1, 'singapore','singapore'),
(2, 'boston','usa'),
(3, 'toronto','canada');

insert into Specializations (Specid, DifficultyLevel, Category) values --
(1, '5', 'Lifting'),
(2, '10', 'Cleaning'),
(3, '7', 'Cooking');

insert into Customers (cname, firstname, lastname, gender, password) values
('Yichen Jiang', 'Yichen', 'Jiang', 'M', '1111'),
('Luna Tao', 'Luna', 'Tao', 'F', '1111');

insert into Tasks (tid, description, tdate, lid, Specid, cname, address) values --
(01, 'Hard', '2019-09-01',1, 1, 'Yichen Jiang','Cinnamon College'),
(02, 'Easy', '2019-09-01',2, 1, 'Yichen Jiang','Tembusu College'),
(03, 'Intermediate', '2019-11-10',3, 2, 'Yichen Jiang','Residential College'),
(04, 'Super Hard', '2019-09-01', 1, 1, 'Luna Tao','Sheares Hall'),
(05, 'Easy', '2019-09-01', 2, 3, 'Luna Tao','Kent Ridge Hall'),
(06, 'Intermediate', '2018-12-19', 1, 2, 'Luna Tao','Ridge View College');

insert into PaymentMethods (cardnumber, expdate, currency, cname) values
('1111', '2020-02-02', 'SGD', 'Yichen Jiang'),
('2222', '2020-03-02', 'USD', 'Yichen Jiang'),
('3333', '2020-02-02', 'SGD', 'Luna Tao');

insert into ContactMethods (name, phonenumber, areacode) values
( 'Yichen Jiang', '1234567', '65'),
( 'Luna Tao', '7654321', '86');

insert into Freelancers (fname, firstname, lastname, Gender, password) values
('Licheng Sun', 'Licheng', 'Sun', 'M', '1111'),
('Haoyang Li', 'Haoyang', 'Li', 'M', '1111');

insert into FreelancerSpecs(fname, Specid) values
('Licheng Sun', 1),
('Haoyang Li', 2);

insert into BidTasks (fname, tid, bidPrice) values
('Licheng Sun', 01, 100),
('Licheng Sun', 02, 200), --test for trigger 1: When Freelancer bids for a Task, we need to make sure he has not bid for other Task that happens at the same time. 
('Haoyang Li', 04, 300); -- test for trigger 2: When Freelancer bids for a Task, we need to make sure that he has the Specialization required for the Task. 

insert into Supervisors (sname, firstname, lastname, gender, password) values
('Allan Chan', 'Allan', 'Chan', 'M', '1111'),
('Herman Tang', 'Herman', 'Tang', 'M', '1111');

insert into Contracts (Cid, Date, PayAmount, Tid, fname, cname, sname, address) values
(101, '2018-05-27', 500, 01, 'Licheng Sun', 'Yichen Jiang', 'Herman Tang','Cinnamon College'),
(102, '2018-02-03', 1000, 02, 'Licheng Sun', 'Yichen Jiang', 'Allan Chan','Tembusu College'),
(103, '2018-12-19', 200, 03, 'Haoyang Li', 'Yichen Jiang', null,'Residential College');

insert into Reviews (cname, fname, rating, review, rdate) values
('Yichen Jiang', 'Licheng Sun', 10, 'Pretty good!', '2019-12-31'),
('Luna Tao', 'Haoyang Li', 10, 'Pretty good!', '2019-12-31'); -- test for trigger 3: When Customer writes Review for Freelancer, we need to make sure Freelancer had a contract with Customer before.
