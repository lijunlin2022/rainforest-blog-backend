const { htmlEncode } = require("../utils/htmlUtils");
const { exec, escape } = require("../db/mysql");

// 增加
const add = async (noteData = {}) => {
    let { pid, title, abstract, content, author } = noteData;
    title = htmlEncode(title);
    abstract = htmlEncode(abstract);
    content = htmlEncode(content);

    const createdTime = Date.now();
    const updatedTime = Date.now();

    let sql = `insert into notes (notebook_id, title, abstract, content, created_time, updated_time, author) values (`
                + `${pid}` + ","
                + escape(title) + ","
                + escape(abstract) + ","
                + escape(content) + ","
                + `${createdTime}` + ","
                + `${updatedTime}` + ","
                + escape(author) + ")";
    const insertData = await exec(sql);
    return {
        id: insertData.insertId,
    };
}

// 删除
const delnote = async (id, author) => {
    // id 就是要删除博客的 id
    const sql = `delete from notes where id='${id}' and author='${author}';`
    const delData = await exec(sql)
    if (delData.affectedRows > 0) {
        return true
    }
    return false
}

// 修改
const update = async (id, noteData = {}) => {
    let { title, abstract, content } = noteData;
    title = htmlEncode(title);
    abstract = htmlEncode(abstract);
    content = htmlEncode(content);
    
    const updatedTime = Date.now();

    let sql = `update notes set `
                + "title=" + escape(title) + ","
                + "abstract=" + escape(abstract) + ","
                + "content=" + escape(content) + ","
                + `updated_time=${updatedTime} `
                + "where id=" + id;
    const updateData = await exec(sql);
    if (updateData.affectedRows > 0) {
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
        pid: null,
        current: 0,
        size: 10,
        author: null,
        keyword: null,
        sortMode: "lastUpdate"
    };
    Object.assign(defaults, options);

    let sql = `select id, notebook_id, title, abstract, updated_time, created_time from notes where 1 = 1 `;

    if (defaults.pid != null) {
        sql += `and notebook_id = ${defaults.pid} `;
    }
    if (defaults.author != null) {
        sql += `and author = '${defaults.author}' `;
    }
    if (defaults.keyword != null) {
        sql += `and title like '%${defaults.keyword}%' `;
    }
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
    getList,
    getDetail,
    add,
    update,
};