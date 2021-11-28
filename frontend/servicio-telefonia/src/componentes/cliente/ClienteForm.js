import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

var clientep ={
    id: 1,
    nombre: 'Pedro Palomino',
    direccion: 'Av. Crespo 1072',
    sexo: 'Masculino',
    edad: 26,
    fecha_ingreso: '16/06/1996',
    activo: 'True'
}

export default function ClienteForm(){
    const history = useHistory()
    const { id } = useParams()
    const [cliente, setCliente] = useState({
        id: '',
        nombre: '',
        direccion: '',
        sexo: '',
        edad: '',
        fecha_ingreso: '',
        activo: '',
    })

    const sexos = [
        '',
        'm',
        'f'
    ]

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/clientes/${id}`)
                .then(response => setCliente(response.data))
                .catch(error => alert(error))
        }
        // setCliente(clientep)
    }, [])

    function handleOnChange(event, campo) {
        setCliente({
            ...cliente,
            [campo]: event.target.value
        })
    }

    function guardar(event) {

        event.preventDefault()
        event.stopPropagation()
        if (id) {
            axios.put(`http://localhost:5000/clientes/${id}`, cliente)
                .then(response => {
                    alert("se ha modificado el registro")
                    history.push("/clientes/")
                })
                .catch(error => alert(error))
        }
        else {
            console.log(cliente)
            axios.post("http://localhost:5000/clientes/", cliente)
                .then(response => {
                    alert("se ha agregado el registro")
                    history.push("/clientes/")
                }).catch(error => alert(error))
        }
    }

    return(
        <>
            <div className="container bg-white py-3">
                {!id && <h1>Nuevo cliente</h1>}
                <form onSubmit={(event) => guardar(event)}>
                    {id && 
                        <div className="row justify-content-center">
                            <div class="text-center col-4 alert alert-danger" role="alert">
                                Cuidado está editando un cliente!
                            </div>
                        </div>
                    }
                    <div className="form-row">
                        <div className="col-1 text-center align-self-center">
                            <label>Nombre</label>
                        </div>
                        <div className="col-4">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={cliente.nombre} 
                            onChange={(event) => handleOnChange(event, 'nombre')} 
                            placeholder="Nombre"/>
                        </div>
                        <div className="col-1 text-center align-self-center">
                            Sexo
                        </div>
                        <div className="col-2">
                            <select 
                                key={0} 
                                value={cliente.sexo} 
                                className="form-control" 
                                aria-label=".form-select-lg example" 
                                onChange={(event) => {handleOnChange(event, 'sexo') }}>
                                {sexos.map(item => (
                                    <option key={item} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-1 text-center align-self-center">
                            <label>Edad</label>
                        </div>
                        <div className="col-1">
                            <input 
                                type="number" 
                                className="form-control text-center" 
                                value={cliente.edad} onChange={(event) => handleOnChange(event, 'edad')} />
                        </div>
                    </div>
                    <div className="form-row mt-3">
                        <div className="col-1 text-center align-self-center">
                            <label>Dirección</label>
                        </div>
                        <input 
                            type="text" 
                            className="form-control col-4" 
                            value={cliente.direccion} 
                            onChange={(event) => handleOnChange(event, 'direccion')} />
                        <div className="col-2"></div>
                        <div className="col-4 justify-content-end">
                            <button type="submit" className="btn btn-primary mr-2">Aceptar</button>
                            <button onClick={() => history.push("/clientes/")} className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                        
                    <div className="form-row mt-3">
                        <div className="col-1 text-center align-self-center">
                            <label>Fecha de ingreso</label>
                        </div>
                        {id &&
                            <input 
                                className="form-control col-2"
                                type="date"
                                min="2018-01-01" 
                                max="2023-12-31" 
                                value={cliente.fecha_ingreso}
                                onChange={(event) => handleOnChange(event, 'fecha_ingreso')}
                                disabled>
                            </input>
                        }
                        {!id &&
                            <input 
                                className="form-control col-2"
                                type="date"
                                min="2018-01-01" 
                                max="2023-12-31" 
                                value={cliente.fecha_ingreso}
                                onChange={(event) => handleOnChange(event, 'fecha_ingreso')}
                                >
                            </input>
                        }
                    </div>      
                </form>
            </div>
        </>
    )
}