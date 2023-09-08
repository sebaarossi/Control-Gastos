import {useState} from 'react'

import Mensaje from './Mensaje'

import CerrarBtn from '../img/cerrar.svg'




const Modal = ({setModal, animarModal, setAnimarModal,guardarGasto}) => {


    const [descripcion, setDescripcion] = useState('')
    const [monto, setMonto] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState('')

    const ocultarModal = () => {
        
        setAnimarModal(false)

        setTimeout(() => {
            setModal(false)
        }, 250)
    }

    const handleSubmit =(e) => {
        e.preventDefault()
    
        if([descripcion, monto, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            },3000)
            
            return
        }

        guardarGasto({descripcion, monto, categoria})
    }


  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img
                src={CerrarBtn}
                alt="Boton cerrar modal"
                onClick={ocultarModal}
            />
        </div>
        <form className={`formulario ${animarModal ? "animar" : "cerrar"}`}
            onSubmit={handleSubmit}>
            <legend>Nuevo Gasto</legend>

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className="campo">
                <label htmlFor='Descripción'>Descripción</label>
                <input
                    id="Descripción"
                    type="text"
                    placeholder='Añade la descripción del gasto'
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                ></input>

            </div>

            <div className="campo">
                <label htmlFor="monto">Monto</label>
                <input
                    id="monto"
                    type="number"
                    placeholder='Añade el monto del gasto'
                    value={monto}
                    onChange={e => setMonto(Number(e.target.value))}
                ></input>

            </div>

            <div className="campo">
                <label htmlFor="categoria">Categoría</label>

                <select id="categoria"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}>
                        <option value="">Seleccione</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="ocio">Ocio</option>
                        <option value="Suscripciones">Suscripciones</option>
                        <option value="Salud">Salud</option>
                        <option value="Gastos Varios">Gastos Varios</option>
                </select>

            </div>

            <input  type="submit" value="Añadir Gasto"></input>
        </form>


      
    </div>
  )
}

export default Modal
