const { addBook, getBooks, getABook, editBook, deleteBook } = require('./handler')

function getFinalRespons(req, h, handler) {
    const result = handler(req)
    const codeStatus = result.codeStatus

    const res = h.response(result)
    res.code(codeStatus)
    return res
}

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: (req, h) => {
            return getFinalRespons(req, h, addBook)
        }
    },
    {
        method: 'GET',
        path: '/books',
        handler: (req, h) => {
            return getFinalRespons(req, h, getBooks)
        }
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: (req, h) => {
            return getFinalRespons(req, h, getABook)
        }
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: (req, h) => {
            return getFinalRespons(req, h, editBook)
        }
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: (req, h) => {
            return getFinalRespons(req, h, deleteBook)
        }
    }
]

module.exports = routes