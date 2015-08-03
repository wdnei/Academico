

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/',function(request, response){
  response.redirect("/index.html");
});
  server.use(router);
};
