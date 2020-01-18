const { Router } = require('express');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router();

routes.get('/devs', DevController.index);
routes.get('/devs/:github_username', DevController.detail);
routes.post('/devs', DevController.create);

routes.get('/search', SearchController.index);

module.exports = routes;