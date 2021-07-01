const xss = require("xss");
const { exec, escape } = require("../db/mysql");

const getList = async (author, keyword) => {
    let sql = `select * from blogs where 1 = 1 `;
    if (author) {
        sql += `and author='${author}' `;
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `;
    }
    sql += `order by created_time desc`;
    return await exec(sql);
}

const getLatestUpdatedByPage = async (current, size) => {
    current *= size;
    let sql = `select * from blogs order by updated_time desc `
            + `limit ${current}, ${size}`
    return exec(sql);
};

const getIdSetOfInterfaces = async () => {
    let sql = "select id, title from blogs where isinterface = true";
    return await exec(sql);
};

const getDetail = async (id) => {
    const sql = `select * from blogs where id='${id}'`
    const rows = await exec(sql)
    return rows[0]
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
    getLatestUpdatedByPage,
}