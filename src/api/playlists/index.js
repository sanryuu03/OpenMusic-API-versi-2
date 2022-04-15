const PlaylistsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlist',
  version: '1.0.0',
  register: async (server, {service, collaborationsService, validator}) => {
    const playlistsHandler = new PlaylistsHandler(service, collaborationsService, validator);
    server.route(routes(playlistsHandler));
  },
};
