-- MySQL Script generated by MySQL Workbench
-- Mon Jan 15 17:46:56 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema gestion_alumnosdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gestion_alumnosdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gestion_alumnosdb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema new_schema1
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bdconsultorio1
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bdconsultorio1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bdconsultorio1` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `gestion_alumnosdb` ;

-- -----------------------------------------------------
-- Table `gestion_alumnosdb`.`tabla_alumno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestion_alumnosdb`.`tabla_alumno` (
  `id_alumno` INT NOT NULL,
  `codigo` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `rol` VARCHAR(45) NOT NULL,
  `nota1` INT NOT NULL,
  `nota2` INT NOT NULL,
  `nota3` INT NOT NULL,
  PRIMARY KEY (`id_alumno`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gestion_alumnosdb`.`tabla_profesor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestion_alumnosdb`.`tabla_profesor` (
  `idprofesor` INT NOT NULL,
  `DNI` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idprofesor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gestion_alumnosdb`.`tabla_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestion_alumnosdb`.`tabla_usuarios` (
  `id_usuarios` INT NOT NULL,
  `usuario` VARCHAR(45) NOT NULL,
  `contraseña` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuarios`))
ENGINE = InnoDB;

USE `bdconsultorio1` ;

-- -----------------------------------------------------
-- Table `bdconsultorio1`.`tabla_citas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdconsultorio1`.`tabla_citas` (
  `cm_idcita` INT NULL DEFAULT NULL,
  `cm_idpaciente` INT NULL DEFAULT NULL,
  `cm_idfecha` DATE NULL DEFAULT NULL,
  `cm_fechahora` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `cm_servicio` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `cm_analisispac` VARCHAR(100) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `cm_idunidadmedica` INT NULL DEFAULT NULL,
  `cm_idrecetas` INT NULL DEFAULT NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bdconsultorio1`.`tabla_pacientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdconsultorio1`.`tabla_pacientes` (
  `id_paciente` INT NOT NULL,
  `pac_nombres` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `pac_apellidopaterno` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `pac_apellidomaterno` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `pac_edad` INT NULL DEFAULT NULL,
  `pac_sexo` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `pac_dni` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `pac_lugar` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `pac_direccion` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `pac_numcasa` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `pac_calle` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `pac_fechanac` DATE NULL DEFAULT NULL,
  `pac_idunidadmedica` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_paciente`),
  UNIQUE INDEX `id_paciente_UNIQUE` (`id_paciente` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bdconsultorio1`.`tabla_recetas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdconsultorio1`.`tabla_recetas` (
  `rec_idreceta` INT NOT NULL,
  `rec_idpaciente` INT NULL DEFAULT NULL,
  `rec_idunidadmedica` INT NULL DEFAULT NULL,
  `rec_descripcion` VARCHAR(10000) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `rec_alergias` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `rec_estatura` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `rec_peso` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `rec_presion` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `rec_tiposangre` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `rec_idcita` INT NULL DEFAULT NULL,
  PRIMARY KEY (`rec_idreceta`),
  UNIQUE INDEX `rec_idreceta_UNIQUE` (`rec_idreceta` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bdconsultorio1`.`tabla_unidadmedica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdconsultorio1`.`tabla_unidadmedica` (
  `id_unidadmedica` INT NOT NULL,
  `um_paciente` INT NULL DEFAULT NULL,
  `um_folio` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `um_medico` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `um_consultorio` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  PRIMARY KEY (`id_unidadmedica`),
  UNIQUE INDEX `id_unidadmedica_UNIQUE` (`id_unidadmedica` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bdconsultorio1`.`tabla_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdconsultorio1`.`tabla_usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `password` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
