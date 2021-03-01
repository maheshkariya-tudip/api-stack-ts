import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import fs = require('fs');
import * as appConfig from './config/config'
import * as Routes from './routes/index'


class App {
    public app : express.Application
    constructor(routes:any){
        this.app = express()
        this.setMongoConfig();
        this.initializeMiddleware();
        this.initializeRouters(routes);
    }
    private initializeMiddleware() {

        this.app.use(bodyParser.json({ limit: `50mb` }))
        
        this.app.use(bodyParser.urlencoded({ limit: `50mb`, extended: true }))
        
        this.app.use(`/images`, express.static(`./images`))
        
        this.app.use(`/public`, express.static(`./public`))
        
        this.app.use(passport.initialize())
        
        this.app.use(passport.session())
        
        this.app.use(cors())
        
        this.app.use(express.static('dist'))
        
        this.app.use((req, res, next) => {
            next();
        })
        
        this.app.use(morgan(':method :url :status - :response-time ms'))
        
        this.app.set(`views`, __dirname + `/views`);
        
        this.app.set(`view engine`, `ejs`);
        
        this.app.set(`port`, (process.env.PORT || appConfig.config.development.dev.port));
        
        this.app.set(`host`, (process.env.HOST || appConfig.config.development.dev.host));
        
        this.app.use(`/images`, express.static(path.join(__dirname, `./images`)));
        
        this.app.listen(this.app.get(`port`), () => {
            console.info(`Server started at ${this.app.get(`host`)}:${this.app.get(`port`)}`);
          });
      }
      private setMongoConfig() {
        mongoose.Promise = global.Promise
        mongoose.connect(appConfig.config.development.dbURL, {
          useNewUrlParser: true,
        })
        mongoose.connection
      }
      private initializeRouters(routes:any) {
        routes.forEach((route:any) => {
          this.app.use(route);
        })
      }
}
new App(
    [
        Routes.UsersRoute
    ])
