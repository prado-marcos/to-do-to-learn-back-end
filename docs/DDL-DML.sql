create database to_do_to_learn;

use to_do_to_learn;

create table if not exists usuarios (
	usuario_id int not null auto_increment,
    nome varchar(255) not null,
    email varchar(255) not null,
    primary key(usuario_id)
);

create table if not exists tasks (
	task_id int not null auto_increment,
	usuario_id int not null,
    titulo varchar(255) not null,
    descricao text,
    status enum("to-do", "doing", "done") not null,
    primary key(task_id),
    foreign key (usuario_id) references usuarios(usuario_id)
);

insert into usuarios (nome, email)
values (
    "João",
    "email_do_joão@gmail.com"
);

select * from usuarios;