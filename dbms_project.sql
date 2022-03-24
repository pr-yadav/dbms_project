USE health;
SELECT * FROM `admin`;
CREATE TABLE student(
	studentID INT,
    `password` VARCHAR(256),
    `name` VARCHAR(50),
    mobile INT,
    address VARCHAR(100),
    PRIMARY KEY (studentID)
);
CREATE TABLE doctor(
	doctorID INT,
    `password` VARCHAR(256),
    `name` VARCHAR(50),
    mobile INT,
    department VARCHAR(30),
    PRIMARY KEY (doctorID)
);
CREATE TABLE prescription(
	prescriptionID INT NOT NULL AUTO_INCREMENT,
    studentID INT NOT NULL,
    doctorID INT NOT NULL,
    `time` DATETIME DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (prescriptionID),
    FOREIGN KEY(studentID) REFERENCES student(studentID),
    FOREIGN KEY(doctorID) REFERENCES doctor(doctorID)
);
CREATE TABLE medicine(
	medicineID INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50),
    manufacturer VARCHAR(50),
    PRIMARY KEY (medicineID)
);
CREATE TABLE test(
	testID INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50),
    PRIMARY KEY (testID)
);
CREATE TABLE prescription_desc(
	prescriptionID INT NOT NULL,
    medicineID INT,
    dose INT,
    FOREIGN KEY(medicineID) REFERENCES medicine(medicineID),
    FOREIGN KEY(prescriptionID) REFERENCES prescription(prescriptionID)
);
CREATE TABLE investigation(
	prescriptionID INT NOT NULL,
    testID INT,
    result VARCHAR(100),
    FOREIGN KEY(testID) REFERENCES test(testID),
    FOREIGN KEY(prescriptionID) REFERENCES prescription(prescriptionID)
);
CREATE TABLE pharmacy(
	medicineID INT NOT NULL,
    availability INT,
    FOREIGN KEY(medicineID) REFERENCES medicine(medicineID)
);
CREATE TABLE `admin`(
	username VARCHAR(10),
    `password` VARCHAR(256)
);
CREATE TABLE staff(
	staffID INT,
    `password` VARCHAR(256),
    `name` VARCHAR(50),
    mobile INT,
    department VARCHAR(30),
    PRIMARY KEY (staffID)
);
ALTER TABLE health.staff ADD COLUMN address VARCHAR(50);
-- password tmppass
INSERT INTO `admin` VALUES('tmpuser','$2b$04$s.H/UCeCu8/.h5m/Q4ynqO0PPeiY3Fjip6X..haN5iibGJdImwcJG') 