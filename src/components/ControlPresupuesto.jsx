import { useState, useEffect } from "react"

const ControlPresupuesto = ({presupuesto, gastos}) => {

    const formatearCantidad = (cantidad) => {

        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) =>{
            return gasto.cantidad + total
        }, 0)

        setDisponible(presupuesto - totalGastado)

        
        setGastado(totalGastado)
    }, [gastos])



  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <p>Grafica aqui</p>
        </div>
        <div className="contenido-presupuesto">
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>

            <p>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>

            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
      
    </div>
  )
}

export default ControlPresupuesto

