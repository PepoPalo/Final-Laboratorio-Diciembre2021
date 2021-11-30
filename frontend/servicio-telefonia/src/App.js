import './App.css';
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";

import AlumnoForm from './componentes/alumno/AlumnoForm';
import AlumnoListado from './componentes/alumno/AlumnoListado';

import CursoAlumnoListado from './componentes/curso/CursoAlumnoListado';
import CursoListado from './componentes/curso/CursoListado';

import ProfesorListado from './componentes/profesor/ProfesorListado';


export default function App() {
  return (
    <div className="container" >
      <Router>
        <div className="App mt-3 card row">
          <ul className="nav nav-pills nav-fill justify-content-center" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <Link 
                className="nav-link" 
                id="id-alumnos-tab" 
                data-toggle="pill" 
                role="tab" 
                aria-controls="pills-alumnos" 
                aria-selected="false" 
                to="/alumnos">Alumnos
              </Link>
            </li>
            <li className="nav-item" role="presentation">
              <Link 
                className="nav-link"
                id="id-profesores-tab" 
                data-toggle="pill" 
                role="tab" 
                aria-controls="pills-profesores" 
                aria-selected="false" 
                to="/profesores">Profesores
              </Link>
            </li>
            <li className="nav-item" role="presentation">
              <Link 
                className="nav-link"
                id="id-cursos-tab" 
                data-toggle="pill" 
                role="tab" 
                aria-controls="pills-cursos" 
                aria-selected="false" 
                to="/cursos">Cursos
              </Link>
            </li>
          </ul>
        </div>

        <Switch>

          {/* Alumnos */}
          <Route path="/alumnos/crear" component={AlumnoForm}></Route>
          <Route path="/alumnos/:id" component={AlumnoForm}></Route>
          <Route path="/alumnos" component={AlumnoListado}></Route>

          {/* Equipos */}
          <Route path="/cursos/:id/alumnos/" component={CursoAlumnoListado}></Route>
          <Route path="/cursos" component={CursoListado}></Route>

          {/* Linea */}
          <Route path="/profesores/crear" component={ProfesorListado}></Route>
          <Route path="/profesores" component={ProfesorListado}></Route>

        </Switch>
      </Router >
    </div>
  );
}

