create database to_do_to_learn;

use to_do_to_learn;

create table if not exists usuarios (
	id varchar(36) not null,
    nome varchar(255) not null,
    email varchar(255) not null,
    primary key(id)
);

create table if not exists tasks (
	id varchar(36) not null,
    usuario_id varchar(36) not null,
    titulo varchar(255) not null,
    descricao text,
    status enum("to-do", "doing", "done") not null,
    primary key(id),
    foreign key (usuario_id) references usuarios(id)
);

insert into usuarios (id, nome, email)
values (
	uuid(),
    "João",
    "email_do_joão@gmail.com"
);

select * from usuarios;