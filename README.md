## CUE: CONEXIÓN A UNA BASE DE DATOS

### **DRILLING: CONECTARSE A UNA BASE DE DATOS CON NODE-POSTGRESQL**

**Para resolver este ejercicio, anteriormente debe haber revisado la lectura y los videos del CUE: Conexión a una base de datos.**

**EJERCICIO:**

**Partiendo del ejercicio REBOUND EXERCISE - CUE 1, realice la conexión de la base de datos con node.js, ejecutando los siguientes pasos:**
1. Crear el directorio, e inicializar el proyecto con npm.
2. Instalación del paquete pg.
3. Crear una base de datos en PostgreSQL y el usuario de ésta.
4. Conectarse como cliente y como pool.
5. Conexión con un URI string.

## Solución. 
1. Crear el directorio e inicializar el proyecto con npm:
   - Con el comando `mkdir` creamos nuestro directorio `node-postgres` y nos ubicamos en él con `cd node-postgresql`. 
   - Luego ejecutamos `npm init -y` para inicializar el proyecto con npm. con la bandera `-y`, indicamos a npm que acepte todos los valores predeterminados para las preguntas que normalmente se harían durante la inicialización. 
  
2.  Instalación del paquete pg:
    -  Con el comando `npm install pg` instalamos el paquete pg, que es el paquete oficial de PostgreSQL para Node.js. Este paquete nos permite interactuar con la base de datos que posteriormente crearemos en PostgreSQL.
  
3.   Crear una base de datos en PostgreSQL y el usuario de ésta:

     - Crearemos nuestra base de datos y usuario en la terminal SQL shell (psql), y el  con los siguientes comandos:
  
        ```sql

        CREATE USER user_evaluacion WITH PASSWORD 'password_evaluacion';


        CREATE DATABASE db_evaluacion OWNER user_evaluacion;


        ```

     - Con la palabra reservada OWNER indicamos que el dueño de la base de datos db_evaluación será el usuario user_evaluación, con la contraseña contraseña_evaluación.
     - Nos conectamos a la base de datos con el siguiente  comando: `psql -d db_evaluacion -U user_evaluacion`

  
4.  Conectarse como cliente y como pool:
    - Crearemos el archivo `client.js`  para la conexión como cliente y el archivo `pool.js` para la conexión como pool.
    - En el archivo Client.js primero que nada importaremos el paquete `pg` : 
  
        ```js
        const {Client} = require('pg')

        ```
    -  Luego creamos una instancia del cliente con el siguiente comando: 
        ```js
        const cliente =  new Client({
            user: 'user_evaluacion',
            host: 'localhost',
            database: 'db_evaluacion',
            password: 'password_evaluacion',
            port: 5432,
        })
        ```
    -   Nos Conectamos como cliente a la base de datos con el siguiente comando: 
  
        ```js

        cliente.connect()
        .then(() => console.log('Conectado a la base de datos'))
        .catch((err) => console.log('Error de conexión', err.stack))
        .finally(() => cliente.end())
        
        ```
    - Explicación del código:
    
      - `cliente.connect()`: Este método intenta establecer una conexión con la base de datos. Devuelve una promesa que se resuelve si la conexión es exitosa o se rechaza en caso de error.

      - `.then(() => console.log('Conectado a la base de datos'))`: Se ejecuta si la conexión se establece correctamente, imprimiendo un mensaje de confirmación en la consola.

      - `.catch((err) => console.log('Error de conexión', err.stack))`: Captura y maneja cualquier error que ocurra durante el proceso de conexión, imprimiendo el error en la consola para facilitar la depuración.

      - `.finally(() => cliente.end())`: Este bloque se ejecuta siempre, independientemente del resultado de la conexión. Se utiliza para cerrar la conexión a la base de datos, liberando así recursos.

    - Para conectarse como pool, creamos el archivo `pool.js` e importamos el paquete pg, con el siguiente comando: 
  
        ```js

        const {Pool} =  require('pg')

        ```
    - Luego instanciamos el pool con  el siguiente comando: 
  
        ```js
        const pool =  new Pool({
            user: 'user_evaluacion',
            host: 'localhost',
            database: 'db_evaluacion',
            password: 'password_evaluacion',
            port: 5432,
        })
        ```
    - Finalmente nos conectamos de manera sencilla y a modo de ejemplo como Pool a la base de datos db_evaluacion con el siguiente comando: 
  
        ```js
        pool.connect()
        .then(() => console.log('Conectado a la base de datos'))
        .catch(err  => console.error('Error de conexión', err.stack))
        .finally(() => pool.end()); //Cierra el Pool
        ```
    - Desgloce del codigo: 
      - `pool.connect()`: Esta línea intenta establecer una conexión con la base de datos a través del pool. El pool gestiona varias conexiones a la base de datos, por lo que aquí estás pidiendo una conexión del pool.
      - `.then()`: Si la conexión es exitosa, esta función se ejecuta. En este caso, simplemente imprime el mensaje "Conectado a la base de datos" en la consola.
      - `.catch()`: Si hay un error al intentar conectarse, esta parte captura el error. Imprime un mensaje en la consola que dice "Error de conexión", seguido del error detallado (err.stack).
      - `.finally()`: Esta parte se ejecuta al final, independientemente de si la conexión fue exitosa o falló. La función pool.end() cierra el pool y todas las conexiones asociadas, lo que significa que no se aceptarán más conexiones.

