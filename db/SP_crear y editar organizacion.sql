CREATE DEFINER=`root`@`localhost` PROCEDURE `createEditOrganization`(
	in _id int,
    in _name varchar(50),
    in _status int
)
begin
	if _id = 0 then
		insert into organization(name, status)
		values (_name, _status);
        
		set _id = last_insert_id();
	else
		update organization
        set
			name = _name,
            status = _status
            where id_organization = _id;
    end if;
    select _id as id_organization;
end