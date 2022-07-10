CREATE DEFINER=`root`@`localhost` PROCEDURE `metricsRepos`(
in _id int
)
BEGIN
	select 
		re.id_repository,
		re.name as repo,
		tr.name as tribe,
		org.name as organization,
		me.coverage,
		me.code_smells,
		me.bugs,
		me.vulnerabilities,
		re.state,
		re.status
		from repository re
		inner join tribe tr
		on re.id_tribe=  tr.id_tribe
		inner join organization org
		on tr.id_organization = org.id_organization
		inner join metrics me
		on re.id_repository = me.id_repository
		where re.id_repository = _id;
END