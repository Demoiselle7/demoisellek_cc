// 如果把 session 存储在 cookie 中, 通常使用的是对称加密
// 这个和我们之前学的对称加密是一样的

// 通常我们并不希望别人知道 secretKey 是什么,
// 所以单独放在 config.js 文件中, 第一次提交到仓库,
// 然后忽略把这个文件添加到 ignore 文件中, 这样就不用担心泄露密钥了
const secretKey = 'nodepy'
const mongodbName = 'node_test'

module.exports = {
    secretKey: secretKey,
    mongodbName: mongodbName,
}