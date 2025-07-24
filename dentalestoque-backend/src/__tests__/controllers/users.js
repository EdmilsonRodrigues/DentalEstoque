import UserController from '../../controllers/users';
import { jest } from '@jest/globals';
import { faker } from '@faker-js/faker';

function generateRandomUser() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password()
    };
}

test('should return Users in specified format', async() => {
    const MIN_USERS = 0;
    const MAX_USERS = 100;

    const numUsers = faker.number.int({min: MIN_USERS, max: MAX_USERS}); 

    const users = [];
    for (let i = 0; i < numUsers; i++) {
        users.push(generateRandomUser());
    }
    
    const dataAccess = {
        getUsers: jest.fn().mockImplementation(async() => users)
    };

    result = await (new UserController(dataAccess)).getUsers();
    console.log(result);

    expect(result).toStrictEqual({
        statusCode: 200,
        success: true,
        body: users
    });
});
