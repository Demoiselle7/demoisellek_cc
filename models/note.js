const Model = require('./main')

class Note extends Model {
    constructor(form={}) {
        super()
        this.id = form.id
        this.title = form.title || ''
        this.ct = Date.now()
        this.ut = this.ct
    }

    static update(form={}) {
        const id = Number(form.id)
        const m = this.get(id)
        const keys = this.frozenKeys()
        Object.keys(form).forEach((k) => {
            if (!keys.includes(k)) {
                m[k] = form[k]
            }
        })
        m.ut = Date.now()
        m.save()
        return m
    }

    static frozenKeys() {
        const l = [
            'id',
            'ct',
        ]
        return l
    }
}

module.exports = Note
