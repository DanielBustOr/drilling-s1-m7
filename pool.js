const {Pool}  = require('pg');

const pool =  new Pool({
    user: 'user_evaluacion',
    host: 'localhost',
    database: 'db_evaluacion',
    password: 'password_evaluacion',
    port: 5432,
})

pool.connect()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err  => console.error('Error de conexión', err.stack))
    .finally(() => pool.end()); //Cierra el Pool
