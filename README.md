<!-- Project Logo -->
<div align="center">
    <p>
        <a href='https://career-commander.herokuapp.com/' target='_blank'>
            <img size='80px' alt='Career Commander Logo' src='./public/images/titleandlogo.png'/>
        </a>
    </p>
</div>

---

# Description

Career Commander is a job application tracker for serious job seekers. It tracks critical information across multiple applications & interviews so you can stay on top of your next steps to land a job.

# Table of Contents

- [Getting Started](#getting-started)
- [Demo}(#demo)
- [Usage](#usage)
- [Built With](#built-with)
- [Contributors](#contributors)
- [License](#license)

# Getting Started

This project is deployed on Heroku at the following URL: https://career-commander.herokuapp.com/.

![loginPage](https://user-images.githubusercontent.com/99782685/173249808-28254a45-b648-4159-9549-a44fd0f525e2.png)


## Create an Account

To get started, visit the URL above. At the login screen, click the "Sign Up" button and enter your information to create an account. Please note that passwords must be atleast 8 characters long.

Once entered, you will be redirected to the Dashboard.

</br>

## Creat a Resume

After creating an account and logging in for the first time, you will need to create a Resume for your first application by clicking the "Create a Resume" button.

Select the "Add a Resume" button to enter your resume's information. Click "Save" to complete your first resume.

</br>

## Create an Application

To creat an application, select the Dashboard page from the Navigation bar and click the "Create an Application" to enter your information.

Once entered and all the required prompts are filled out, click the "Submit Application" button at the bottom of the page to save to your Dashboard.

<p align="right">(<a href="#top">back to top</a>)</p>

# Demo
https://user-images.githubusercontent.com/99782685/173249671-83f88352-de69-4936-bc05-86a2091dc262.mp4

# Usage

## Account Information

To change your password, seleect the "Change Password" page from the Navigation bar. When prompted, enter your current email address with the new password you wish to have. When ready, click the "Change Password" button to update your account.

</br>

## Source Code

All the application source code can be found at https://github.com/DanielLiszka/career-commander. If you want to run the application locally, you will need to install the npm packages.

After cloning the repository, download the required npm packages by running

```sh
"npm i"
```

These include:

<ul>
<li>mysql2(npm i --save mysql2)</li>
<li>sequelize(npm i sequelize)</li>
<li>express(npm i express)</li>
<li>express-handlebars(npm i express-handlebars)</li>
<li>express-session(npm i express-session)</li>
<li>connect-session-sequelize(npm i connect-session-sequelize)</li>
<li>dotenv(npm i dotenv --save) bcrypt(npm i bcrypt )</li>
<li>day.js(npm i dayjs)</li>
</ul>

</br>

## Database

A MySQL database server will have to be available and you will need root access to create the database. It is suggested that you grant privileges to another user with access only to that one database.

Then, store that username and password in the .env file in the root of the application folder. Once logged in as root execute the schema.sql file in the MySQL shell (source ./db/schema.sql) to create the database career_commander_db.

Once that is done, exit the shell and edit the server.js file to change sequelize.sync({ force: false }) to sequelize.sync({ force: true }). Save the file and start the server (npm start).

This will create the tables; only if you have entered the proper credentials in the .env file. Next, stop the server (control-C) and edit the server.js file again to change force: to false and resave the file. Restart the server (npm start) and you should be good to go. The server can be found on you local system at http://localhost:3001/.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- . The database may be empty when you first run the application. If that is the case, you will need to create a new login. Click on Login and and enter a new username and password. Passwords must be at least 8 characters.

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    ```md
    ![alt text](assets/images/screenshot.png)
    ``` -->

# Built With

<ul>
<li>HTML</li>
<li>CSS</li>
<li>Bootstrap</li>
<li>Javascript</li>
<li>JQuery</li>
<li>Node.js</li>
<li>MySQL</li>
<li>Heroku</li>
</ul>

<p align="right">(<a href="#top">back to top</a>)</p>

# Contributors

![GitHub contributors](https://img.shields.io/github/contributors-anon/DanielLiszka/career-commander)

Harrison Daniel https://github.com/harrison-daniel

Mark Elliott https://github.com/melliott7264

Daniel Liszka https://github.com/DanielLiszka

# License

Copyright (c) 2022 Harrison Daniel, Mark Elliott & Daniel Liszka

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

<p align="right">(<a href="#top">back to top</a>)</p>

---
