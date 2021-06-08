-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2021-05-24 16:42:50.011

-- tables
-- Table: AutentimiseTyyp
CREATE TABLE AutentimiseTyyp (
    autentimise_tyyp_id int NOT NULL AUTO_INCREMENT,
    autentimise_tyyp varchar(100) NOT NULL,
    CONSTRAINT AutentimiseTyyp_pk PRIMARY KEY (autentimise_tyyp_id)
);

-- Table: AutentimiseTyyp_Kasutaja
CREATE TABLE AutentimiseTyyp_Kasutaja (
    autentimisetyyp_kasutaja_id int NOT NULL AUTO_INCREMENT,
    kasutaja_id int NOT NULL,
    autentimise_tyyp_id int NOT NULL,
    CONSTRAINT AutentimiseTyyp_Kasutaja_pk PRIMARY KEY (autentimisetyyp_kasutaja_id)
);

-- Table: IDAuth
CREATE TABLE IDAuth (
    IDAuth_id int NOT NULL AUTO_INCREMENT,
    kasutaja_id int NOT NULL,
    sertifikaat varchar(255) NOT NULL,
    CONSTRAINT IDAuth_pk PRIMARY KEY (IDAuth_id)
);

-- Table: Kasutaja
CREATE TABLE Kasutaja (
    kasutaja_id int NOT NULL AUTO_INCREMENT,
    kasutaja_nimi varchar(100) NOT NULL,
    CONSTRAINT Kasutaja_pk PRIMARY KEY (kasutaja_id)
);

-- Table: Kasutajaroll
CREATE TABLE Kasutajaroll (
    kasutajaroll_id int NOT NULL AUTO_INCREMENT,
    rolli_nimi varchar(100) NOT NULL,
    CONSTRAINT Kasutajaroll_pk PRIMARY KEY (kasutajaroll_id)
);

-- Table: Kysimus
CREATE TABLE Kysimus (
    kysimus_id int NOT NULL AUTO_INCREMENT,
    kysimus_tekst varchar(1000) NOT NULL,
    kysimusteplokk_id int NOT NULL,
    CONSTRAINT Kysimus_pk PRIMARY KEY (kysimus_id)
);

-- Table: KysimustePlokk
CREATE TABLE KysimustePlokk (
    kysimusteplokk_id int NOT NULL AUTO_INCREMENT,
    kysimusteplokk_nimi varchar(150) NOT NULL,
    kysimustik_id int NOT NULL,
    CONSTRAINT KysimustePlokk_pk PRIMARY KEY (kysimusteplokk_id)
);

-- Table: Kysimustik
CREATE TABLE Kysimustik (
    kysimustik_id int NOT NULL AUTO_INCREMENT,
    kysimustik_pealkiri varchar(255) NOT NULL,
    CONSTRAINT Kysimustik_pk PRIMARY KEY (kysimustik_id)
);

-- Table: Oppematerjal
CREATE TABLE Oppematerjal (
    oppmaterjal_id int NOT NULL AUTO_INCREMENT,
    oppematerjal_nimi varchar(100) NOT NULL,
    oppematerjal_failinimi varchar(250) NOT NULL,
    CONSTRAINT Oppematerjal_pk PRIMARY KEY (oppmaterjal_id)
);

-- Table: Oppematerjal_profiil
CREATE TABLE Oppematerjal_profiil (
    oppematerjal_profiil_id int NOT NULL AUTO_INCREMENT,
    profiil_id int NOT NULL,
    oppematerjal_id int NOT NULL,
    CONSTRAINT Oppematerjal_profiil_pk PRIMARY KEY (oppematerjal_profiil_id)
);

-- Table: ParooliAuth
CREATE TABLE ParooliAuth (
    ParooliAuth_id int NOT NULL AUTO_INCREMENT,
    kasutaja_id int NOT NULL,
    parool varchar(255) NOT NULL,
    CONSTRAINT ParooliAuth_pk PRIMARY KEY (ParooliAuth_id)
);

-- Table: Profiil
CREATE TABLE Profiil (
    profiil_id int NOT NULL AUTO_INCREMENT,
    eesnimi varchar(100) NOT NULL,
    perenimi varchar(100) NOT NULL,
    kasutaja_id int NOT NULL,
    kasutajaroll_id int NOT NULL,
    CONSTRAINT Profiil_pk PRIMARY KEY (profiil_id)
);

