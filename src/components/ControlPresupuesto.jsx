import { useState, useEffect, isValidElement } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto}) => {

    const formatearCantidad = (cantidad) => {

        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('Deseas reiniciar el presupuesto y los gastos?')

        if(resultado){
            setGastos([])
            setPresupuesto([])
            setIsValidPresupuesto(false)
        }
    }

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)
 
    useEffect(() => {

    
        const totalGastado = gastos.reduce( (total, gasto) => gasto.monto + total, 0)

        const totalDisponible = presupuesto - totalGastado

        const porcentajeGastado = (totalGastado * 100 / presupuesto).toFixed(2)


        setDisponible(totalDisponible)

        setGastado(totalGastado)
        setTimeout(() => {
            setPorcentaje(porcentajeGastado)
        },500)
    }, [gastos])



  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
                value = {porcentaje}
                styles = {buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    trailColor: '#F5F5F5',

                })}
                text={`${porcentaje}% gastado`}
                
            />
        </div>
        <div className="contenido-presupuesto">
            < button className="reset-app" type="button" onClick={handleResetApp}>
                Resetear App</button>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>

            <p className={`${disponible < 0 ?'negativo' : ''} `}>
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

