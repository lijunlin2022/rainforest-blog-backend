const { htmlEncode } = require("../utils/htmlUtils");
const { exec, escape } = require("../db/mysql");

// 增加
const add = async (data = {}) => {
    let { content } = data;
    content = htmlEncode(content);

    const createdTime = Date.now();
    const updatedTime = Date.now();

    let sql = `insert into notes (content, created_time, updated_time ) values (`
                + escape(content) + ","
                + `${createdTime}` + ","
                + `${updatedTime}` + ")";

    const res = await exec(sql);
    return {
        id: res.insertId,
    };
}

// 删除
const del = async (id) => {
    const sql = `delete from notes where id='${id}';`
    const res = await exec(sql)
    if (res.affectedRows > 0) {
        return true
    }
    return false
}

// 修改
const update = async (data = {}) => {
    let { id, content } = data;
    content = htmlEncode(content);
    
    const updatedTime = Date.now();

    let sql = `update notes set content=`
                + escape(content) + ","
                + `updated_time=${updatedTime} `
                + `where id=${id};`
    const res = await exec(sql);
    if (res.affectedRows > 0) {
        return true;
    }
    return false;
}

// 查询单个
const getDetail = async (id) => {
    let sql = `select * from notes where 1 = 1 and id = ${id}`;
    const rows = await exec(sql);
    return rows[0];
}

// 查询多个
const getList = async (options) => {
    const defaults = {
        current: 0,
        size: 10,
        sortMode: "lastUpdate"
    };
    Object.assign(defaults, options);

    let sql = `select * from notes where 1 = 1 `;

    if (defaults.sortMode === "name") {
        sql += `order by title asc `;
    } else {
        sql += `order by updated_time desc `;
    }
    if (defaults.current != null && defaults.size != null) {
        defaults.current *= defaults.size;
        sql += `limit ${defaults.current}, ${defaults.size}`;
    }
    return await exec(sql);
}

module.exports = {
  add,
  del,
  update,
  getDetail,
  getList
};
