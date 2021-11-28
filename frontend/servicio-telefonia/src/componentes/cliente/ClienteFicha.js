import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';


export default function ClienteFicha(){
    const history = useHistory()
    const { id } = useParams()
    const [lista, setLista] = useState([])
    const [cliente, setCliente] = useState({
        id: '',
        nombre: '',
        direccion: '',
        sexo: '',
        edad: '',
        fecha_ingreso: '',
        activo: ''
    })

    const [equipos, setEquipos] = useState([])
    const [lineas, setLineas] = useState([])
    const [planes, setPlanes] = useState([])

    useEffect(() => {
        getEquipos()
        getPlanes()
        getLineas()
        if (id) {
            axios.get(`http://localhost:5000/clientes/${id}`)
                .then(response => setCliente(response.data))
                .catch(error => alert(error))
        }
       
    }, [])

    function getEquipos() {
        axios.get("http://localhost:5000/equipos/")
        .then((response) => setEquipos(response.data))
        .catch((error) => alert(error))
    }

    function getPlanes() {
        axios.get("http://localhost:5000/planes/")
          .then((response) => setPlanes(response.data))
          .catch((error) => alert(error))
    }

    function getLineas() {
        axios.get("http://localhost:5000/lineas/")
          .then((response) => setLineas(response.data))
          .catch((error) => alert(error))
    }


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
                <div className="row px-2">
                    <div className="card col-3" style={{width: 18 + 'rem'}}>
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" class="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{cliente.nombre}</h5>
                            <p className="card-text">{cliente.edad} años</p>
                            <p className="card-text">{cliente.direccion}</p>
                            <p className="card-text">{cliente.sexo}</p>
                        </div>
                    </div>
                    <table class="table table-sm col-9">
                        <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th className="text-center" scope="col">Equipo</th>
                        <th className="text-center" scope="col">Linea</th>
                        <th className="text-center" scope="col">Plan</th>
                        <th className="text-center" scope="col">Costo</th>
                        <th className="text-center" scope="col">Fecha Inicio</th>
                        <th className="text-center" scope="col">Fecha Fin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.length > 0 && (
                            lista.map(lep => (
                                <>
                                <tr key={lep.id}>
                                    <th scope="row">{lep.imei}</th>
                                    <td className="text-center">{equipos.find(eq => eq.imei == lep.equipo_id).modelo}</td>
                                    <td className="text-center">{lineas.find(li => li.id == lep.linea_id).numero}</td>
                                    <td className="text-center">{planes.find(pl => pl.id == lep.plan_id).nombre}</td>
                                    <td className="text-center">${lep.plan_costo}</td>
                                    <td className="text-center">${lep.fecha_ini}</td>
                                </tr>
                                
                            </>))
                        )}
                        {lista.length === 0 && (
                            <tr>
                            <td colSpan="3">
                                <h2>No hay datos</h2>
                            </td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
