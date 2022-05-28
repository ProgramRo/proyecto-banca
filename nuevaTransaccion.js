const args = process.argv.slice(2)

const descripcion = args[1]
const fecha = args[2]
const monto = args[3]
const cuenta = args[4]

const nuevaTransaccion = async (client, release, pool) => {
    try {
        const queryAgregar = {
            text: 'INSERT INTO transacciones(descripcion, fecha, monto, cuenta) VALUES ($1, $2, $3, $4) RETURNING *',
            values: [descripcion, fecha, monto, cuenta],
        }
        const queryActualizar = {
            text: 'UPDATE cuentas SET saldo = saldo - $1 WHERE id = $2 RETURNING *', 
            values: [monto, cuenta]
        }
        
        await client.query('BEGIN')
        await client.query(queryAgregar, (errorConsulta, res) => {
            if (errorConsulta) {
                console.error(errorConsulta.code)
            } else {
                console.log('La transacción que desea registrar es la siguiente:', res.rows)
            }
        })
        await client.query(queryActualizar, (errorConsulta, res) => {
            if (errorConsulta) {
                console.error('Ha ocurrido un error! Revise el siguiente código:', errorConsulta.code)
            } else {
                console.log(res.rows)
            }
        })
        await client.query('COMMIT')



    } catch (error) {
        await client.query('ROLLBACK')
        console.log(`Error código: ${error.code}`)
        console.log(`Detalle del error: ${error.detail}`)
        console.log(`Tabla originaria del error: ${error.table}`)
        console.log(`Restricción violada en el campo: ${error.constraint}`)

    }
    release();
    pool.end();
}

module.exports = nuevaTransaccion