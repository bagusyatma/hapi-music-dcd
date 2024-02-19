const { Pool } = require('pg');
const InvariantError = require('../exceptions/InvariantError');
const { nanoid } = require('nanoid');

class CollaborationsService {
  constructor(userService) {
    this._pool = new Pool();
    this._userService = userService;
  }

  addCollaboration = async (playlistId, userId) => {
    await this._userService.notExistUser(userId);

    const id = `collab-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO collaborations VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Kolaborasi gagal ditambahkan');
    }

    return result.rows[0].id;
  };

  deleteCollaboration = async (playlistId, userId) => {
    const query = {
      text: 'DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2 RETURNING id',
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Kolaborasi gagal dihapus');
    }
  };

  verifyCollaborator = async (playlistId, userId) => {
    const query = {
      text: 'SELECT * FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Kolahorator tidak ditemukan');
    }
  };
}
module.exports = CollaborationsService;
