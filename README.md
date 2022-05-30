# Career Commander

## Description

Career Commander is a job application tracker for serious job seekers with many applications out. Basically, this is an application and interview tracker.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

This project will be running on Heroku. So, no real installation will be required. You just have to execute the URL: . All the application source code can be found at https://github.com/DanielLiszka/career-commander. If you want to run the application locally, you will have to install the following npm packages in the folder holding the clone of the above repository: mysql2(npm i --save mysql2), sequelize(npm i sequelize), express(npm i express), express-handlebars(npm i express-handlebars), express-session(npm i express-session)/passport(npm i), connect-session-sequelize(npm i connect-session-sequelize)?, dotenv(npm i dotenv --save), and bcrypt(npm i bcrypt ). A MySQL database will have to be available and you will need root access to create the database. It is suggested that you grant privileges to another user with access only to that one database. Then, store that username and password in the .env file in the root of the application folder.

## Usage

This application will be run from Heroku at the following URL: https://warm-chamber-02188.herokuapp.com/. The database may be empty when you first run the application. If that is the case, you will need to create a new login. Click on Login and and enter a new username and password. Passwords must be at least 8 characters.

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    ```md
    ![alt text](assets/images/screenshot.png)
    ```

## Credits

Harrison Daniel https://github.com/harrison-daniel

Mark Elliott https://github.com/melliott7264

Daniel Liszka https://github.com/DanielLiszka

## License

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

---

🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

## Badges

![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.

## Features

If your project has a lot of features, list them here.

## How to Contribute

If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.

## Tests

Go the extra mile and write tests for your application. Then provide examples on how to run them here.
