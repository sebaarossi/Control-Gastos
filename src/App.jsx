import { useState } from 'react'

import Header from './components/header'
import NuevoPresupuesto from './components/NuevoPresupuesto'
import Modal from './components/modal'
import ListadoGastos from './components/ListadoGastos'

import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarId } from './helpers'

function App() {
  
  const [presupuesto, setPresupuesto] = useState()
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState([])

  const handleNuevoGasto = () => {

    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    },250)
  }

  const guardarGasto = (gasto) =>{
    gasto.id = generarId()
    gasto.fecha = Date.now()
    setGastos([...gastos, gasto])

    setAnimarModal(false)

    setTimeout(() => {
        setModal(false)
    }, 250)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
      gastos = {gastos} 
      presupuesto = {presupuesto}
      setPresupuesto = {setPresupuesto}
      isValidPresupuesto = {isValidPresupuesto}
      setIsValidPresupuesto = {setIsValidPresupuesto}
      />

      {isValidPresupuesto ? (
        <>
          <main>
            <ListadoGastos
              gastos = {gastos}
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      ) : null
      }

      {modal &&
        <Modal 
        setModal = {setModal}
        animarModal = {animarModal}
        setAnimarModal = {setAnimarModal}
        guardarGasto = {guardarGasto}
        />

      }
      
    </div>
  )
}

export default App
