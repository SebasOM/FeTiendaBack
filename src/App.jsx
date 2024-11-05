import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"

function App() {

  const [data, setData] = useState([]);
  const [sid, setSid] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('');
  //const [isLoading, setLoading] = useState(true);

  //Metodos para el CRUD de clientes (consumiendo tiendaBackend)
  const saveCustomer = async()=>{
    if (!nombre.trim() || !apellidos.trim()){
      alert("Ingrese nombre y apellidos");

      return;
    }
    try{
      //consumir la api para guardar el cliente
      const response = await axios.post(`http://172.16.57.16:3100/api/clientes`, {
        nombre,
        apellidos,
      })
      alert("Cliente agregado exitosamente...")
      getCustomer();
    }
    catch(err){
      console.log(err)
    }
  }

  //Metodo para recuperar clientes
  const getCustomer = async () => {
    try {
      const url = `http://172.16.57.16:3100/api/clientes`;
      const response = await axios.get(url);
      setData(response.data)
    }
    catch (error) {
      console.log(error)
    }
  };

  //Metodo para que cuando haya un cambio en el componente, se invoque getCustomers
  useEffect(()=>{
    getCustomer();
  }, [])

  //Buscar por ID
  const getClientePorId = async (id) => {
    try {
      const url = `http://172.16.57.16:3100/api/clientes/${id}`;
      const response = await axios.get(url);
      if (response.data.nombre != null) {
        setNombre(response.data.nombre);
        setApellidos(response.data.apellidos);
      }
      else {
        alert("No se encuentra el id " + id);
      }
    }
    catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <div className="container">
        <form>
          <div className="row">
            <div className="col">
              <label htmlFor="id">Identificación a Buscar</label>
              <input
                type="text"
                id="sid"
                name="sid"
                placeholder="Identificación a buscar"
                className="form-control"
                value={sid}
                onChange={(e) => setSid(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                placeholder="Nombre"
                className="form-control"
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="nombre">Apellidos</label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                placeholder="Apellidos"
                value={apellidos}
                className="form-control"
                onChange={(e) => setApellidos(e.target.value)}
              />
            </div>
          </div>
          <button
            className="btn btn-primary mt-3"
            type="button"
            onClick={saveCustomer}
          >
            Guardar
          </button>
          <button
            className="btn btn-success mt-3 mx-3"
            type="button"
            onClick={getClientePorId}          >
            Buscar
          </button>
          <button
            className="btn btn-warning mt-3 mx-3"
            type="button"          >
            Actualizar
          </button>
          <button
            className="btn btn-danger mt-3 mx-3"
            type="button"          >
            Eliminar
          </button>
          <button
            className="btn btn-dark mt-3 mx-3"
            type="button"
            onClick={()=>getCustomer()}          
            >
            Listar Clientes
          </button>
          <button
            className="btn btn-info mt-3 mx-3"
            type="button"          >
            Limpiar Datos
          </button>
        </form>
          <hr />
        {/* Listado */}
        {/* {isLoading ? (
          <div>
            <img src={loading} width="50" height="50"></img>
          </div>
        ) : ( */}
          <div className="container">
            <table className="table table-hover">
              <thead>
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellidos</th>
              </thead>
              <tbody>
                {data.map((customer) => (
                  <tr>
                    <td>{customer._id}</td>
                    <td>{customer.nombre}</td>
                    <td>{customer.apellidos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        {/* )} */}
      </div>
    </>
  );
}

export default App;
