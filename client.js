const {Client} = require('pg')

const cliente =  new Client({
    user: 'user_evaluacion',
    host: 'localhost',
    database: 'db_evaluacion',
    password: 'password_evaluacion',
    port: 5432,
})

cliente.connect()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.log('Error de conexión', err.stack))
    .finally(() => cliente.end())


