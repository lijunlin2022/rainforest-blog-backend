const { exec, escape } = require("../db/mysql");

const login = async (username, password) => {
  username = escape(username);
  password = escape(password);

  const sql = `select username, password from users where username=${username} and password=${password}`;
  const rows = await exec(sql);
  return rows[0] || {};
}

module.exports = {
  login,
};