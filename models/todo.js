const Model = require('./main')

class Todo extends Model {
    constructor(form={}) {
        super()
        this.id = form.id
        this.title = form.title || ''
        this.completed = form.completed || false
        // this.user_id = form.user_id
        // 给 todo 增加两个属性 created_time 和 update_time,
        // 分别表示创建时间和更新时间
        // 这两个很常用, 所以用 ct 和 ut 的缩写表示
        const now = Date.now()
        // 如果 form 里面没有传入 ct 和 ut, 就会用当前时间 unix timestamp
        this.ct = form.ct || now
        this.ut = form.ut || now
    }

    static update(form) {
        console.log('debug form', form)
        const id = Number(form.id)
        // 这个方法前面有 static, 所以是一个类方法, this 表示当前的类
        const t = this.get(id)

        // 将更新之后的 title 赋值给实例
        t.title = form.title

        // 有些情况下, 需要更新很多 key
        // 比如论坛提问那里需要更新
        // title, expectation, thinking, procedure, problem, code
        // 很多人会一路顺着写下来, 比如下面这种形式
        // t.title = form.title
        // t.expectation = form.expectation
        // t.thinking = form.thinking
        // t.procedure = form.procedure
        // t.problem = form.problem
        // t.code = form.code
        // 实际上这种重复代码应该消除
        // 一般会通过循环或者函数来消除重复, 这里我们使用的是循环
        // 把不需要更新的 key 放在一个单独的数组中,
        // 比如 id 和 created_time 通常是不希望更新的
        // const frozonKeys = [
        //     'id',
        //     'ct',
        // ]
        // // 然后遍历 form 表单, 更新剩下的所有 key
        // Object.keys(form).forEach((k) => {
        //     if (!frozonKeys.includes(k)) {
        //         t[k] = form[k]
        //     }
        // })
        // 还需要更新 updated_time
        t.ut = Date.now()
        // 保存之后就可以将更新之后的 todo 写入到数据库中了
        t.save()
        return t
    }

    static complete(id, completed) {
        const t = Todo.get(id)
        t.completed = completed
        t.save()
        return t
    }
}

// 把 Model 提取出来之后, 就可以方便地对 model 进行测试
const testAdd = () => {
    const form = {
        title: '打豆豆',
    }
    const t = Todo.create(form)
    t.save()
}

const testDelete = () => {
    const form = {
        title: 'water',
        id: 0,
    }
    const t = Todo.create(form)
    t.remove(form.id)
}

const testUpdate = () => {
    const form = {
        title: '睡觉',
        id: 1,
    }
    const t = Todo.findOne('id', form.id)
    t.title = form.title
    t.completed = false
    t.save()
}

const test = () => {
    // testAdd()
    // testDelete()
    testUpdate()
}

if (require.main === module) {
    test()
}

module.exports = Todo