/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const { pool } = require('../database');
const jwt = require('../utils/jwt.utils');
const { UserModel } = require('../error/error.model');

class User {
  constructor(obj = {}) {
    for (const propname in obj) {
      this[propname] = obj[propname];
    }
  }

  static async login(userData, userCurrency, token) {
    try {
      const user = {
        status: `(JWT) Bienvenue ${userData.nickname}`,
        refreshToken: jwt.makeRefreshToken(token),
        id: userData.id,
        nickname: userData.nickname,
        email: userData.email,
        picture: userData.picture,
        currency: userCurrency,
        verify: userData.verify,
      };
      return new User(user);
    } catch (err) {
      throw new UserModel(err);
    }
  }

  static async findOne(email) {
    try {
      const { rows } = await pool.query('SELECT * FROM "user" WHERE email=$1;', [email]);
      return new User(rows[0]);
    } catch (err) {
      throw new UserModel(err);
    }
  }

  static async verify(id) {
    try {
      const { rows } = await pool.query('UPDATE "user" SET verify=true WHERE id=$1 RETURNING verify;', [id]);
      return new User(rows[0]);
    } catch (err) {
      throw new UserModel(err);
    }
  }

  static async deleteOne(id) {
    try {
      const { rows } = await pool.query('DELETE FROM "user" WHERE id=$1;', [id]);
      return new User(rows[0]);
    } catch (err) {
      throw new UserModel(err);
    }
  }

  static async findById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM "user" WHERE id=$1;', [id]);
      return new User(rows[0]);
    } catch (err) {
      throw new UserModel(err);
    }
  }

  static async updatePass(password, id) {
    try {
      const { rows } = await pool.query('UPDATE "user" set password=$1 WHERE id=$2;', [password, id]);
      return new User(rows[0]);
    } catch (err) {
      throw new UserModel(err);
    }
  }

  static async updateAvatar(picture, id) {
    try {
      const { rows } = await pool.query('UPDATE "user" set picture=$1 WHERE id=$2 RETURNING *;', [picture, id]);
      return new User(rows[0]);
    } catch (err) {
      throw new UserModel(err);
    }
  }

  async save() {
    try {
      if (this.id) {
        await pool.query('SELECT * FROM update_user($1)', [this]);
      } else {
        const { rows } = await pool.query('SELECT * FROM add_user($1);', [this]);
        if (rows) {
          this.id = rows[0].id;
          return this;
        }
      }
      return this;
    } catch (err) {
      throw new UserModel(err);
    }
  }
}

module.exports = User;
