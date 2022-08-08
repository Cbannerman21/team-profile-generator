const { default: test } = require('node:test')
const Employee = require('../lib/Employee.js')

test('check for employee object', () => {
    const employee = new Employee('Chris');
    employee.id = 'Cbannerman21'
    employee.email = 'chrisB@gmail.com'

    expect(employee.name).toBe('Chris');
    expect(employee.id).toBe('Cbannerman21');
    expect(employee.email).toBe('chrisB@gmail.com');


});
