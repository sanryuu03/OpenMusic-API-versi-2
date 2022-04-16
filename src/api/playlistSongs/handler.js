class PlaylistSongsHandler {
  constructor(playlistSongsService, playlistsService, validator) {
    this._playlistSongsService = playlistSongsService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postPlaylistSongHandler = this.postPlaylistSongHandler.bind(this);
    this.getPlaylistSongsHandler = this.getPlaylistSongsHandler.bind(this);
    this.deletePlaylistSongByIdHandler = this.deletePlaylistSongByIdHandler.bind(this);
  }

  async postPlaylistSongHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);
    const {id: playlistId} = request.params;
    const {songId} = request.payload;
    const {id} = request.params;
    const {id: credentialId} = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(id, credentialId);
    await this._playlistSongsService.verifySongExist(songId);
    await this._playlistSongsService.addSongsToPlaylist({id, songId});

    await this._playlistsService.addPlaylistActivities(
        playlistId,
        songId,
        credentialId,
        'add',
    );
    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan pada playlist',
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongsHandler(request) {
    const {id} = request.params;
    const {id: credentialId} = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(id, credentialId);

    const playlist = await this._playlistsService.getPlaylistById(id);
    playlist.songs = await this._playlistSongsService.getSongsFromPlaylist(id);

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deletePlaylistSongByIdHandler(request, h) {
    const {id: playlistId} = request.params;
    const {id} = request.params;
    const {songId} = request.payload;
    const {id: credentialId} = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(id, credentialId);
    await this._playlistSongsService.deleteSongFromPlaylistById(id, songId);

    await this._playlistsService.addPlaylistActivities(
        playlistId,
        songId,
        credentialId,
        'delete',
    );

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }
}

module.exports = PlaylistSongsHandler;
