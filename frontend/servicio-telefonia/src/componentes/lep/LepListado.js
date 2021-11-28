import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

export default function LepListado() {
    const { id } = useParams()
    const [lista, setLista] = useState([])
    useEffect(() => {
      getLeps()
    }, [])
    
    const [equipos, setEquipos] = useState([])
    const [lineas, setLineas] = useState([])
    const [planes, setPlanes] = useState([])
  
    function getLeps() {
        getEquipos()
        // console.log(equipos)
        getPlanes()
        getLineas()

        if (id){
            console.log("Pasa por aquí")
            axios.get(`http://localhost:5000/lineaequipoplan/${id}`)
              .then((response) => {setLista(response.data)
            console.log("esto es lep", response.data)})
              .catch((error) => alert(error))
        }
    }
  
    function getEquipos() {
        axios.get("http://localhost:5000/equipos/")
        .then((response) => {
            setEquipos(response.data
            )
            
            console.log("esto es equipo",response.data)
        })
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

    function borrar(imei) {
      axios.put(`http://localhost:5000/lineaequipoplan/baja/${imei}`)
        .then((response) => {
          alert("Registro borrado correctamente")
          getLeps()
        })
        .catch(error => alert(error))
    }


    return (
        <>
            <div className="bg-white rounded-bottom rounded-right">
                <div>
                    <Link to={"/lep/nuevo/" + id} className="btn btn-primary my-3">Nuevo</Link>
                </div>
                <table className="table table-hover">
                    <thead className="bg-info">
                        <tr>
                        <th scope="col">ID</th>
                        <th className="text-center" scope="col">Equipo</th>
                        <th className="text-center" scope="col">Linea</th>
                        <th className="text-center" scope="col">Plan</th>
                        <th className="text-center" scope="col">Costo</th>
                        <th className="text-center" scope="col">Fecha Inicio</th>
                        <th className="text-center" scope="col">Fecha Fin</th>
                        <th className="text-center" scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.length > 0 && (
                            lista.map(lep => (
                                <>
                                <tr key={lep.id}>
                                    <th scope="row">{lep.imei}</th>
                                    <td className="text-center">{equipos.eind(eq => eq.imei == lep.equipo_id).modelo}</td>
                                    <td className="text-center">{lineas.find(li => li.id == lep.linea_id).numero}</td>
                                    <td className="text-center">{planes.find(pl => pl.id == lep.plan_id).nombre}</td>
                                    <td className="text-center">${lep.plan_costo}</td>
                                    <td className="text-center">{lep.fecha_ini}</td>
                                    <td className="text-center">
                                        <Link className="btn btn-outline-primary" to={"/leps/" + lep.imei}>Editar</Link> &nbsp;
                                        <button className="btn btn-outline-danger mr-2" onClick={() => borrar(lep.id)}>Dar Baja</button>
                                        
                                    </td>
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
        </>
    )
}