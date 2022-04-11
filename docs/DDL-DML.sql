create database toDoToLearn;

use toDoToLearn;

create table if not exists person (
	id int not null auto_increment,
    personName varchar(255) not null,
    email varchar(255) not null unique,
    primary key(id)
);

create table if not exists task (
	id int not null auto_increment,
	personId int not null,
    title varchar(255) not null,
    description text,
    taskStatus enum("to-do", "doing", "done") not null,
    primary key(id),
    foreign key (personId) references person(id)
);