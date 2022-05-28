// Se importa el módulo pg con clase Pool
const { Pool } = require('pg')

// Se importan módulos externos
const nuevaTransaccion = require('./nuevaTransaccion')
const consultaTransacciones = require('./consultaTransacciones')
const consultaSaldo = require('./consultaSaldo')

// Se importa el módulo externo pg-cursor
const Cursor = require('pg-cursor')

// Se obtienen los argumentos por línea de comando
const args = process.argv.slice(2)

// Se genera la constante que albergará los comandos a trabajar
const comando = args[0]

// Se genera la configuración de conexión
const config = {
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "banca_db",
    port: 5432,
}

const pool = new Pool(config)

// Se genera la conexión a la base de datos
pool.connect( async(errorConexion, client, release) => {
    if (errorConexion) {
        console.log(errorConexion)
    } else {
        if (comando === 'nueva') {
            nuevaTransaccion(client, release, pool)
        } else if (comando === 'consulta') {
            consultaTransacciones(client, release, pool)
        } else if (comando === 'saldo') {
            consultaSaldo(client, release, pool)
        }
    }
})