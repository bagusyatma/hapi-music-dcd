/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addColumns('playlists', {
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('playlists', ['created_at', 'updated_at']);
};
