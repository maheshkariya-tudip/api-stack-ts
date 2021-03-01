import Express from 'express'
import controller from '../controllers/user.controller'
const Router = Express.Router()

Router.get('/profile',controller.listUsers)

export default Router;
