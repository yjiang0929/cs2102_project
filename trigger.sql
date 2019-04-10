--trigger

--1
create or replace function bid_same_time()
returns trigger as
$$
declare newdate varchar(20);
begin
	select tasks.tdate INTO newdate from tasks where tid=new.tid;
	if exists (
			select *
			from Tasks T natural join BidTasks B
			where (new.fname = B.fname)
						and (new.tid != T.tid)
						and (newdate = T.tdate)) then
		raise notice 'You cannot bid tasks on the same date!';
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
DECLARE spec NUMERIC;
BEGIN
	SELECT Specid INTO spec
	FROM Tasks
	WHERE NEW.tid = Tasks.tid;
	IF not exists (
			select *
			from FreelancerSpecs F
			where new.fname = F.fname and spec=F.specid
	) THEN
		raise notice 'You need to be have the specialization to bid for the task!';
		RETURN NULL;
	ELSE
		RETURN NEW;
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
		raise notice 'You can only review freelancers who have contracts with you!';
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
