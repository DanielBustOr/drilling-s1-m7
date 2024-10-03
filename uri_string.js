const {Pool, Client} = require('pg')

//URI de conexión STRING
const  connectionString = 'postgresql://user_evaluacion:password_evaluacion@localhost:5432/db_evaluacion'

//Instancia Cliente y  Pool

const cliente = new Client({
    connectionString,
})

const pool =  new Pool({
    connectionString
})

//Conexión mediante Client y Pool

cliente.connect()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.log('Error de conexión', err.stack))
    .finally(() => cliente.end())

pool.connect()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err  => console.error('Error de conexión', err.stack))
    .finally(() => pool.end()); //Cierra el Pool

