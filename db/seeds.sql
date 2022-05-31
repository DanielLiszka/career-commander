INSERT INTO company (name)
VALUES ('Amazon'), ('Meta'), ('Google'), ('Apple');

INSERT INTO position (name, description, location, close_date, company_id)
VALUES ('Sales Person', 80000, 1), ('Lead Engineer', 150000, 2), ('Software Engineer', 120000, 2), ('Account Manager', 160000, 3),
 ('Accountant', 125000, 3), ('Legal Team Lead', 250000, 4), ('Lawyer', 190000, 4), ("Sales Team Lead", 120000, 1);

INSERT INTO user (first_name, last_name, email, password) 
VALUES ('John', 'Doe', 8, null), ('Mike', 'Chan', 1, null), ('Ashley', 'Rodriquez', 2, null), ('Kevin', 'Tupik', 3, 3);

INSERT INTO manager (first_name, last_name, email, phone, company_id)
VALUES (),(),(),(),(),();

INSERT INTO resume (name, description, user_id)
VALUES (),(),(),(),(),();

INSERT INTO applicaton (offer, accepted, interview1_date, interview2_date, interview3_date, interview4_date, position_id, resume_id, user_id)
VALUES (),(),(),(),(),();