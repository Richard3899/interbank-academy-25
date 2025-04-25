import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  // Estado para almacenar el archivo CSV
  const [fileCsv,setFile]= useState(null)
  // Estado para mostrar el resultado en el area de texto
  const [textArea,setTextArea] = useState('')

   // Función que se ejecuta al seleccionar un archivo
  const handleInputChange = (event)=>{
    setFile(event.target.files[0])
  }

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (event)=>{
    event.preventDefault()

    const formData = new FormData()
    formData.append('fileCsv',fileCsv)

    if(fileCsv){

      // Envío archivo al servidor mediante fetch con el método POST
      const res = await fetch(`http://localhost:3000/api/file`,{
        method:'POST',
        body: formData
      })

      // Resuelvo la promesa y asigno en variables los datos
      const jsonData = await res.json()
      const sumByType = jsonData.data.sumByType
      const highValue = jsonData.data.highValue
      const counterByType = jsonData.data.counterByType

      // Creo un texto para que se muestre los resultados de forma ordenada
      const textResult = `
      Reporte de Transacciones
      ---------------------------------------------
      Balance Final: ${(sumByType.Crédito-sumByType.Débito).toFixed(2)}
      Transacción de Mayor Monto: ID ${highValue.id} - ${highValue.monto}
      Conteo de Transacciones: Crédito:${counterByType.Crédito} Débito:${counterByType.Débito}`

      setTextArea(textResult)

    }

  }
  
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2>Cargar Archivo CSV</h2>
      <div className="card">
        <form method='post' onSubmit={handleSubmit}>
          <div style={{ marginBottom: '40px' }}>
            <input onChange={handleInputChange} name="fileCsv" type="file" accept=".csv" required />
          </div>
          <div style={{marginBottom:'20px'}}>
            <textarea rows={8} cols={60} value={textArea} readOnly style={{resize:'none'}}/>
          </div>
          <div>
            <button type='submit'>Cargar archivo</button>
          </div>
        </form>
      </div>

    </>
  )
}

export default App