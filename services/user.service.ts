import { CRUD } from "../interfaces/crud.interface";

class UsersService implements CRUD {
    async list() {
        return "Hello world";
    }
}

export default new UsersService();