const { nanoid } = require('nanoid')
const books = [
    {
        "id": "Qbax5Oy7L8WKf74l",
        "name": "Buku A",
        "year": 2010,
        "author": "John Doe",
        "summary": "Lorem ipsum dolor sit amet",
        "publisher": "Dicoding Indonesia",
        "pageCount": 100,
        "readPage": 25,
        "finished": false,
        "reading": false,
        "insertedAt": "2021-03-04T09:11:44.598Z",
        "updatedAt": "2021-03-04T09:11:44.598Z"
    }
]

books.splice(0, 1)

function addBook(req) {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;

    if (readPage > pageCount) return {
        codeStatus: 400,
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    }

    if (name == undefined) return {
        codeStatus: 400,
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku'
    }
    const finished = pageCount === readPage
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    try {
        const newBook = {
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            id,
            insertedAt,
            updatedAt,
            finished
        };
        books.push(newBook);

        return {
            codeStatus: 201,
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            }
        }
    } catch (error) {
        return {
            codeStatus: 500,
            status: "error",
            message: "Buku gagal ditambahkan"
        }
    }
}

function getBooks(req) {
    try {
        let copyBook = []

        const { name, reading, finished } = req.query

        if (name != undefined) copyBook = books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()))
        if (reading != undefined) copyBook = books.filter(book => book.reading == reading)
        if (finished != undefined) copyBook = books.filter(book => book.finished == finished)
        if (name == undefined && reading == undefined && finished == undefined) copyBook = [...books]

        const finalResult = []

        for (let i = 0; i < copyBook.length; i++) {

            const book = {
                id: copyBook[i].id,
                name: copyBook[i].name,
                publisher: copyBook[i].publisher
            }

            finalResult.push(book)
        }

        return {
            codeStatus: 200,
            status: 'success',
            data: {
                books: finalResult
            }
        }
    } catch (error) {
        return {
            codeStatus: 500,
            status: 'error',
            message: 'Gagal memuat buku'
        }
    }
}

function getABook(req) {
    try {
        const { bookId } = req.params
        const book = books.find(book => book.id == bookId)

        if (book != undefined) {
            return {
                codeStatus: 200,
                status: 'success',
                data: {
                    book: book
                }
            }
        }
        else {
            return {
                codeStatus: 404,
                status: 'fail',
                message: 'Buku tidak ditemukan'
            }
        }
    } catch (error) {
        return {
            codeStatus: 500,
            status: 'error',
            message: 'Gagal memuat buku'
        }
    }
}

function editBook(req) {
    try {
        const { bookId } = req.params
        const idx = books.findIndex(book => book.id == bookId)

        if (idx == -1) {
            return {
                codeStatus: 404,
                status: 'fail',
                message: 'Gagal memperbarui buku. Id tidak ditemukan'
            }
        }

        const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;
        const updatedAt = new Date().toISOString();

        if (readPage > pageCount) return {
            codeStatus: 400,
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        }

        if (name == undefined) return {
            codeStatus: 400,
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        }

        books[idx] = {
            ...books[idx],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt
        }

        return {
            codeStatus: 200,
            status: 'success',
            message: 'Buku berhasil diperbarui'
        }
    } catch (error) {
        return {
            codeStatus: 500,
            status: 'error',
            message: 'Gagal memuat buku'
        }
    }
}

function deleteBook(req) {
    try {
        const { bookId } = req.params
        const idx = books.findIndex(book => book.id == bookId)

        if (idx == -1) {
            return {
                codeStatus: 404,
                status: 'fail',
                message: 'Buku gagal dihapus. Id tidak ditemukan'
            }
        }

        books.splice(idx, 1)

        return {
            codeStatus: 200,
            status: 'success',
            message: 'Buku berhasil dihapus'
        }
    } catch (error) {
        return {
            codeStatus: 500,
            status: 'error',
            message: 'Gagal memuat buku'
        }
    }
}

module.exports = { addBook, getBooks, getABook, editBook, deleteBook }