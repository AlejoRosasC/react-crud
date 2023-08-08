import React, {useState} from "react";
import ReactPaginate from 'react-paginate';
import axios from 'axios'

const API = process.env.REACT_APP_API;

export default function Photo() {

    const [photos, setPhoto] = useState([])
    const [idPhoto, setIdPhoto] = useState('')

    //Paginacion
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3; // Define el número de filas por página

    const pageCount = Math.ceil(photos.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentPhotos = photos.slice(offset, offset + itemsPerPage);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };
    //Fin Paginacion


    //Consulta las fotos del un usuario especifico por id
    const getPhotos =  (idPhoto) => {
        console.log("ejecutando...")
        axios.get(`${API}/fotosPorUsuario/${idPhoto}`)
        .then(response => {
        setPhoto(response.data);
        console.log(response.data)
        })
        .catch(error => {
        console.error(error);
        });
    }

    //Recupera el id del usuario a consultar
    const handleSubmit =  (e) => {
        e.preventDefault(); 
        console.log(idPhoto)
        getPhotos(idPhoto);
    }

    //Estilo de los subtitulos
    const boldTextStyle = {
        fontWeight: 'bold',
        color: 'black', 
        };

    return(
        <div className="row">
            <div className="Title" style={{padding: 30}} >
            <h2>Fotos</h2>
            </div> 
            <div className="col-md-4">
                <form className="card card-body" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                    type="text" 
                    onChange={e => setIdPhoto(e.target.value)} 
                    value={idPhoto}
                    className="form-control"
                    placeholder="Id de usuario"
                    autoFocus
                    />
                </div>
                <button className="btn btn-primary btn-block">
                   Buscar fotos
                </button>
                </form>
            </div>
            <div className="col-md-6">
                <div>
                      {currentPhotos.map(photo =>(
                        <div key={photo.id}  style={{padding: 30, border: '2px solid #000', margin: 15 }}>
                            
                            <p>
                            <span style={boldTextStyle}>Album:</span> {photo.albumId}  &ensp; <span style={boldTextStyle}>Id Foto:</span> {photo.id}
                            </p>
                            <div>
                                <h3>{photo.title}</h3>
                                <p>URL: {photo.url}</p>
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
    