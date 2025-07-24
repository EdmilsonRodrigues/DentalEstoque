import express from 'express';

import UsersControllers from '../controllers/users.js';
import UsersDataAccess from '../dataAccess/users.js';

function getUsersRouter(mongoConnection) {
    const usersRouter = express.Router();

    const usersControllers = new UsersControllers(new UsersDataAccess(mongoConnection));

    usersRouter.get('/', async(req, res) => {
        const { success, statusCode, body } = await usersControllers.getUsers();

        res.status(statusCode).send({ success, statusCode, body });
    });

    usersRouter.delete('/me', async (req, res) => {
        const { success, statusCode, body } = await usersControllers.deleteUser(req.params.id);

        res.status(statusCode).send({ success, statusCode, body });
    });

    usersRouter.put('/me', async (req, res) => {
        const { success, statusCode, body } = await usersControllers.updateUser(req.params.id, req.body);

        res.status(statusCode).send({ success, statusCode, body });
    });

    return usersRouter;
}
export default getUsersRouter;
