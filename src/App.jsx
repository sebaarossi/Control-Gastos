import { useState, useEffect, useDebugValue } from 'react'

import Header from './components/header'
import Modal from './components/modal'
import ListadoGastos from './components/ListadoGastos'
import Filtros from './components/filtros'

import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarId } from './helpers'

function App() {
  
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState()

  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {

    if (Object.keys(gastoEditar).length > 0){
      handleEditarGasto()
    }

  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])


  useEffect(() => {
    const presupuestoLocalStorage = Number(localStorage.getItem('presupuesto')) ?? 0

    if(presupuestoLocalStorage > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos)) ?? []
  }, [gastos])


  useEffect(() => {
    if(filtro){
      const gasFiltrados = gastos.filter(gasto => gasto.categoria === filtro)

      setGastosFiltrados(gasFiltrados)
    }
  }, [filtro])


  const handleNuevoGasto = () => {

    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    },250)
  }

  const handleEditarGasto = () => {

    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    },250)

  }

  const guardarGasto = (gasto) =>{

    if(gasto.id){

      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})

    }else{
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false)

    setTimeout(() => {
        setModal(false)
    }, 250)
  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(gasto => id !== gasto.id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
      gastos = {gastos}
      setGastos = {setGastos}
      presupuesto = {presupuesto}
      setPresupuesto = {setPresupuesto}
      isValidPresupuesto = {isValidPresupuesto}
      setIsValidPresupuesto = {setIsValidPresupuesto}
      />

      {isValidPresupuesto ? (
        <>
          <main>
            <Filtros 
              filtro = {filtro}
              setFiltro = {setFiltro}
            />

            <ListadoGastos
              gastos = {gastos}
              setGastoEditar = {setGastoEditar}
              eliminarGasto = {eliminarGasto}
              filtro = {filtro}
              gastosFiltrados = {gastosFiltrados}
              
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
        gastoEditar = {gastoEditar}
        setGastoEditar = {setGastoEditar}
        />

      }
      
    </div>
  )
}

export default App
