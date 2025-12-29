-- torneos
INSERT INTO torneo (id, anio, tipo) VALUES(1, 2025, 'Apertura');
INSERT INTO torneo (id, anio, tipo) VALUES(2, 2025, 'Clausura');
INSERT INTO torneo (id, anio, tipo) VALUES(3, 2024, 'Apertura');
INSERT INTO torneo (id, anio, tipo) VALUES(4, 2024, 'Clausura');
INSERT INTO torneo (id, anio, tipo) VALUES(5, 2023, 'Apertura');
INSERT INTO torneo (id, anio, tipo) VALUES(6, 2023, 'Clausura');

-- rivales
INSERT INTO rival (id, nombre) VALUES(1, 'LA RUSSONETA');
INSERT INTO rival (id, nombre) VALUES(2, 'ITALIANO F.C.');
INSERT INTO rival (id, nombre) VALUES(3, 'THE CHINCHE SOCCER'); 
INSERT INTO rival (id, nombre) VALUES(4, 'OLD BARRIL');
INSERT INTO rival (id, nombre) VALUES(5, 'C.A. DECADENTE');
INSERT INTO rival (id, nombre) VALUES(6, 'LOST F.C.');
INSERT INTO rival (id, nombre) VALUES(7, 'URUGUAY');
INSERT INTO rival (id, nombre) VALUES(8, 'CELTIC ROSARIO F.C.');
INSERT INTO rival (id, nombre) VALUES(9, 'LOMBARDIA');
INSERT INTO rival (id, nombre) VALUES(10, 'REMPALAGO F.C.');
INSERT INTO rival (id, nombre) VALUES(11, 'COMPLEJO KILLER F.C.');
INSERT INTO rival (id, nombre) VALUES(12, 'NATALIA NATALIA');
INSERT INTO rival (id, nombre) VALUES(13, 'C.A. BELGRANO +30');
INSERT INTO rival (id, nombre) VALUES(14, 'SUDAMERICANO');
INSERT INTO rival (id, nombre) VALUES(15, 'CREAMY HELADOS');
INSERT INTO rival (id, nombre) VALUES(16, 'CASABAR');
INSERT INTO rival (id, nombre) VALUES(17, 'LA CELESTE F.C.');

-- jugadores
INSERT INTO jugador VALUES (1,'paulo','castañeira','2025-05-01','Defensor','Mediocampista', 14,'/uploads/paulo.jpg');
INSERT INTO jugador VALUES (3,'Nicolas','Alesso','1998-07-30','Defensor','Mediocampista',7,'/uploads/nicolas_alesso.jpg');
INSERT INTO jugador VALUES (4 ,'Nicolas','Alegre','1986-03-11','Delantero','Mediocampista', 23,'/uploads/nicolas_alegre.jpg');
INSERT INTO jugador VALUES (5 ,'Ezequiel','Ardiles','1990-06-20','Defensor','Mediocampista', 19,'/uploads/ezequiel_ardiles.jpg');
INSERT INTO jugador VALUES (6 ,'Juan Manuel','Doin','1983-12-02','Mediocampista','Defensor',7,'/uploads/juan_doin.jpg');
INSERT INTO jugador VALUES (7 ,'Mariano','Fabre','1990-03-01','Defensor','Mediocampista', 17,'/uploads/mariano_fabre.jpg');
INSERT INTO jugador VALUES (8 ,'Santiago','Ghione','1997-06-07','Mediocampista','Delantero', 10,'/uploads/santiago_ghione.jpg');
INSERT INTO jugador VALUES (9 ,'Juan Martín','González','1982-02-08','Delantero','Mediocampista',8,'/uploads/juan_gonzalez.jpg');
INSERT INTO jugador VALUES (10,'Guillermo','Goñi','1988-06-07', 'Mediocampista','Delantero', 10,'/uploads/guille_goni.jpg');
INSERT INTO jugador VALUES (11,'Nehuen Ignacio','Lopez', '1998-09-23', 'Mediocampista','Delantero', 11,'/uploads/nuhuen_lopez.jpg');
INSERT INTO jugador VALUES (12,'Jorge','López','1980-08-13','Defensor','Mediocampista',3,'/uploads/jorge_lopez.jpg');
INSERT INTO jugador VALUES (13,'Tomas','Merlo','1991-05-18','Defensor','Mediocampista',4,'/uploads/tomas_merlo.jpg');
INSERT INTO jugador VALUES (14,'Juan','Molfino','1982-05-20','Arquero','Defensor',1 ,'/uploads/juan_molfino.jpg');
INSERT INTO jugador VALUES (15,'Nicolás','Nagel','1984-05-08','Mediocampista','Defensor',5,'/uploads/nicolas_nagel.jpg');
INSERT INTO jugador VALUES (16,'Alfredo','Renghini','1981-05-12','Defensor','Delantero',6,'/uploads/alfredo_renghini.jpg');
INSERT INTO jugador VALUES (17,'Sebastián','Ronco','1980-12-25','Delantero','Mediocampista',25,'/uploads/sebastian_ronco.jpg');
INSERT INTO jugador VALUES (18,'Francisco','Marrone','1996-07-03','Defensor','Delantero', 32,'/uploads/francisco_marrobe.jpg');

-- primer partido
INSERT INTO partido VALUES ( 1,'2025-05-10',2,0,1,14);
INSERT INTO partido VALUES ( 2,'2025-03-15',1,3,1,1);
INSERT INTO partido VALUES ( 3,'2025-03-22',1,1,1,12);
INSERT INTO partido VALUES ( 4,'2025-04-05',2,0,1,17);
INSERT INTO partido VALUES ( 5,'2025-04-12',2,2,1,15);
INSERT INTO partido VALUES ( 6,'2025-04-26',1,1,1,5);
INSERT INTO partido VALUES ( 7,'2025-05-17',0,0,1,11);
INSERT INTO partido VALUES ( 8,'2025-05-24',0,4,1,13);
INSERT INTO partido VALUES ( 9,'2025-05-31',0,2,1,4);
INSERT INTO partido VALUES (10,'2025-06-07',3,3,1,6);
INSERT INTO partido VALUES (11,'2025-07-05',3,3,1,16);
INSERT INTO partido VALUES (12,'2025-06-28',1,3,1,10);
INSERT INTO partido VALUES (13,'2025-07-19',0,0,1,7);
