const File = require('../models/file.js')
const Dir = require('../models/dir.js')
const RepComment = require('../models/repComment.js')

/**
 * 判断文件夹是否存在
 * @param {string} _id
 * @returns 
 */
async function isDir(_id) {
  let flag = false
  await Dir.findById(_id).then(res => {
    if (res !== null) {
      flag = true
    }
  }).catch(err => {
    console.error(err)
  })
  return flag
}

/**
 * 判断文件夹是不是仓库: dirType -> 0
 * @param {string} _id 
 * @returns 
 */
async function isRepository(_id) {
  let flag = false
  await Dir.findById(_id).then(res => {
    if (res.dirType === 0) {
      flag = true
    }
  }).catch(err => {
    console.error(err)
  })
  return flag
}

/**
 * 判断同级目录下有没有重名的文件夹
 */
async function isDuplicatedNameDirForSameParent(pDirId, dirName) {
  let flag = false
  await Dir.findOne({ pDirId, dirName }).then(res => {
    if (res !== null) {
      flag = true
    }
  }).catch(err => {
    console.error(err)
  })
  return flag
}

/**
 * 判断文件是否存在
 * @param {string} _id
 */
async function isFile(_id) {
  let flag = false
  await File.findById(_id).then(res => {
    if (res !== null) {
      flag = true
    }
  }).catch(err => {
    console.error(err)
  })
  return flag
}

/**
 * 判断同级目录下有没有重名的文件
 * @param {string} pDirId 
 * @param {string} filename
 * @returns 
 */
async function isDuplicatedNameFileForSameParent(pDirId, filename) {
  let flag = false
  await File.findOne({ pDirId, filename }).then(res => {
    if (res !== null) {
      flag = true
    }
  }).catch(err => {
    console.error(err)
  })
  return flag
}

/**
 * 判断评论是否存在
 * @param {string} _id
 */
async function isRepComment(_id) {
  let flag = false
  await RepComment.findById(_id).then(res => {
    if (res !== null) {
      flag = true
    }
  }).catch(err => {
    console.error(err)
  })
  return flag
}

module.exports = {
  isDir,
  isRepository,
  isDuplicatedNameDirForSameParent,
  isFile,
  isDuplicatedNameFileForSameParent,
  isRepComment
}
