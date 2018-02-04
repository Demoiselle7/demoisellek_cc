const fs = require('fs')

// 格式化时间的函数
const formattedTime = () => {
    const d = new Date()
    // 这里需要注意, js 中 month 是从 0 开始计算的, 所以要加 1
    const month = d.getMonth() + 1
    const date = d.getDate()
    const hours = d.getHours()
    const minutes = d.getMinutes()
    const seconds = d.getSeconds()

    const t = `${hours}:${minutes}:${seconds}`
    return t
}

// 用 log 函数把所有输出写入到文件中, 这样就能方便地掌控全局了
// 即便你关掉程序, 也能再次打开来看看, 这就是个时光机
const log = (...args) => {
    const t = formattedTime()
    const arg = [t].concat(args)
    // 打印出来的结果带上时间
    console.log.apply(console, arg)

    // log 出来的结果写入到文件中
    const content = t + ' ' + args + '\n'
    fs.writeFileSync('log.txt', content, {
        flag: 'a',
    })
}

module.exports = {
    log: log,
}