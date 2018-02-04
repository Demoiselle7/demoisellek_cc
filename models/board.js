const Model = require('./main')

class Board extends Model {
    constructor(form = {}) {
        super()
        this.id = form.id
        this.title = form.title || ''
        const now = Date.now()
        this.ct = form.ct || now
        this.ut = form.ut || now
    }
}

module.exports = Board