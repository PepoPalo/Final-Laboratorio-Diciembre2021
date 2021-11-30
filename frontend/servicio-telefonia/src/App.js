import './App.css';
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";

import AlumnoForm from './componentes/alumno/AlumnoForm';
import AlumnoListado from './componentes/alumno/AlumnoListado';

import CursoAlumnoListado from './componentes/curso/CursoAlumnoListado';
import CursoListado from './componentes/curso/CursoListado';

import ProfesorListado from './componentes/maestro/ProfesorListado';

import PlanForm from './componentes/plan/PlanForm';
import PlanListado from './componentes/plan/PlanListado';
import LepForm from './componentes/lep/LepForm';
import LepListado from './componentes/lep/LepListado';


export default function App() {
  return (
    <div className="container" >
      <Router>
        <div className="App mt-3 card">
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
          <Route path="/alumnos/nuevo" component={AlumnoForm}></Route>
          <Route path="/alumnos/:id" component={AlumnoForm}></Route>
          <Route path="/alumnos" component={AlumnoListado}></Route>

          {/* LEP */}
          <Route path="/lep/nuevo/:id" component={LepForm}></Route>
          <Route path="/lep/<int:alumno>/<int:id>" component={LepForm}></Route>
          <Route path="/leps/:id" component={LepListado} ></Route>

          {/* Equipos */}
          <Route path="/cursos/:id/alumnos/" component={CursoAlumnoListado}></Route>
          <Route path="/cursos" component={CursoListado}></Route>

          {/* Linea */}
          <Route path="/profesores" component={ProfesorListado}></Route>

          {/* Planes */}
          <Route path="/planes/nuevo" component={PlanForm}></Route>
          <Route path="/planes/:id" component={PlanForm} ></Route>
          <Route path="/planes" component={PlanListado}></Route>

        </Switch>
      </Router >
    </div>
  );
}

