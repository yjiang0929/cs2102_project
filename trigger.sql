--trigger

--1
create or replace function bid_same_time()
returns trigger as
$$
declare count1 numeric;
begin
	select count(*) into count1
	from Tasks T1, Tasks T2, BidTasks
	where New.fname = BidTasks.fname and New.Tid = T1.tid and BidTasks.tid = T2.tid and T1.tdate = T2.tdate;
	if count1 > 0. then
		raise notice 'Trigger 1 violated!';
		return NULL;
	else 
		return NEW;
	end if;
end;
$$
language plpgsql;

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
DECLARE count2 NUMERIC;
DECLARE count3 NUMERIC;
BEGIN
	SELECT Specid INTO count2
	FROM Tasks
	WHERE NEW.Tid = Tasks.Tid;
	SELECT Specid INTO count3
	FROM Freelancers 
	WHERE NEW.fname = Freelancers.fname;
	IF count2 == count3 THEN
		raise notice 'Trigger 2 violated!';
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
declare count4 numeric;
begin
	select count(*) into count4
	from Contracts
	where NEW.fname = Contracts.fname
	and NEW.cname = Contracts.cname;
	if count4 = 0 then
		raise notice 'Trigger 3 violated!';
		return NULL;
	else
		return NEW;
	end if;
end;
$$
language plpgsql;

create trigger employment_relationship
before insert or update
on Reviews
for each row
execute procedure employment_relationship();