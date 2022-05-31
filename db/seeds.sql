INSERT INTO company (name)
VALUES ('Amazon'), ('Meta'), ('Google'), ('Apple');

INSERT INTO user (first_name, last_name, email, password) 
VALUES ('John', 'Doe', 'jdoe@gmail.com' , 'password1234'), ('Mike', 'Chan', 'mchan@gmail.com', 'password1234'), ('Ashley', 'Rodriquez', 'arodriquez@gmail.com', 'password1234'), ('Kevin', 'Tupik', 'ktupik@gmail.com', 'password1234');

INSERT INTO manager (first_name, last_name, email, phone, company_id)
VALUES ('Jen','Rogers','jrogers@amazon.com','804-358-8293',0),('Roger', 'Sizemore', 'rsizemore@amazon.com','804-323-8475',0),('Benny', 'Wong', 'bwong@meta.com', '784-837-7292',1),('Cynthia', 'Goodman', 'cgoodman@google.com', '898-876-2347',2),('Billy', 'Henry', 'bhenry@apple.com', '804-335-8736',3),('Rachel', 'Howe', 'rhowe@apple.com', '703-576-8327',3);

INSERT INTO resume (name, description, user_id, created_at, updated_at)
VALUES ('Sales', 'Sales',0, NOW(),NOW()),('Sales Lead', 'Sales lead', 0, NOW(), NOW()),('Lead Engineer','Lead engineer',2, NOW(), NOW()),('Software Enineer','Software engineer',2, NOW(), NOW()),('Account Manager', 'Account manager',1,NOW(), NOW()),('Accountant','Accountant',3,NOW(), NOW());

INSERT INTO position (name, description, location, close_date, company_id, manager_id, created_at, updated_at)
VALUES ('Sales Person', 'Sales person', 'Richmond', '2022-06-10', 0,0, NOW(), NOW()), ('Lead Engineer', 'Lead engineer', 'Alexandria', '2022-06-17',1,2, NOW(), NOW()), ('Software Engineer', 'Software engineer', 'Arlington', '2022-06-24', 2,3, NOW(), NOW()), ('Account Manager','Account manager', 'Richmond', '2022-06-10', 3,4, NOW(), NOW()),
 ('Accountant','Accountant','Richmond','2022-06-17',3,5, NOW(), NOW()), ("Sales Team Lead",'Sale team lead','Richmond', '2022-06-24', 0,1, NOW(), NOW());

INSERT INTO application (offer, accepted, interview1_date, interview2_date, interview3_date, interview4_date, position_id, resume_id, user_id, created_at, updated_at)
VALUES (false,false,null, null, null, null, 0,0,0, NOW(), NOW()),(false,false,null, null, null, null, 1,2,2, NOW(), NOW()),(false,false,null, null, null, null, 2,3,2, NOW(), NOW()),(false,false,null, null, null, null, 3,4,1, NOW(), NOW()),(false,false,null, null, null, null, 4,5,3, NOW(), NOW()),(false,false,null, null, null, null, 5,1,0, NOW(), NOW());