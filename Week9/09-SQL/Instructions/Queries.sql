--List the following details of each employee: employee number, last name, first name, gender, and salary.
SELECT
    emp.emp_no,
    emp.last_name,
    emp.first_name,
    emp.gender,
    salary

FROM employee emp

    JOIN salary s ON emp.emp_no = s.emp_no

--List employees who were hired in 1986.
SELECT
    emp.emp_no,
    last_name,
    first_name,
    hire_date

FROM employee emp
WHERE EXTRACT(YEAR FROM hire_date) = 1986

--List the manager of each department with the following information: department number, department name, the manager's employee number, last name, first name, and start and end employment dates.
SELECT
    d.dept_no,
    d.dept_name,
    emp.emp_no,
    last_name,
    first_name,
    d_m.from_date,
    d_m.to_date

FROM employee emp


    JOIN dept_manager d_m ON emp.emp_no = d_m.emp_no
    JOIN department d ON d_m.dept_no = d.dept_no

--List the department of each employee with the following information: employee number, last name, first name, and department name.
SELECT
    d.dept_no,
    d.dept_name,
    emp.emp_no,
    last_name,
    first_name,
    d_m.from_date,
    d_m.to_date, 

FROM employee emp

    JOIN dept_manager d_m ON emp.emp_no = d_m.emp_no
    JOIN department d ON d_m.dept_no = d.dept_no

--List all employees whose first name is "Hercules" and last names begin with "B."
SELECT
    emp.emp_no,
    last_name,
    first_name,
    title

FROM employee emp

    JOIN title ti ON ti.emp_no = emp.emp_no

WHERE first_name = 'Hercules'
    AND last_name like 'B%'

--List all employees in the Sales department, including their employee number, last name, first name, and department name.
SELECT
    emp.emp_no,
    last_name,
    first_name,
    title,
    dept_name

FROM employee emp

    JOIN dept_emp d_e ON emp.emp_no = d_e.emp_no
    JOIN department d ON d_e.dept_no = d.dept_no
    JOIN title ti ON ti.emp_no = emp.emp_no

WHERE dept_name = 'Sales'

--List all employees in the Sales and Development departments, including their employee number, last name, first name, and department name.
SELECT
    emp.emp_no,
    last_name,
    first_name,
    title,
    dept_name

FROM employee emp

    JOIN dept_emp d_e ON emp.emp_no = d_e.emp_no
    JOIN department d ON d_e.dept_no = d.dept_no
    JOIN title ti ON ti.emp_no = emp.emp_no

WHERE dept_name IN ('Sales', 'Development')

--In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.
SELECT
    last_name,
    count(first_name) employee_count

FROM employee emp

GROUP BY last_name
ORDER BY employee_count DESC
