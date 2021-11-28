import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

var lineap = {
    id: 1,
    numero: '+543435182886',
    estado: 'activada',
    activo: 'True'
}

export default function LineaForm(){
    const history = useHistory()
    const { id } = useParams()
    const [linea, setLinea] = useState({
        id: '',
        numero: '',
        estado: '',
        activo: '',
    })
    const estados = [
        '',
        'Pendiente',
        'Activada',
        'Bloqueada'
    ]

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/lineas/${id}`)
                .then(response => setLinea(response.data))
                .catch(error => alert(error))
        }
    }, [])

    function handleOnChange(event, campo) {
        setLinea({
            ...linea,
            [campo]: event.target.value
        })
    }

    function guardar(event) {

        event.preventDefault()
        event.stopPropagation()
        if (id) {
            axios.put(`http://localhost:5000/lineas/${id}`, linea)
                .then(response => {
                    alert("se ha modificado el registro")
                    history.push("/lineas/")
                })
                .catch(error => alert(error))
        }
        else {
            axios.post("http://localhost:5000/lineas/", linea)
                .then(response => {
                    alert("se ha agregado el registro")
                    history.push("/lineas/")
                }).catch(error => alert(error))
        }
    }

    return(
        <>
            <div className="container bg-white  py-3">
                {!id && <h1>Nueva linea</h1>}
                <form onSubmit={(event) => guardar(event)}>
                    <div className="form-group">
                        {id &&
                            <div className="row justify-content-center">
                                <div class="text-center col-4 alert alert-danger" role="alert">
                                    Cuidado está editando una línea!
                                </div>
                            </div>
                        }
                        <div className="row justify-content-center">
                            <label className="mr-4">Número</label>
                            <input type="text" className="form-control col-2" value={linea.numero} onChange={(event) => handleOnChange(event, 'numero')} />
                        </div>
                        <div className="row justify-content-center m-4">
                            <label className="mr-4">Estado</label>
                            {/* <input type="text" className="form-control col-4" value={linea.estado} onChange={(event) => handleOnChange(event, 'estado')} /> */}
                            <select 
                                key={0} 
                                value={linea.estado} 
                                className="form-control col-2" 
                                aria-label=".form-select-lg example" 
                                onChange={(event) => {handleOnChange(event, 'estado') }}>
                                {estados.map(item => (
                                    <option key={item} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="row justify-content-center mt-4">
                            <button type="submit" className="btn btn-primary mr-2">Aceptar</button>
                            <button onClick={() => history.push("/lineas/")} className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
 
                </form>
            </div>
        </>
    )
}