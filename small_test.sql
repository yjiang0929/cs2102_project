insert into customers values ('man','dude','guy','male','1111');
insert into locations values (1,'singapore', 'singapore');
insert into specializations values (1, '1','Weight Lifting');
insert into tasks values (1,'this task','20190402',1,1,'man');
insert into tasks values (2,'next task','20190403',1,1,'man');

insert into ContactMethods values ('man','1234567','65');
insert into PaymentMethods values ('1234567887654321','201908','SGD','man');

insert into freelancers values ('lancer','jane','doe','female','1111',1);
insert into freelancers values ('pichu','john','doe','male','1111',1);

insert into bidtasks values ('lancer',1,1000);
insert into bidtasks values ('pichu',1,100);
insert into bidtasks values ('pichu',2,100);

insert into reviews values ('man','lancer',5,'good','20190404');

insert into contracts values (1,'20190405',100,1,'lancer','man');

insert into supervisors values ('super','first','last','female','1111');
