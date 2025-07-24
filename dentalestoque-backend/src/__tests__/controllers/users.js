import UserController from '../../controllers/users';
import { jest } from '@jest/globals';
import { faker } from '@faker-js/faker';

function generateRandomUser() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password()
    };
}

test('should return users', async() => {
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

    const result = await (new UserController(dataAccess)).getUsers();

    expect(result).toStrictEqual({
        statusCode: 200,
        success: true,
        body: users
    });
});

test('should return 500 if error fetching users', async() => {
    const errorMessage = "An Error Happened";
    const mockError = new Error(errorMessage);

    const dataAccess = {
        getUsers: jest.fn().mockImplementation(async() => {
            throw mockError;
        })
    };

    const result = await (new UserController(dataAccess)).getUsers();

    expect(result).toStrictEqual({
        statusCode: 500,
        success: false,
        body: mockError.toString()
    });
});

test('should delete user', async() => {
    const userId = faker.internet.username();

    const dataAccess = {
        deleteUser: jest.fn(async() => null)
    };

    const result = await (new UserController(dataAccess)).deleteUser(userId);

    expect(result).toStrictEqual({
        statusCode: 200,
        success: true,
        body: null
    });
});

test('should fail deleting user', async() => {
    const userId = faker.internet.username();

    const mockError = new Error("Error deleting user");
    const dataAccess = {
        deleteUser: jest.fn(async() => {
            throw mockError;
        })
    };

    const result = await (new UserController(dataAccess)).deleteUser(userId);

    expect(result).toStrictEqual({
        statusCode: 500,
        success: false,
        body: mockError.toString()
    });
});

test('should update user data', async() => {
    const userId = faker.internet.username();
    const userData = generateRandomUser();

    const dataAccess = {
        updateUser: jest.fn(async(id, data) => {
            if (id === userId) {
                return data;
            }
            return null;
        })
    };

    const result = await (new UserController(dataAccess)).updateUser(userId, userData);

    expect(result).toStrictEqual({
        statusCode: 200,
        success: true,
        body: userData
    });    
});

test('should fail updating user data', async() => {
    const userId = faker.internet.username();
    const userData = generateRandomUser();

    const mockError = new Error('Could not update data');
    const dataAccess = {
        // eslint-disable-next-line no-unused-vars
        updateUser: jest.fn(async(id, data) => {
            throw mockError;
        })
    };

    const result = await (new UserController(dataAccess)).updateUser(userId, userData);

    expect(result).toStrictEqual({
        statusCode: 500,
        success: false,
        body: mockError.toString()
    });    
});
