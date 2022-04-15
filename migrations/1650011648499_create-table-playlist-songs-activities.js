/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('playlist_song_activities', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    playlistid: {
      type: 'varchar(50)',
      references: 'playlists',
    },
    songid: {
      type: 'varchar(50)',
      references: 'songs',
    },
    userid: {
      type: 'varchar(50)',
      references: 'users',
    },
    action: {
      type: 'varchar(50)',
      notNull: true,
    },
    time: {
      type: 'timestamp',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('playlist_song_activities');
};
