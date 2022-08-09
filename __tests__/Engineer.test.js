const Engineer = require('../lib/Engineer')

test('test for engineer github', () => {
    const engineer = new Engineer('Chewbacca');
    engineer.github = 'github';

    expect(engineer.github).toBe('github');
});