-- Table: Soovitus
CREATE TABLE Soovitus (
    soovitus_id int NOT NULL AUTO_INCREMENT,
    soovitus_tekst varchar(500) NOT NULL,
    kysimus_id int NULL,
    CONSTRAINT Soovitus_pk PRIMARY KEY (soovitus_id)
);

-- Table: Tagasiside
CREATE TABLE Tagasiside (
    tagasiside_id int NOT NULL AUTO_INCREMENT,
    tagasiside_tekst varchar(1000) NOT NULL,
    protsentuaalne_tulemus decimal(4,2) NOT NULL,
    profiil_id int NOT NULL,
    kysimusteplokk_id int NOT NULL,
    CONSTRAINT Tagasiside_pk PRIMARY KEY (tagasiside_id)
);

-- Table: eneseanalyys
CREATE TABLE eneseanalyys (
    eneseanalyys_id int NOT NULL AUTO_INCREMENT,
    eneseanalyys_tekst varchar(500) NOT NULL,
    CONSTRAINT eneseanalyys_pk PRIMARY KEY (eneseanalyys_id)
);

-- Table: kysimus_vastus
CREATE TABLE kysimus_vastus (
    kysimus_vastus_id int NOT NULL AUTO_INCREMENT,
    profiil_kysimustik_id int NOT NULL,
    kysimus_id int NOT NULL,
    vastus varchar(255) NOT NULL,
    eneseanalyys_eneseanalyys_id int NOT NULL,
    CONSTRAINT kysimus_vastus_pk PRIMARY KEY (kysimus_vastus_id)
);

-- Table: profiil_kysimustik
CREATE TABLE profiil_kysimustik (
    profiil_kysimustik_id int NOT NULL AUTO_INCREMENT,
    kysimustik_id int NOT NULL,
    profiil_id int NOT NULL,
    kysimustik_autom_tagasiside varchar(255) NOT NULL,
    kysimustik_protsentuaalne_tagasiside int NOT NULL,
    CONSTRAINT profiil_kysimustik_pk PRIMARY KEY (profiil_kysimustik_id)
);

-- foreign keys
-- Reference: AutentimiseTyyp_Kasutaja_AutentimiseTyyp (table: AutentimiseTyyp_Kasutaja)
ALTER TABLE AutentimiseTyyp_Kasutaja ADD CONSTRAINT AutentimiseTyyp_Kasutaja_AutentimiseTyyp FOREIGN KEY AutentimiseTyyp_Kasutaja_AutentimiseTyyp (autentimise_tyyp_id)
    REFERENCES AutentimiseTyyp (autentimise_tyyp_id);

-- Reference: AutentimiseTyyp_Kasutaja_Kasutaja (table: AutentimiseTyyp_Kasutaja)
ALTER TABLE AutentimiseTyyp_Kasutaja ADD CONSTRAINT AutentimiseTyyp_Kasutaja_Kasutaja FOREIGN KEY AutentimiseTyyp_Kasutaja_Kasutaja (kasutaja_id)
    REFERENCES Kasutaja (kasutaja_id);

-- Reference: IDAuth_Kasutaja (table: IDAuth)
ALTER TABLE IDAuth ADD CONSTRAINT IDAuth_Kasutaja FOREIGN KEY IDAuth_Kasutaja (kasutaja_id)
    REFERENCES Kasutaja (kasutaja_id);

-- Reference: Kysimus_KysimustePlokk (table: Kysimus)
ALTER TABLE Kysimus ADD CONSTRAINT Kysimus_KysimustePlokk FOREIGN KEY Kysimus_KysimustePlokk (kysimusteplokk_id)
    REFERENCES KysimustePlokk (kysimusteplokk_id);

-- Reference: KysimustePlokk_Kysimustik (table: KysimustePlokk)
ALTER TABLE KysimustePlokk ADD CONSTRAINT KysimustePlokk_Kysimustik FOREIGN KEY KysimustePlokk_Kysimustik (kysimustik_id)
    REFERENCES Kysimustik (kysimustik_id);

