'use strict';

var angelList = require('./controllers/angelList'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    crunchbase = require('./controllers/crunchbase'),
    updateDB = require('./controllers/updateDB'),
    session = require('./controllers/session'),
    middleware = require('./middleware'),
    api =  require('./controllers/api'),
    search = require('./controllers/search'),
    seed =  require('./seed');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/api/awesomeThings')
    .get(api.awesomeThings);
  app.route('/api/addNewThing')
    .get(api.addNewThing);

  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

    // SEARCH ROUTES
    app.route('/api/search')
      .post(search.companies);

    app.route('/api/companies/:value')
      .post(search.allCompanies);

    app.route('/api/markets')
      .get(search.allMarkets);


    // CRUNCHBASE ROUTES:
  app.route('/api/crunchbase/people')
  .get(crunchbase.people);
  app.route('/api/crunchbase/person/:name')
  .get(crunchbase.person);
  app.route('/api/crunchbase/organizations')
  .get(crunchbase.organizations);
  app.route('/api/crunchbase/organization/:company')
  .get(crunchbase.organization);
  app.route('/api/crunchbase/categories/:permalink')
  .get(crunchbase.categories);
  app.route('/api/crunchbase/funding_rounds/:company')
  .get(crunchbase.funding_rounds);
  app.route('/api/crunchbase/funding_round/:id')
  .get(crunchbase.funding_round);




//Seed test routes
  app.route('/api/updateDB/addNewCompany/:id/:name')
  .get(updateDB.addNewCompany);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);

};
