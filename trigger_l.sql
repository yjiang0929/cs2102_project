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











