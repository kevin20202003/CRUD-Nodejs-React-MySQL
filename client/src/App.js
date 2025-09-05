import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [nombre, sertNombre] = useState('');
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState('');
  const [cargo, setCargo] = useState('');
  const [anios, setAnios] = useState();
  const [id, setId] = useState();

  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleadosList] = useState([]);

  const addEmpleado = () => {
    Axios.post('http://localhost:3001/create', {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleado();
      limpiarCampos();
    });
  }

  const limpiarCampos = () => {
    sertNombre('');
    setEdad('');
    setPais('');
    setCargo('');
    setAnios('');
    setId('');
    setEditar(false);
  }

  const updateEmpleado = () => {
    Axios.put('http://localhost:3001/update', {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleado();
      limpiarCampos();
    });
  }

  const edit = (val) => {
    setEditar(true);
    sertNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  }

  const getEmpleado = () => {
    Axios.get('http://localhost:3001/list',).then((response) => {
      setEmpleadosList(response.data);
    });
  }

  useEffect(() => {
    getEmpleado();
  }, []);

  return (
    <div className="container">
      <div className="App">
      </div>
      <div className="card text-center">
        <div className="card-header">
          GESTION DE EMPLEADOS
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input onChange={(event) => {
              sertNombre(event.target.value);
            }} type="text" value={nombre} className="form-control" placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input onChange={(event) => {
              setEdad(event.target.value);
            }} type="number" value={edad} className="form-control" placeholder="Ingrese su edad" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais:</span>
            <input onChange={(event) => {
              setPais(event.target.value);
            }} type="text" value={pais} className="form-control" placeholder="Ingrese su pais" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input onChange={(event) => {
              setCargo(event.target.value);
            }} type="text" value={cargo} className="form-control" placeholder="Ingrese su cargo" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años de experiencia:</span>
            <input onChange={(event) => {
              setAnios(event.target.value);
            }} type="number" value={anios} className="form-control" placeholder="Ingrese sus años de experiencia" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {
            editar ? 
            <div>
            <button className='btn btn-warning m-2' onClick={updateEmpleado}>Actualizar</button> 
            <button className='btn btn-danger m-2' onClick={limpiarCampos}>Cancelar</button>
            </div>
            : <button className='btn btn-success' onClick={addEmpleado}>Registrar</button>
          }
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosList.map((val, key) => {
            return <tr key={val.id}>
              <th>{val.id}</th>
              <td>{val.nombre}</td>
              <td>{val.edad}</td>
              <td>{val.pais}</td>
              <td>{val.cargo}</td>
              <td>{val.anios}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button
                    onClick={() => {
                      edit(val);
                    }} className='btn btn-warning m-2'>Editar</button>
                  <button className='btn btn-danger m-2'>Eliminar</button>
                </div>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
