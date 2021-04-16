const xss = require('xss')
const { exec } = require('../db/mysql')

const getList = async (author, keyword) => {
    let sql = `select id, title, abstract, createtime, author from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    return await exec(sql)
}

const getDetail = async (id) => {
    const sql = `select * from blogs where id='${id}'`
    const rows = await exec(sql)
    return rows[0]
}

const newBlog = async (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content author 属性
    console.log(JSON.stringify(blogData))
    const title = xss(blogData.title)
    const abstract = xss(blogData.abstract)
    const content = xss(blogData.content)
    const author = blogData.author
    const createTime = Date.now()

    const sql = `
        insert into blogs (title, abstract, content, createtime, author)
        values ('${title}', '${abstract}', '${content}', ${createTime}, '${author}');
    `

    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
}

const updateBlog = async (id, blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象，包含 title content 属性

    const title = xss(blogData.title)
    const abstract = xss(blogData.abstract)
    const content = xss(blogData.content)

    const sql = `
        update blogs set title='${title}', abstract='${abstract}', content='${content}' where id=${id}
    `

    const updateData = await exec(sql)
    if (updateData.affectedRows > 0) {
        return true
    }
    return false
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
    newBlog,
    updateBlog,
    delBlog
}