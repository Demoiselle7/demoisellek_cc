const Model = require('./main')
const crypto = require('crypto')

class User extends Model {
    constructor(form={}) {
        super()
        this.id = form.id
        this.username = form.username || ''
        this.password = form.password || ''
        this.note = form.note || ''
    }

    static create(form={}) {
        form.password = this.saltedPassword(form.password)
        console.log('debug form', form)
        const u = super.create(form)
        u.save()
        return u
    }

    static saltedPassword(password, salt='node8') {
        function _sha1(s) {
            const algorithm = 'sha1'
            const hash = crypto.createHash(algorithm)
            hash.update(s)
            const h = hash.digest('hex')
            return h
        }
        const hash1 = _sha1(password)
        const hash2 = _sha1(hash1 + salt)
        return hash2
    }

    validateAuth(form) {
        const cls = this.constructor
        const { username, password } = form
        const pwd = cls.saltedPassword(password)
        const usernameEquals = this.username === username
        const passwordEquals = this.password === pwd
        return usernameEquals && passwordEquals
    }

    static login(form={}) {
        const { username, password } = form
        const pwd = this.saltedPassword(password)
        const u = User.findOne('username', username)
        return u !== null && u.password === pwd
    }

    static register(form={}) {
        const { username, password } = form
        const validForm = username.length > 2 && password.length > 2
        const uniqueUser = User.findOne('username', username) === null
        if (validForm && uniqueUser) {
            const u = this.create(form)
            u.save()
            return u
        } else {
            return null
        }
    }
}

const test = () => {
    // const u1 = User.findBy('username', 'gua')
    // const u2 = User.findBy({
    //     username: 'gua',
    // })
    // console.log('debug u1', u1)
    // console.log('debug u2', u2)
    const form = {
        username: 'lin',
        password: '12345',
        note: 'py',
    }
    const u = User.login(form)
    console.log('debug u', u)
}

// 当 nodejs 直接运行一个文件时, require.main 会被设为它的 module
// 所以可以通过如下检测确定一个文件是否直接运行
if (require.main === module) {
    test()
}

module.exports = User