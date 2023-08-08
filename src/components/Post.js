import React, {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';
import axios from 'axios'

const API = process.env.REACT_APP_API;

export default function Post() {

    const [posts, setPosts] = useState([]); 

//Paginacion
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 2; // Define el número de filas por página

    const pageCount = Math.ceil(posts.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentPosts = posts.slice(offset, offset + itemsPerPage);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };
// Fin Paginacion

// Consulta los post
    const getPosts = async () => {
        axios.get(`${API}/mostrarPublicaciones`)
        .then(response => {
        // Una vez que se obtienen los datos de la API, se actualiza el estado del componente con la respuesta
        setPosts(response.data);
        console.log(response.data)
        })
        .catch(error => {
        // Manejo de errores
        console.error(error);
        });
    }

//Ejecuta la consulta una vez se utiliza el componente
    useEffect(() => {
        // Realizar la solicitud GET a la API para obtener los datos
        getPosts();
        }, []);

//Estilo de los subtitulos
    const boldTextStyle = {
        fontWeight: 'bold',
        color: 'black', 
        };
        

    return(
        <div className="row">
            <div className="Title" style={{padding: 30}} >
            <h1>Publicaciones</h1>
            </div>  
            <div className="col-md-6">
                <div>
                      {currentPosts.map(post =>(
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
                <div>
                    <ReactPaginate
                    previousLabel={'Anterior'}
                    nextLabel={'Siguiente'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    />
                </div>
            </div>
        </div>
    );
}