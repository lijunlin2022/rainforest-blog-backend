const { htmlEncode } = require("../utils/htmlUtils");
const { exec, escape } = require("../db/mysql");

/**
 * @param {Number} pid
 * @param {Number} current
 * @param {Number} size
 * @param {String} author
 * @param {String} keyword
 * @returns 
 */
const getList = async (pid, current, size, author, keyword) => {
    let sql = `select id, title, abstract, updated_time, created_time from blogs where 1 = 1 `;
    if (pid) {
        sql += `and notebook_id = ${pid} `;
    }
    if (author) {
        sql += `and author = '${author}' `;
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `;
    }
    sql += `order by updated_time desc `;
    if (current && size) {
        current *= size;
        sql += `limit ${current}, ${size}`;
    }
    return await exec(sql);
}

/**
 * @param {Number} id
 * @param {Number} pid
 * @param {String} title
 * @returns
 */
const getDetail = async (id, pid, title) => {
    let sql = `select * from blogs where 1 = 1 `;
    if (id) {
        sql += `and id = ${id} `;
    }
    if (pid) {
        sql += `and notebook_id = ${pid} `;
    }
    if (title) {
        sql += `and title = '${title}'`;
    }
    const rows = await exec(sql);
    return rows[0];
}

/**
 * @param {Object} blogData
 * @returns 
 */
const add = async (blogData = {}) => {
    let { pid, title, abstract, content, author } = blogData;
    title = htmlEncode(title);
    abstract = htmlEncode(abstract);
    content = htmlEncode(content);

    const created_time = Date.now();
    const updated_time = Date.now();

    let sql = `insert into blogs (notebook_id, title, abstract, content, created_time, updated_time, author) values (`
                + `${pid}` + ","
                + escape(title) + ","
                + escape(abstract) + ","
                + escape(content) + ","
                + `${created_time}` + ","
                + `${updated_time}` + ","
                + escape(author) + ")";
    const insertData = await exec(sql);
    return {
        id: insertData.insertId,
    };
}

/**
 * @param {Number} id
 * @param {Object} blogData
 * @returns 
 */
const update = async (id, blogData = {}) => {
    let { title, abstract, content } = blogData;
    title = htmlEncode(title);
    abstract = htmlEncode(abstract);
    content = htmlEncode(content);
    
    const updated_time = Date.now();

    let sql = `update blogs set `
                + "title=" + escape(title) + ","
                + "abstract=" + escape(abstract) + ","
                + "content=" + escape(content) + ","
                + `updated_time=${updated_time} `
                + "where id=" + id;
    const updateData = await exec(sql);
    if (updateData.affectedRows > 0) {
        return true;
    }
    return false;
}

const delBlog = async (id, author) => {
    // id 就是要删除博客的 id
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    const delData = await exec(sql)
    if (delData.affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    getList,
    getDetail,
    add,
    update,
};