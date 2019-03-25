--trigger

--1
create or replace function bid_same_time()
returns trigger as
$$
declare count numeric
begin
	select count(*) into count
	from Tasks
	where New.tdate = Tasks.tdate;
	if count > 0. then
		return NULL;
	else 
		return NEW;
	end if;
end;
$$
language plpgsql

create trigger bid_same_time
before insert or update
on BidTasks
for each row
execute procedure bid_same_time();

-- 2
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



--3
create or replace function employment_relationship()
returns trigger as
$$
declare count numeric
begin
	select count(*) into count
	from Contracts
	where NEW.fname = Contracts.fname
	and NEW.cname = Contracts.cname;
	if count = 0 then
		return NULL;
	else
		return NEW;
	end if;
end;
$$
language plpgsql

create trigger employment_relationship
before insert or update
on Reviews
for each row
execute procedure employment_relationship();











