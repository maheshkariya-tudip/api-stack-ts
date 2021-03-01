import * as development from './environments/development'
import * as production from './environments/production'

export let config = {
    development: development.env,
    production: production.env
};
