const xss = require("xss");
const { exec, escape } = require("../db/mysql");

/**
 * @param {Number} current
 * @param {Number} size
 * @param {String} keyword
 * @returns
 */
const getList = async (current, size, keyword) => {
    let sql = `select * from notebooks where 1 = 1 `;
    if (keyword) {
      sql += `and name like '%${keyword}%' `;
    }
    sql += `order by updated_time desc `;
    if (current && size) {
        current *= size;
        sql += `limit ${current}, ${size}`;
    }
    return await exec(sql);
};

/**
 * @param {Number} id
 * @returns
 */
const getDetail = async (id) => {
  let sql = `select * from notebooks where id = ${id}`;
  const rows = await exec(sql);
  return rows[0];
}

/**
 * @param {Object} data
 * @returns
 */
const add = async (data = {}) => {
  const name = xss(data.name);
  const description = xss(data.description);
  const created_time = Date.now();
  const updated_time = Date.now();

  let sql = `insert into notebooks (name, description, created_time, updated_time) values (`
            + escape(name) + `,`
            + escape(description) + `,`
            + `${created_time}` + `,`
            + `${updated_time}` + `)`;

  const insertData = exec(sql);
  return {
    id: insertData.id,
  };
}

/**
 * @param {Number} id
 * @param {Object} data
 * @returns
 */
const update = async (id, data = {}) => {
  const name = xss(data.name);
  const description = xss(data.description);
  const updated_time = Date.now();

  let sql = `update notebooks set `
            + `name = ` + escape(name) + `,`
            + `description = ` + escape(description) + `,`
            + `updated_time = ${updated_time} `
            + `where id = ${id}`;
  const updateData = await exec(sql);
  if (updateData.affectedRows > 0) {
      return true;
  }
  return false;
}

module.exports = {
  getList,
  getDetail,
  add,
  update,
};