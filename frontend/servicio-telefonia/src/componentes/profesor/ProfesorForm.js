import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

var profesores =[
    {
        id: 1,
        nombre: 'Santiago Antonini',
    },
    {
        id: 2,
        nombre: "Wenceslao Citera",
    },
]

export default function ProfesorForm(){
    const history = useHistory()
    const { id } = useParams()
    const [profesor, setProfesor] = useState({})

    useEffect(() => {
        // if (id) {
        //     axios.get(`http://localhost:5000/profesores/${id}`)
        //         .then(response => setProfesor(response.data))
        //         .catch(error => alert(error))
        // }
        setProfesor(profesores[id])
    }, [])

    function handleOnChange(event, campo) {
        setProfesor({
            ...profesor,
            [campo]: event.target.value
        })
    }

    function guardar(event) {
        // event.preventDefault()
        // event.stopPropagation()
        // if (id) {
        //     axios.put(`http://localhost:5000/profesores/${id}`, profesor)
        //         .then(response => {
        //             alert("se ha modificado el registro")
        //             history.push("/profesores/")
        //         })
        //         .catch(error => alert(error))
        // }
        // else {
        //     console.log(profesor)
        //     axios.post("http://localhost:5000/profesores/", profesor)
        //         .then(response => {
        //             alert("se ha agregado el registro")
        //             history.push("/profesores/")
        //         }).catch(error => alert(error))
        // }
    }

    return(
        <>
            <div className="container bg-white py-3">
                {!id && <h1>Nuevo profesor</h1>}
                <form onSubmit={(event) => guardar(event)}>
                    {id && 
                        <div className="row justify-content-center">
                            <div class="text-center col-4 alert alert-danger" role="alert">
                                Cuidado está editando un profesor!
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
                            value={profesor.nombre} 
                            onChange={(event) => handleOnChange(event, 'nombre')} 
                            placeholder="Nombre"/>
                        </div>
                        <div className="col-1 text-center align-self-center">
                            Sexo
                        </div>
                        <div className="col-2">
                            <select 
                                key={0} 
                                value={profesor.sexo} 
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
                                value={profesor.edad} onChange={(event) => handleOnChange(event, 'edad')} />
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
                                value={profesor.fecha_ingreso}
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
                                value={profesor.fecha_ingreso}
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