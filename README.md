# Reto Técnico: Procesamiento de Transacciones Bancarias (CLI)

    Este reto técnico fue realizado con NodeJS versón v20.9.0 y React 19.0.0.

## Introducción:

    Este proyecto consiste en una aplicación  que procesa un archivo CSV con transacciones bancarias. Con 
    el objetivo de mostrar el reporte de:

    - Balance final
    - Transacción de mayor monto
    - Conteo de transacciones por tipo

    Es un reto que simula una necesidad que se puede tener en un ambito de contabilidad donde se necesita 
    extraer datos de archivos planos y generar reportes atractivos para una mjeor toma de decciones.

## Instrucciones de Ejecución
    ## Ejecutar en bash
        git clone https://github.com/Richard3899/interbank-academy-25.git

    ## Raiz del proyecto
        npm install
        npm start

    ## Ir a la aplicación
        http://localhost:5173/

## Enfoque y Solución:

    Carga de archivos: Se utiliza multer para manejar la subida del archivo.

    Validaciones:   Se verifica que el archivo exista y sea de tipo text/csv. 
                    En caso de errores en el parsing, se responde con el código de error correspondiente.

    Conversión de datos: Se usa convert-csv-to-json para convertir el contenido del archivo CSV en un array de objetos JSON, 
                        lo que permite manipularlo fácilmente.

    Procesamiento de información:

        Se calcula el balance final sumando los montos de transacciones de tipo Crédito y restando los de tipo Débito.

        Se encuentra la transacción de mayor monto usando reduce, comparando los valores numéricos.

        Se cuenta el número de transacciones por tipo (Crédito y Débito) acumulando en un objeto.

    Respuesta : Se devuelve un objeto JSON que incluye el balance, la transacción de mayor valor y el conteo por tipo. 
    Esto permite que en la interfaz de  React lo muestre de forma amigable al usuario.

    Diseño: Se realizó algo simple, un input tipo file para cargar el archivo, un textarea para mostrar el resultado
            y un botón que envia el formulario al servidor para mostrar el resultado en el textarea.

## Estructura del Proyecto:

    Backend: El archivo principal es server.js, en el cual se encuentra toda la logica mencionada en el punto anterior 
            y se encuentra en la raiz de la carpeta backend.

    Frontend: El archivo principal es App.jsx, aqui se muestra el diseño y la logica para el envio del formualrio al servidor,
             y se encuentra en la carpeta Frontend dentro de la carpeta src.

    Rutas: /backend/server.js
            /frontend/src/App.jsx