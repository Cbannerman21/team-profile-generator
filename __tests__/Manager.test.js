const Manager = require('../lib/Manager')

test('check for manager office', () => {
    const manager = new Manager('DarthVader');
    manager.officeNumber = '001';

    expect(manager.officeNumber).toBe('001');
});