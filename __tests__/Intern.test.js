const { isObjectTypeInternalSlot } = require('@babel/types');
const { default: test } = require('node:test')
const Intern = require('../lib/Intern')

test('check for interns school', () => {
    const intern = new Intern('Leia');
    intern.school = 'AlderranU';

    expect(intern.school).toBe('AlderranU');
});