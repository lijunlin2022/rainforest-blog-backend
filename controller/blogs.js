const xss = require("xss");
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

const newBlog = async (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content author 属性
    console.log(JSON.stringify(blogData));
    const title = xss(blogData.title);
    const abstract = xss(blogData.abstract);
    const cover = xss(blogData.cover);
    const content = xss(blogData.content);
    const author = blogData.author;
    const ishot = blogData.ishot;
    const isinterface = blogData.isinterface;
    const createTime = Date.now();

    const sql = "insert into blogs (title, abstract, cover, content, createtime, author, ishot, isinterface) values ("
                + escape(title) + ","
                + escape(abstract) + ","
                + escape(cover) + ","
                + escape(content) + ","
                + escape(createTime) + ","
                + escape(author) + ","
                + ishot + ","
                + isinterface + ")";

    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
}

const updateBlog = async (id, blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象，包含 title content 属性
    const title = xss(blogData.title);
    const abstract = xss(blogData.abstract);
    const cover = xss(blogData.cover);
    const content = xss(blogData.content);
    const ishot = blogData.ishot;
    const isinterface = blogData.isinterface;

    const sql = "update blogs set "
                + "title = " + escape(title) + ","
                + "abstract = " + escape(abstract) + ","
                + "cover = " + escape(cover) + ","
                + "content = " + escape(content) + ","
                + "ishot = " + ishot + ","
                + "isinterface = " + isinterface
                + " where id = " + id;
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
};