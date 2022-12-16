const { addNote, editNote, deleteNote, getNote, getAllNote } = require('./handler')

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: (req, h) => {

            const result = addNote(req)

            if (result) {
                const res = h.response({
                    status: 'success',
                    message: 'Catatan berhasil diperbarui',
                    data: {
                        noteid: result
                    }
                })

                res.code(201)
                return res
            }
            else {
                const res = h.response({
                    status: 'fail',
                    message: 'Gagal menambahkan note'
                })

                res.code(400)
                return res
            }
        }
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: (req, h) => {
            const { id } = req.params
            const result = editNote(id, req)

            if (result) {
                const res = h.response({
                    status: 'success',
                    messaage: 'Catatan berhasil diperbarui',
                })

                res.code(201)
                return res
            }
            else {
                const res = h.response({
                    status: 'fail',
                    message: 'Gagal memperbarui note'
                })

                res.code(400)
                return res
            }
        }
    },
    {
        method: 'GET',
        path: '/notes',
        handler: (req, h) => {
            const notes = getAllNote()

            if (notes.length > 0) {
                const res = h.response({
                    status: 'success',
                    data: {
                        notes,
                    }
                })

                res.code(200)
                return res
            }
            else {
                const res = h.response({
                    status: 'fail',
                    message: 'Not found'
                })

                res.code(404)
                return res
            }
        }
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: (req, h) => {
            const { id } = req.params

            const result = getNote(id)

            if (result) {
                const res = h.response({
                    status: 'success',
                    data: {
                        result
                    }
                })

                res.code(200)
                return res
            }
            else {
                const res = h.response({
                    status: 'fail',
                    message: 'Not found'
                })

                res.code(404)
                return res
            }
        }
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: (req, h) => {
            const { id } = req.params
            const result = deleteNote(id)

            if (result) {
                const res = h.response({
                    status: 'success',
                    message: 'Berhasil menghapus'
                })

                res.code(200)
                return res
            }
            else {
                const res = h.response({
                    status: 'fail',
                    message: 'Not found'
                })

                res.code(404)
                return res
            }
        }
    },
    {
        method: 'POST',
        path: '/note',
        handler: (request, h) => {
            addNote(request)

        }
    },
    {
        method: '*',
        path: '/',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method tersebut';
        },
    },
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Halaman Homepage';
        },
    },
    {
        method: 'GET',
        path: '/hello/{name}',
        handler: (req, h) => {
            const { name } = req.params
            const { lang } = req.query

            if (lang === 'ID') return `Hai ${name}`

            return `Hallo ${name}`
        }
    },
]

module.exports = { routes }