5. Conexión con URI string. 

   -  Para conectarse a la base de datos utilizando una URI string, debemos importar el paquete pg y crear una conexión con la siguiente sintaxis:
  
        ```js
        const { Pool, Client } = require('pg');
        ```
    - Una cadena de conección (URI), es una forma compacta de definir todos los detalles necesarios para conectarse a una base de datos PostgreSQL. 
  
        ```js
        const  connectionString = 'postgresql://user_evaluacion:password_evaluacion@localhost:5432/db_evaluacion'
        ```
      - postgresql://: Esquema que indica que estás utilizando PostgreSQL. 
      - user_evaluacion: El nombre del usuario que se usará para conectarse a la base de datos.
      - password_evaluacion: La contraseña del usuario.
      - localhost: El host o dirección del servidor donde está corriendo la base de datos (en este caso, localmente).
      - 5432: El puerto en el que PostgreSQL está escuchando (por defecto, PostgreSQL usa el puerto 5432).  

    - Nos conectaremos a nuestra base de datos tanto como cliente y como Pool, para ello utilizaremos las dos instancias anteriores, pero utilizando la URI string para la conexión:
  
        ```js 
        const cliente = new Client({
         connectionString,
        })

        const pool =  new Pool({
            connectionString
        })
        ```

    - Finalmente nos conectamos de ambas formas a nuestra base de datos: 
  
        ```js
        cliente.connect()
            .then(() => console.log('Conectado a la base de datos'))
            .catch(err => console.log('Error de conexión', err.stack))
            .finally(() => cliente.end())

        pool.connect()
            .then(() => console.log('Conectado a la base de datos'))
            .catch(err  => console.error('Error de conexión', err.stack))
            .finally(() => pool.end()); //Cierra el Pool
        ```
6. Apuntes Finales

   - Conexión Simple: Se utiliza cuando la aplicación maneja un número bajo de peticiones concurrentes o cuando las conexiones a la base de datos no son frecuentes. Cada vez que haces una consulta, se establece y cierra una conexión nueva. Este enfoque es adecuado para aplicaciones pequeñas o con tráfico bajo, ya que no hay necesidad de reutilizar conexiones.

    - Pool de Conexiones: Es recomendable cuando tu aplicación maneja múltiples usuarios simultáneos o cuando se realizan muchas peticiones a la base de datos. El pool crea un conjunto de conexiones que se reutilizan para mejorar el rendimiento, evitando el costo de crear y cerrar una conexión cada vez. Esto es ideal para aplicaciones web o móviles con alto tráfico.

    - URI String: Se utiliza para simplificar la configuración de la conexión a la base de datos, combinando en una sola cadena los parámetros como el usuario, la contraseña, el host, el puerto y la base de datos. Esta forma de conexión es útil cuando se desea tener una única cadena que contenga toda la información de la conexión, lo que facilita la portabilidad y configuración del proyecto. Es especialmente práctico en entornos donde se deben manejar varias configuraciones de conexión, ya que puedes cambiar toda la información modificando solo una variable.

  







