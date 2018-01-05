'use strict';
const $ = require('ci-herokuaddon');

if(require.main===module) {
  const e = process.env;
  const opt = {};
  if(e.CI_TIMEOUT) opt.timeout = parseInt(e.CI_TIMEOUT);
  if(e.CI_PING) opt.ping = parseInt(e.CI_PING);
  if(e.CI_CONFIG) opt.config = new RegExp(e.CI_CONFIG, 'g');
  if(e.CI_LOG) opt.log = toboolean(e.CI_LOG);
  const app = $(e.CI_ID, e.CI_APP, opt);
  const server = http.createServer(app.http);
  server.on('upgrade', (req, soc, head) => {
    app.ws.handleUpgrade(req, soc, head, (ws) => app.ws.emit('connection', ws));
  });
  server.listen(e.PORT||80);
  app.pool.setup();
}
