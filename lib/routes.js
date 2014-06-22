'use strict';

var angelList = require('./controllers/angelList'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    crunchbase = require('./controllers/crunchbase'),
    session = require('./controllers/session'),
    middleware = require('./middleware'),
    api =  require('./controllers/api');

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

    // CRUNCHBASE ROUTES:
  app.route('/api/crunchbase/people')
  .get(crunchbase.people);
  app.route('/api/crunchbase/person/:id')
  .get(crunchbase.person);
  app.route('/api/crunchbase/organizations')
  .get(crunchbase.organizations);
  app.route('/api/crunchbase/organization/:id')
  .get(crunchbase.organization);

  //AngelList Routes:
  app.route('/api/angellist/companys-investors/:id')
  .get(angelList.findCompanysInvestors);
  app.route('/api/angellist/markets-investors/:id')
  .get(angelList.findMarketsInvestors);
  app.route('/api/angellist/coinvestors/:id/:type')
  .get(angelList.findCoInvestors);


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
