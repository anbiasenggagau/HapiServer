const Hapi = require('@hapi/hapi')
const { routes } = require('./routes')
const { addNote, getNote, editNote, deleteNote, getAllNote } = require('./handler');

const init = async () => {

    // Inisialisasi konfigurasi server menggunakan HAPI
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
    // console.log(process.env.NODE_ENV)

    // Menentukan routes berdasarkan array yang dipanggil di file lain
    server.route(routes)

    // server.route([])

}

init();