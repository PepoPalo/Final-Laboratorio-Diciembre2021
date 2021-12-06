import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router";

export default function ProfesorForm() {
    const [profesor, setCliente] = useState({
        id: null,
        cuit: '',
        nombre: '',
        direccion: '',
        telefono: '',
        localidad: ''
    });
    const [lista, setLista] = useState([
        {
            'id': 1,
            'cuit': '20390380071',
            'nombre': 'Pedro Palomino',
            'direccion': 'Av Crespo 1072',
            'telefono': '3435182886',
            'localidad': 'San Benito'
        },
        {
            'id': 2,
            'cuit': '20320180231',
            'nombre': 'Oscar Schneider',
            'direccion': '25 de mayo 1072',
            'telefono': '3434172899',
            'localidad': 'San Agustín'
        },
        {
            'id': 3,
            'cuit': '20290382171',
            'nombre': 'Juan Pastor',
            'direccion': 'Av Ramirez 1072',
            'telefono': '3435120126',
            'localidad': 'Paraná'
        }
    ]);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        GetCliente();
    }, [])

    function GetCliente() {
        let ids = lista.map(profesor => profesor.id);
        setCliente(lista[ids.indexOf(parseInt(id))]);
    }

    function guardar(event) {

        event.preventDefault()
        event.stopPropagation()
        /*if (id) {
            axios.put(`http://localhost:5000/profesores/${id}`, profesor)
                .then(response => {
                    alert("se ha modificado el registro")
                    history.push("/profesores/")
                })
                .catch(error => alert(error))
        }
        else {
            axios.post("http://localhost:5000/profesores/", profesor)
                .then(response => {
                    alert("se ha agregado el registro")
                    history.push("/profesores/")
                }).catch(error => alert(error))
        }*/
    }

    function handleOnChange(event, campo) {
        setCliente({
            ...profesor,
            [campo]: event.target.value
        })
    }

    return(
        <>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item"><a href="#">Profesores</a></li>
                <li class="breadcrumb-item active" aria-current="page">{profesor.nombre}(Editando)</li>
            </ol>
        </nav>
        <div className="container card my-3">
            <div className="card-body">
                <form onSubmit={(event) => guardar(event)}>
                    <div className="row">
                        <div className="col-5">
                            <label className="col-12 text-left" htmlFor="id_nombre">Nombre:</label>
                            <input type="text" id="id_nombre" className="form-control mb-3 col-12"
                            value={profesor.nombre} onChange={(event) => handleOnChange(event, 'nombre')} 
                            placeholder="Nombre"/>
                        </div>
                        <div className="col-4">
                            <label className="col-12 text-left" htmlFor="id_titulo">Título:</label>
                            <input type="text" id="id_titulo" className="form-control col-12"
                            value={profesor.titulo} onChange={(event) => handleOnChange(event, 'titulo')} 
                            placeholder="Título"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <label className="col-12 text-left">Dirección:</label>
                            <input className="form-control col-12"
                            value={profesor.direccion} onChange={(event) => handleOnChange(event, 'direccion')} 
                            placeholder="Dirección"/>
                        </div>
                    </div>
                    <div className="row ml-2 mt-4 justify-content-start">
                            <button onClick={() => history.push("/profesores/")} className="btn btn-outline-secondary mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-card-list mr-1" viewBox="0 0 18 18">
                                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                    <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                                </svg>
                                Volver al listado
                            </button>
                            <button type="submit" className="btn btn-outline-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil mr-1" viewBox="0 0 16 16">
                                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                                </svg>
                                Guardar
                            </button>
                    </div>
                </form>
            </div>
        </div>
            
        </>
    )
}