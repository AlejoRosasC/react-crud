import React, {useEffect, useState} from "react";
import axios from 'axios'

const API = process.env.REACT_APP_API;

export default function Users() {
    const [users, setUsers] = useState([]); 


//Consulta los usuarios
    const getUsers = async () => {
        axios.get(`${API}/mostrarUsuarios`)
        .then(response => {
        // Una vez que se obtienen los datos de la API, se actualiza el estado del componente con la respuesta
        setUsers(response.data);
        console.log(response.data)
        })
        .catch(error => {
        // Manejo de errores en caso de que ocurra alguno
        console.error(error);
        });
    }
    
//Ejecuta la consulta una vez se utiliza el componente
    useEffect(() => {
        // Realizar la solicitud GET a la API para obtener los datos
        getUsers();
        }, []);

    return(
        
        <div className="row">
            <div className="Title" style={{padding: 30}} >
            <h2>Usuarios</h2>
            </div>  
            <div className="col-md-6">
                <table className="table table-striped">
                    <thead>
                        <tr >
                            <th>Id</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                      {users.map(user =>(
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>
                      ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}