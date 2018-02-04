const fs = require('fs')
const { MongoClient } = require('mongodb')
const { mongodbName } = require('./config')

const log = console.log.bind(console)

const monguaDb = async () => {
    const url = `mongodb://localhost:27017/${mongodbName}`
    const db = await MongoClient.connect(url)
    return db
}

const nextId = async (name) => {
    const query = {
        name: name,
    }
    const update = {
        $inc: {
            seq: 1,
        }
    }
    const options = {
        upsert: true,
        returnOriginal: false,
    }
    const db = await monguaDb()
    const doc = db.collection('data_id')
    const d = await doc.findOneAndUpdate(query, update, options)
    const newId = d.value.seq
    log('debug new id', newId)
    return newId
}


const ensureExists = (path) => {
    if (!fs.existsSync(path)) {
        const data = '[]'
        fs.writeFileSync(path, data)
    }
}

const save = (data, path) => {
    const s = JSON.stringify(data, null, 2)
    fs.writeFileSync(path, s)
}

const load = (path) => {
    const options = {
        encoding: 'utf8',
    }
    ensureExists(path)
    const s = fs.readFileSync(path, options)
    const data = JSON.parse(s)
    return data
}

class Model {
    static _fields() {
        const f = [
            '_id',
            // [字段名, 类型, 值]
            ['id', Number, -1],
            ['type', String, ''],
            ['deleted', Boolean, false],
            ['created_time', Number, 0],
            ['updated_time', Number, 0],
        ]
        return f
    }

    static has(query) {
        return this.findOne(query) !== null
    }

    async mongos(name) {
        return await monguaDb().collection(name).find()
    }

    toString() {
        const s = JSON.stringify(this, null, 2)
        return s
    }

    static async create(form={}, query={}) {
        const name = this.name.toLowerCase()
        const m = new this()
        const fields = this._fields().slice()
        const index = fields.indexOf('_id')
        if (index > -1) {
            fields.splice(index, 1)
        }

        log('debug fields after splice', fields)
        for (let f of fields) {
            const [k, t, v] = f
            log('debug k t v', k, t, v, k in form, form, form[k])
            if (k in form) {
                m[k] = t(form[k])
            } else {
                m[k] = v
            }
        }
        // 处理额外的参数 query
        // log('debug query', query)
        Object.keys(query).forEach((k) => {
            log('debug k', k)
            const v = query[k]
            if (k in m) {
                m[k] = v
            } else {
                throw 'KeyError'
            }
        })

        // 写入默认数据
        m.id = await nextId(name)
        const ts = Date.now()
        m.created_time = ts
        m.updated_time = ts
        m.deleted = false
        m.type = name
        await m.save()
        return m
    }

    static _new_from_bson(bson) {
        const m = new this()
        Object.keys(bson).forEach((k) => {
            const v = bson[k]
            m[k] = v
        })
        m.type = this.name.toLowerCase()
        return m
    }

    static all() {
        const name = this.name.toLowerCase()
        const ds = monguaDb().collection(name).find().toArray()
        const l = ds.map((d) => {
            return this._new_from_bson(d)
        })
        return l
    }

    static async find(query) {
        const name = this.name.toLowerCase()
        let sortKey = null
        if ('__sort_key' in query) {
            sortKey = query['__sort_key']
            delete query['__sort_key']
        }
        const db = await monguaDb()
        let ds = await db.collection(name).find(query).toArray()
        if (sortKey !== null) {
            ds = ds.sort(sortKey)
        }
        const l = ds.map((d) => {
            return this._new_from_bson(d)
        })
        return l
    }

    static async get(id) {
        const r = await this.findOne({
            id: id,
        })
        return r
    }

    static async findOne(query) {
        const l = await this.find(query)
        log('debug l.length', l.length, l[0])
        if (l.length > 0) {
            return l[0]
        } else {
            return null
        }
    }

    async save() {
        this.updated_time = Date.now()
        const name = this.constructor.name.toLowerCase()
        const db = await monguaDb()

        // console.log('debug this', this)
        const r = await db.collection(name).save(this)
        return r
    }

    async remove() {
        this.deleted = true
        await this.save()
    }

    // static dbPath() {
    //     const classname = this.name.toLowerCase()
    //     const path = require('path')
    //     const filename = `${classname}.txt`
    //     const p = path.join(__dirname, '../db', filename)
    //     return p
    // }
    //
    // static _newFromDict(dict) {
    //     const cls = this
    //     const m = new cls(dict)
    //     return m
    // }
    //
    // static all() {
    //     const path = this.dbPath()
    //     const models = load(path)
    //     const ms = models.map((m) => {
    //         const cls = this
    //         // 之前的写法是
    //         // const instance = cls.create(m)
    //         // 这样的话会出现递归调用的情况
    //         // 因为 create 里会调用 save 方法, save 方法里又会调用 all 方法
    //         // 即 all -> create -> save -> all
    //         // 为了避免这种情况, 用一个新方法来生成实例
    //         const instance = cls._newFromDict(m)
    //         return instance
    //     })
    //     return ms
    // }
    //
    // static create(form={}) {
    //     const cls = this
    //     const instance = new cls(form)
    //     log('log create', instance)
    //     // instance.save()
    //     return instance
    // }
    //
    // static findOne(key, value) {
    //     const all = this.all()
    //     let m = all.find((e) => {
    //         return e[key] === value
    //     })
    //
    //     if (m === undefined) {
    //         m = null
    //     }
    //
    //     return m
    // }
    //
    // static find(key, value) {
    //     const all = this.all()
    //     const models = all.filter((m) => {
    //         return m[key] === value
    //     })
    //     return models
    // }
    //
    // static get(id) {
    //     return this.findOne('id', id)
    // }

    // save() {
    //     const cls = this.constructor
    //     const models = cls.all()
    //     if (this.id === undefined) {
    //         if (models.length > 0) {
    //             const last = models[models.length - 1]
    //             this.id = last.id + 1
    //         } else {
    //             // 0 在 js 中会被处理成 false, 第一个元素的 id 设置为 1, 方便处理
    //             this.id = 1
    //         }
    //         models.push(this)
    //     } else {
    //         const index = models.findIndex((e) => {
    //             return e.id === this.id
    //         })
    //         if (index > -1) {
    //             models[index] = this
    //         }
    //     }
    //     const path = cls.dbPath()
    //     console.log('debug path', path)
    //     // save(models, path)
    // }

    // async save() {
    //     const name = this.constructor.name.toLowerCase()
    //     const db = await configuredDb()
    //     const form = {
    //         username: 'gua',
    //     }
    //     await db.collection(name).save(form)
    //     // const s = JSON.stringify(this)
    //     // log('debug name', name, this, s, JSON.parse(s))
    // }
    //
    // static remove(id) {
    //     const cls = this
    //     const models = cls.all()
    //     const index = models.findIndex((e) => {
    //         return e.id === id
    //     })
    //     if (index > -1) {
    //         models.splice(index, 1)
    //     }
    //     const path = cls.dbPath()
    //     save(models, path)
    //     return
    // }
    //
    // toString() {
    //     const s = JSON.stringify(this, null, 2)
    //     return s
    // }
}

class User extends Model {
    static _fields() {
        const p = Model._fields()
        const f = [
            ['username', String, ''],
            ['password', String, ''],
        ]
        const l = p.concat(f)
        return l
    }
}

const test = async () => {
    const form = {
        username: 'lin',
        password: '123',
    }
    const u = await User.findOne(form)
    u.username = 'gua'
    await u.save()
}

if (require.main === module) {
    test().catch((e) => {
        log('debug error', e)
    })
}

module.exports = Model