create database if  not exists stivenRodriguez_repos;
use stivenRodriguez_repos;

create table organization(
	id_organization int not null auto_increment,
	name char(50) not null,
    status int not null,
    primary key(id_organization)
);

create table tribe(
	id_tribe int not null auto_increment,
    id_organization int not null,
    name char(50) not null,
    status int not null,
    primary key(id_tribe),
    foreign key (id_organization) references organization(id_organization)
);

create table repository(
	id_repository int not null auto_increment,
    id_tribe int not null,
    name char(50) not null,
    state char(20) not null,
    create_time timestamp not null,
    status char(1) not null,
    primary key(id_repository),
    foreign key (id_tribe) references tribe(id_tribe)
);

create table metrics(
	id_repository int not null,
    coverage double not null,
    bugs int not null,
    vulnerabilities int not null,
    hospot int not null,
    code_smells int not null,
    primary key (id_repository),
    foreign key (id_repository) references repository(id_repository)
);

insert into metrics values
('1', '80', '0', '0', '0', '0'),
('2', '50', '0', '1', '0', '0'),
('3', '90', '0', '2', '0', '0');

insert into organization values 
(1,'Banco Pichincha', 1),
(2,'Neoris', 1),
(3,'Banco de la republica', 0);

insert into tribe values
(1,1,'sistemas',1),
(2,1,'rrhh',1),
(3,1,'gerencia',1),
(4,2,'sistemas',1),
(5,2,'rrhh',1),
(6,2,'gerencia',1);

insert into repository values
(1,1,'repo1','604',sysdate(),'A'),
(2,1,'repo2','605',sysdate(),'A'),
(3,1,'repo3','606',sysdate(),'A');



