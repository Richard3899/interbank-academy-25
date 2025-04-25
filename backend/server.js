// Importación de módulos
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import csvToJson from 'convert-csv-to-json'

// Inicia el express y define el puerto
const app = express()
const port = 3000

// Configuración multer para almacenar archivos
const storage= multer.memoryStorage()
const upload = multer({storage})

// Habilita CORS
app.use(cors())

// Ruta POST para recibir el archivo CSV
app.post('/api/file', upload.single('fileCsv'), async (req,res)=>{
    
    // Accede al archivo
    const fileCsv=req.file

    // Si no se envió archivo, responde con error
    if(!fileCsv){
        return res.status(400).json({message:"Archivo no encontrado."})
    }

    // Verifica tipo de archivo
    if(fileCsv.mimetype !== "text/csv"){
        return res.status(400).json({message:"El archivo no es de tupo csv."})
    }

    let dataJson = []

    try{
        // Convierte el buffer del archivo a string (UTF-8)
        const rawCsv = Buffer.from(fileCsv.buffer).toString('utf-8')
        // Parsea el CSV a JSON usando coma como delimitador de coma
        dataJson = csvToJson.fieldDelimiter(',').csvStringToJson(rawCsv)
     
    }catch(e){
        // Si ocurre un error al convertir
        res.status(500).json({message:'Error al parsear el archivo'})
    }

    // Suma por tipo
    const sumByType = dataJson.reduce((acum,item) => {
        const { tipo, monto } = item
        acum[tipo] = (acum[tipo] || 0) + parseFloat(monto)
        return acum
    }, {})

    // Buscar monto más alto
    const highValue = dataJson.reduce((max, actual) => {
        return actual.monto > max.monto ? actual : max;
    })
    // Contar por tipo   
    const counterByType = dataJson.reduce((acum,item) => {
        const { tipo } = item
        acum[tipo] = (acum[tipo] || 0) + 1
        return acum
    }, {})

    // Agrupa los resultados
    const data = {sumByType,highValue,counterByType}

    // Responde con los datos
    return res.status(200).json({data , message : 'El archiv se cargó correctamente'})
})

// Inicia el servidor
app.listen(port, ()=>{
    console.log(`Puerto : ${port} iniciado.`)
})