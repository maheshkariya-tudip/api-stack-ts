import express from 'express';
import usersService from '../services/user.service';

class UsersController {
    async listUsers(req: express.Request, res: express.Response) {
        const users = await usersService.list()
        res.send(users)
    }
}

export default new UsersController()