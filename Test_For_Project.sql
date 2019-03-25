insert into Locations (lid, lname) values
(1, 'A'),
(2, 'B'),
(3, 'C');

insert into Tasks (tid, description, tdate, lid) values
(01, 'Hard', 2019-09-01,1),
(02, 'Easy', 2019-08-02,2),
(03, 'Intermediate', 2019-11-10,3),
(04, 'Super Hard', 2019-09-01, 1),
(05, 'Easy', 2019-09-01, 2),
(06, 'Intermediate', 2018-12-19, 1);

insert into Contracts (Cid, Date, PayAmount, Tid) values
(101, 2018-05-27, 500, 01),
(102, 2018-02-03, 1000, 02),
(103, 2018-12-19, 200, 03);

insert into Customers (cname, firstname, lastname, gender) values
('Jiang Yichen', 'Yichen', 'Jiang', 'M'),
('Luna Tao', 'Luna', 'Tao', 'F');

insert into Specializations (Specid, DifficultyLevel, Category, Tid) values 
(1, 'A', 'Lifting', 02),
(2, 'A', 'Cleaning', 03),
(3, 'B', 'Cooking', 04);

insert into PaymentMethods (cord, cardnumber, expdate, cname) values
('Credit', '1111', 2020-02-02, 'Jiang Yichen'),
('Debit', '2222', 2020-03-02, 'Jiang Yichen'),
('Debit', '3333', 2020-02-02, 'Luna Tao');

insert into ContactMethods (phonenumber, areacode) values
('1234567', '11111'),
('7654321', '22222');

insert into Freelancers (fname, Name, Gender, PhonNumber, AreaCode, Cid, Tid, Specid) values
('No.1', 'Licheng Sun', 'M', '1234567', '11111', 102, 02, 1),
('No.2', 'Haoyang Li', 'M', '7654321', '22222', 103, 03, 2);

insert into Reviews (cname, fname, rating, Date) values
('Jiang Yichen', 'No.1', 'A', 2019-12-31),
('Luna Tao', 'No.2', 'B', 2019-12-31);

insert into Supervisors (sid, sname, sgender, tid) values
(1, 'Chan', 'M', 02),
(2, 'Adi', 'M', 03);
