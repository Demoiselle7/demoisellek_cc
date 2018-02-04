const crypto = require('crypto')

const Model = require('./main')
const { key } = require('../utils')

class Session extends Model {
    constructor(form={}) {
        super()
        this.key = key
        this.algorithm = 'aes-256-cbc'
        this.input = 'utf8'
        this.output = 'hex'
        this.content = form
    }

    decrypt(c) {
        var decipher = crypto.createDecipher(this.algorithm, key)
        var d = decipher.update(c, this.output, this.input)
        d += decipher.final(this.input)
        const r = JSON.parse(d)
        return r
    }

    encrypt(form) {
        const s = JSON.stringify(form)
        const cipher = crypto.createCipher(this.algorithm, key)
        let c = cipher.update(s, this.input, this.output)
        c += cipher.final(this.output)
        return c
    }
}

const session = new Session()
// const form = {
//     uid: 1
// }
// const s = session.encrypt(form)
// console.log('debug s', s)
// const s = '95e173235c02a4a0a9d935f36b82a2fb'
// console.log(session.decrypt(s))

module.exports = session