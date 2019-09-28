--Create Employee table
CREATE TABLE employee (
	emp_no NOT NULL,
	birth_date DATE,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	gender VARCHAR(30),
	hire_date DATE,
	PRIMARY KEY (emp_no)
	)

--Create Department Table
CREATE TABLE department (
	dept_no VARCHAR(30) NOT NULL,
	dept_name VARCHAR(225),
	PRIMARY KEY (dept_no)
	)

--Create DepartmentXEmployee Table
CREATE TABLE dept_emp (
	emp_no INT,
	dept_no VARCHAR(30),
	from_date DATE,
	to_date DATE,
	FOREIGN KEY (emp_no) REFERENCES employee(emp_no),
	FOREIGN KEY (dept_no) REFERENCES department(dept_no)
	)	

--Create DepartmentXManager Table
CREATE TABLE dept_manager (
	dept_no VARCHAR(30),
	emp_no INT,
	from_date DATE,
	to_date DATE,
	FOREIGN KEY (dept_no) REFERENCES department(dept_no),
	FOREIGN KEY (emp_no) REFERENCES employee(emp_no)
	)	

--Create Title Table
CREATE TABLE title (
	emp_no INT,
	title VARCHAR(30),
	from_date DATE,
	to_date DATE,
	FOREIGN KEY (emp_no) REFERENCES employee(emp_no)
	)	

--Create Salary Table
CREATE TABLE salary (
	emp_no INT,
	salary INT,
	from_date DATE,
	to_date DATE,
	FOREIGN KEY (emp_no) REFERENCES employee(emp_no)
	)