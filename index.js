const inquirer = require('inquirer');
const fs = require('fs');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const team = [];


function startApp() {
    writeHtml()
    addMember()
}

function addMember() {
    inquirer
        .prompt([
            {
                type: 'text',
                name: 'name',
                message: 'What is the name of the member?'
            },

            {
                type: 'text',
                name: 'id',
                message: 'What is the id of the member?'
            },
            {
                type: 'text',
                name: 'email',
                message: 'What is the email of the member?'
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the role of the member? Please select one.',
                choices: [
                    'Manager',
                    'Engineer',
                    'Intern',
                ]
            },
        ])
        .then(function({name, id, email, role}) {
            console.log(role)
            let newMember;
            let roleInfo = ''
            if (role === 'Manager') {
                inquirer
                    .prompt({
                        type: 'text',
                        name: 'roleInfo',
                        message: 'What is their Office Number?'
                    })
                    .then(function({roleInfo}){
                        newMember = new Manager(name, id, email, roleInfo)
                        team.push(newMember);
                        anotherMember()
                        writeCard(newMember)
                    })
            } else if (role === 'Engineer') {
                inquirer
                    .prompt({
                        type: 'text',
                        name: 'roleInfo',
                        message: 'What is their GitHub?'
                    })
                    .then(function({roleInfo}) {
                        newMember = new Engineer(name, id, email, roleInfo)
                        team.push(newMember);
                        anotherMember()
                        writeCard(newMember)
                    })
            } else {
                inquirer
                    .prompt ({
                        type: 'text',
                        name: 'roleInfo',
                        message: 'What is their school?'
                    })
                    .then(function({roleInfo}) {
                        newMember = new Intern(name, id, email, roleInfo)
                        team.push(newMember);
                        anotherMember()
                        writeCard(newMember)
                    })
            }

            function anotherMember() {
                inquirer
                    .prompt({
                        type: 'list',
                        name: 'anotherMember',
                        message: 'Would you like to add another member?',
                        choices: [
                            'Yes',
                            'No'
                        ]
                    })
                    .then(function({anotherMember}){
                        if (anotherMember === 'Yes') {
                            addMember()
                        } else {
                            endHtml()
                        }
                    })
            }

            function writeHtml() {
                const startHtml = `
                <!DOCTYPE html>
                <html lang='en'>
                
                <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Portfolio Demo</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    <body>
        <h1 class="bg-primary text-center">Team Profile</h1>
                `
                fs.writeFile('./dist/team-profile.html', startHtml, function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }

            function writeCard(employee) {
                const name = employee.getName()
                const id = employee.getId()
                const email = employee.getEmail()
                const role = employee.getRole()
                let card = ''
                if (role === 'Manager') {
                    const officeNumber = employee.getOfficeNumber()
                    card = `
                    <div class="col-5 card"> 
                <h2>${name}</h2>
                <ul>
                    <li>Id: ${id}</li>
                    <li>Email: ${email}</li>
                    <li>Office Number: ${officeNumber}</li>
                </ul>
        </div> `

                } else if (role === 'Engineer') {
                    const github = employee.getGithub()
                    card = `
                    <div class="col-5 card"> 
                <h2>${name}</h2>
                <ul>
                    <li>Id: ${id}</li>
                    <li>Email: ${email}</li>
                    <li>Github: ${github}</li>
                </ul>
        </div>`
                } else if (role === 'Intern') {
                    const school = employee.getSchool()
                    card = `
                    <div class="col-5 card"> 
                <h2>${name}</h2>
                <ul>
                    <li>Id: ${id}</li>
                    <li>Email: ${email}</li>
                    <li>School: ${school}</li>
                </ul>
        </div>`
                }

                fs.appendFile('./dist/team-profile.html', card, function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            function endHtml() {
                const endHtml = `
                
                </body>
                </html>
                `
                fs.appendFile('./dist/team-profile.html', endHtml, function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        })
         
        }
 startApp();
