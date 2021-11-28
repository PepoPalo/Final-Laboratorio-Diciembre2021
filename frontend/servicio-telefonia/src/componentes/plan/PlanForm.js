import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

export default function PlanForm(){
    const history = useHistory()
    const { id } = useParams()
    const [plan, setPlan] = useState({
        id: '',
        nombre: '',
        costo_por_mes: '',
        cant_llamadas: '',
        cant_mensajes: '',
        cant_gigas: '',
        tipo: '',
        estaActivo: '',
    })
    const tipos = [
        '',
        'prepago',
        'tarjeta'
    ]

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/planes/${id}`)
                .then(response => setPlan(response.data))
                .catch(error => alert(error))
        }
    }, [])

    function handleOnChange(event, campo) {
        setPlan({
            ...plan,
            [campo]: event.target.value
        })
    }

    function guardar(event) {

        event.preventDefault()
        event.stopPropagation()
        if (id) {
            axios.put(`http://localhost:5000/planes/${id}`, plan)
                .then(response => {
                    alert("se ha modificado el registro")
                    history.push("/planes/")
                })
                .catch(error => alert(error))
        }
        else {
            axios.post("http://localhost:5000/planes/", plan)
                .then(response => {
                    alert("se ha agregado el registro")
                    history.push("/planes/")
                }).catch(error => alert(error))
        }
    }

    return(
        <>
            <div className="container bg-white py-3">

                {id && <h1>Editando plan</h1>}
                {!id && <h1 className="text-center">Nuevo plan</h1>}
                <form onSubmit={(event) => guardar(event)}>
                    <div className="form-row">
                        <label className="col-2 align-self-center">Nombre</label>
                        
                        <input type="text" className="form-control col-2" value={plan.nombre} onChange={(event) => handleOnChange(event, 'nombre')} />
                        <label className="col-2 text-center align-self-center">Costo por mes $</label>
                        <input type="number" className="form-control col-2" value={plan.costo_por_mes} onChange={(event) => handleOnChange(event, 'costo_por_mes')} />
                        <label className="col-1 text-center align-self-center">Tipo</label>
                        <select 
                            key={0} 
                            value={plan.tipo} 
                            className="form-control col-2" 
                            aria-label=".form-select-lg example" 
                            onChange={(event) => {handleOnChange(event, 'tipo') }}>
                            {tipos.map(item => (
                                <option key={item} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-row mt-3">
                        <label className="col-2 align-self-center">Cantidad de llamadas</label>
                        <input type="number" className="form-control col-2" value={plan.cant_llamadas} onChange={(event) => handleOnChange(event, 'cant_llamadas')} />
                        <label className="col-2 text-center align-self-center">Cantidad de mensajes</label>
                        <input type="number" className="form-control col-2" value={plan.cant_mensajes} onChange={(event) => handleOnChange(event, 'cant_mensajes')} />
                    </div>
                    <div className="form-row mt-3">
                        <label className="col-2 align-self-center">Cantidad de gigas</label>
                        <input type="number" className="form-control col-2" value={plan.cant_gigas} onChange={(event) => handleOnChange(event, 'cant_gigas')} />
                        <div className="col-2"></div>
                        <div className="col-4 justify-content-end">
                            <button type="submit" className="btn btn-primary mr-2">Aceptar</button>
                            <button onClick={() => history.push("/planes/")} className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}