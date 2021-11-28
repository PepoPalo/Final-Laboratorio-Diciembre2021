import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function PlanListado() {
    const [lista, setLista] = useState([])
    useEffect(() => {
      getPlanes()
    }, [])
  
    function getPlanes() {
      axios.get("http://localhost:5000/planes/")
        .then((response) => setLista(response.data))
        .catch((error) => alert(error))
    }
  
  
    function borrar(id) {
      axios.put(`http://localhost:5000/planes/baja/${id}`)
        .then((response) => {
          alert("Registro borrado correctamente")
          getPlanes()
        })
        .catch(error => alert(error))
    }


    return (
        <>
            <div className="bg-white rounded-bottom rounded-right">
                <div>
                    <Link to="/planes/nuevo" className="btn btn-primary my-3">Nuevo</Link>
                </div>
                <table className="table table-hover">
                    <thead className="bg-info">
                        <tr>
                        <th className="text-center" scope="col">Nombre</th>
                        <th className="text-center" scope="col">Costo por mes</th>
                        <th className="text-center" scope="col">Cantidad de llamadas</th>
                        <th className="text-center" scope="col">Cantidad de mensajes</th>
                        <th className="text-center" scope="col">Cantidad de gigas</th>
                        <th className="text-center" scope="col">Tipo</th>
                        <th className="text-center" scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.length > 0 && (
                            lista.map(plan => (
                                <>
                                <tr key={plan.id}>
                                    <th className="text-center">{plan.nombre}</th>
                                    <td className="text-center">$ {plan.costo_por_mes}</td>
                                    <td className="text-center">{plan.cant_llamadas}</td>
                                    <td className="text-center">{plan.cant_mensajes}</td>
                                    <td className="text-center">{plan.cant_gigas} gb</td>
                                    <td className="text-center">{plan.tipo}</td>
                                    <td className="text-center">
                                        <Link className="btn btn-outline-primary" to={"/planes/" + plan.id}>Editar</Link> &nbsp;
                                        <button className="btn btn-outline-danger mr-2" onClick={() => borrar(plan.id)}>Dar Baja</button>
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