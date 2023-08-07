import React, {useEffect, useState} from "react";
import axios from 'axios'

const API = process.env.REACT_APP_API;

export default function Post() {


    const [posts, setPosts] = useState([]); 



    const getPosts = async () => {
        axios.get(`${API}/mostrarPublicaciones`)
        .then(response => {
        // Una vez que se obtienen los datos de la API, actualizamos el estado del componente con la respuesta
        setPosts(response.data);
        console.log(response.data)
        })
        .catch(error => {
        // Manejo de errores en caso de que ocurra alguno
        console.error(error);
        });
    }

    useEffect(() => {
        // Realizar la solicitud GET a la API para obtener los datos
        getPosts();
        }, []);

    const boldTextStyle = {
        fontWeight: 'bold',
        color: 'black', // Puedes ajustar el color aquí
        };
        

    return(
        <div className="row">
            <div className="Title" style={{padding: 30}} >
            <h1>Publicaciones</h1>
            </div>  
            <div className="col-md-6">
                <div>
                      {posts.map(post =>(
                        <div key={post.id}  style={{padding: 30, border: '2px solid #000', margin: 15 }}>
                            <p>
                            <span style={boldTextStyle}>Id Publicación:</span> {post.id}
                            </p>
                            <p>
                            <span style={boldTextStyle}>Autor:</span> {post.userId}
                            </p>
                            <div>
                                <h3>{post.title}</h3>
                                <p>{post.body}</p>
                            </div>
                        </div>
                      ))}
                </div>
            </div>
        </div>
    );
}