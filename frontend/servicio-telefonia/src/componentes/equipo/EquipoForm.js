import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EquipoForm(){
    const history = useHistory()
    const { imei } = useParams()
    const [equipo, setEquipo] = useState({
        imei: '',
        marca: '',
        modelo: '',
        estado: '',
        fecha_ingreso: '',
        activo: '',
    })
    const estados = [
        {
            op: 0,
            estado: ''
        },
        {
            op: 1,
            estado: 'preventa',
        },
        {
            op: 2,
            estado: 'en sucursal',
        },
        {
            op: 3,
            estado: 'vendido',
        },
        {
            op: 4,
            estado: 'descompuesto',
        }
    ]

    useEffect(() => {
        if (imei) {
            axios.get(`http://localhost:5000/equipos/${imei}`)
                .then(response => setEquipo(response.data))
                .catch(error => alert(error))
        }
    }, [])

    function handleOnChange(event, campo) {
        setEquipo({
            ...equipo,
            [campo]: event.target.value
        })
    }

    function guardar(event) {

        event.preventDefault()
        event.stopPropagation()
        if (imei) {
            axios.put(`http://localhost:5000/equipos/${imei}`, equipo)
                .then(response => {
                    alert("se ha modificado el registro")
                    history.push("/equipos/")
                })
                .catch(error => alert(error))
        }
        else {
            axios.post("http://localhost:5000/equipos/", equipo)
                .then(response => {
                    alert("se ha agregado el registro")
                    history.push("/equipos/")
                }).catch(error => alert(error))
        }
    }

    return(
        <>
            <div className="container bg-white p-3">

                {imei && <h1>Editando equipo</h1>}
                {!imei && <h1>Nuevo equipo</h1>}
                <form onSubmit={(event) => guardar(event)}>
                    <div className="form-row">
                        <label className="col-2 align-self-center">Marca</label>
                        <input type="text" className="form-control col-2" value={equipo.marca} onChange={(event) => handleOnChange(event, 'marca')} />
                        <label className="col-1 text-center align-self-center">Modelo</label>
                        <input type="text" className="form-control col-2" value={equipo.modelo} onChange={(event) => handleOnChange(event, 'modelo')} />
                        <label className="col-1 text-center align-self-center">Estado</label>
                        <select 
                            key={0} 
                            value={equipo.estado} 
                            className="form-control col-2" 
                            aria-label=".form-select-lg example" 
                            onChange={(event) => {handleOnChange(event, 'estado') }}>
                            {estados.map(item => (
                                <option key={item.op} value={item.estado}>{item.estado}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-row my-3">
                        <label className="col-2 align-self-center">Fecha de Ingreso</label>
                        {/* <input type="text" className="form-control col-2" value={equipo.fecha_ingreso} onChange={(event) => handleOnChange(event, 'fecha_ingreso')} /> */}
                        
                            <input 
                                className="form-control col-2"
                                type="date"
                                min="2018-01-01" 
                                max="2023-12-31" 
                                value={equipo.fecha_ingreso}
                                onChange={(event) => handleOnChange(event, 'fecha_ingreso')}
                                >
                            </input>
                        
                        <div className="col-2"></div>
                        <div className="col-4">
                            <button type="submit" className="btn btn-primary mr-2">Aceptar</button>
                            <button onClick={() => history.push("/equipos/")} className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}