-- Reference: Oppematerjal_profiil_Oppematerjal (table: Oppematerjal_profiil)
ALTER TABLE Oppematerjal_profiil ADD CONSTRAINT Oppematerjal_profiil_Oppematerjal FOREIGN KEY Oppematerjal_profiil_Oppematerjal (oppematerjal_id)
    REFERENCES Oppematerjal (oppmaterjal_id);

-- Reference: Oppematerjal_profiil_Profiil (table: Oppematerjal_profiil)
ALTER TABLE Oppematerjal_profiil ADD CONSTRAINT Oppematerjal_profiil_Profiil FOREIGN KEY Oppematerjal_profiil_Profiil (profiil_id)
    REFERENCES Profiil (profiil_id);

-- Reference: ParooliAuth_Kasutaja (table: ParooliAuth)
ALTER TABLE ParooliAuth ADD CONSTRAINT ParooliAuth_Kasutaja FOREIGN KEY ParooliAuth_Kasutaja (kasutaja_id)
    REFERENCES Kasutaja (kasutaja_id);

-- Reference: Profiil_Kasutaja (table: Profiil)
ALTER TABLE Profiil ADD CONSTRAINT Profiil_Kasutaja FOREIGN KEY Profiil_Kasutaja (kasutaja_id)
    REFERENCES Kasutaja (kasutaja_id);

-- Reference: Profiil_Kasutajaroll (table: Profiil)
ALTER TABLE Profiil ADD CONSTRAINT Profiil_Kasutajaroll FOREIGN KEY Profiil_Kasutajaroll (kasutajaroll_id)
    REFERENCES Kasutajaroll (kasutajaroll_id);

-- Reference: Soovitus_Kysimus (table: Soovitus)
ALTER TABLE Soovitus ADD CONSTRAINT Soovitus_Kysimus FOREIGN KEY Soovitus_Kysimus (kysimus_id)
    REFERENCES Kysimus (kysimus_id);

-- Reference: Tagasiside_KysimustePlokk (table: Tagasiside)
ALTER TABLE Tagasiside ADD CONSTRAINT Tagasiside_KysimustePlokk FOREIGN KEY Tagasiside_KysimustePlokk (kysimusteplokk_id)
    REFERENCES KysimustePlokk (kysimusteplokk_id);

-- Reference: Tagasiside_Profiil (table: Tagasiside)
ALTER TABLE Tagasiside ADD CONSTRAINT Tagasiside_Profiil FOREIGN KEY Tagasiside_Profiil (profiil_id)
    REFERENCES Profiil (profiil_id);

-- Reference: kysimus_vastus_Kysimus (table: kysimus_vastus)
ALTER TABLE kysimus_vastus ADD CONSTRAINT kysimus_vastus_Kysimus FOREIGN KEY kysimus_vastus_Kysimus (kysimus_id)
    REFERENCES Kysimus (kysimus_id);

-- Reference: kysimus_vastus_eneseanalyys (table: kysimus_vastus)
ALTER TABLE kysimus_vastus ADD CONSTRAINT kysimus_vastus_eneseanalyys FOREIGN KEY kysimus_vastus_eneseanalyys (eneseanalyys_eneseanalyys_id)
    REFERENCES eneseanalyys (eneseanalyys_id);

-- Reference: kysimus_vastus_profiil_kysimustik (table: kysimus_vastus)
ALTER TABLE kysimus_vastus ADD CONSTRAINT kysimus_vastus_profiil_kysimustik FOREIGN KEY kysimus_vastus_profiil_kysimustik (profiil_kysimustik_id)
    REFERENCES profiil_kysimustik (profiil_kysimustik_id);

-- Reference: profiil_kysimustik_Kysimustik (table: profiil_kysimustik)
ALTER TABLE profiil_kysimustik ADD CONSTRAINT profiil_kysimustik_Kysimustik FOREIGN KEY profiil_kysimustik_Kysimustik (kysimustik_id)
    REFERENCES Kysimustik (kysimustik_id);

-- Reference: profiil_kysimustik_Profiil (table: profiil_kysimustik)
ALTER TABLE profiil_kysimustik ADD CONSTRAINT profiil_kysimustik_Profiil FOREIGN KEY profiil_kysimustik_Profiil (profiil_id)
    REFERENCES Profiil (profiil_id);

-- End of file.

