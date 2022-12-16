const Hapi = require('@hapi/hapi')
const routes = require('./routes')

const environment = process.env.NODE_ENV
let host = environment == 'development' ? 'localhost' : '0.0.0.0'

const init = async () => {

    // Inisialisasi konfigurasi server menggunakan HAPI
    const server = Hapi.server({
        port: 5000,
        host: host,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);

    // Menentukan routes berdasarkan array yang dipanggil di file lain
    server.route(routes)
}

init();