# cs2102_project
This is the repository for the final project of CS2102 at NUS

## Group Members
Yichen Jiang, Xingyue Tao, Licheng Sun, Haoyang Li

## How to run
As our project uses Node.js framework, you need to first install Node.js before running our website. After cloning the website repository / unzipping the folder, navigate into the folder and install all dependencies with the code below:

```bash
cd cs2102
npm install
```

You will need to create a local database and fill in some test data in order to enjoy the all the functions of our website. To do this, open a PSQL terminal and type in the code below. You will need to change the path to project.sql and small_test.sql to that on your machine.

```sql
create database cs2102;
\c cs2102;
\i project.sql
\i small_test.sql
```

After completing the steps above, you can run `npm start` to start the website server at `localhost:3000`. We have provided a default role for customer, freelancer and supervisor. The username and password for them are:

```
Customer username: man
         password: 1111

Freelancer username: lancer
           password: 1111

Supervisor username: super
           password: 1111  
```
