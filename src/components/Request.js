import React, {useEffect, useState} from "react";
import axios from 'axios'
import ReactPaginate from 'react-paginate';


import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';


const API = process.env.REACT_APP_API;

export default function Request() {


    const [requests, setRequests] = useState([]); 
    const [PeticionDate, setFecha] = useState('')
    const [PeticionMethod, setMetodo] = useState('')
    const [PeticionConsult, setPeticion] = useState('')
    const [PeticionDataReturn, setResultado] = useState('')
    const [PeticionId, setIdentificador] = useState('')

    // DISENNO Y PAGINACION

    const [expanded, setExpanded] = useState(false); //Esta linea se utiliza para determinar el tamaño a visualizar de la peticion
    const [currentPage, setCurrentPage] = useState(0); //Esta linea se utiliza para mantener la cantidad de peticiones en una sola tabla
    const itemsPerPage = 5;


    const pageCount = Math.ceil(requests.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentRequests = requests.slice(offset, offset + itemsPerPage);
    
    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };
    
    const toggleExpand = () => {
        setExpanded(!expanded);
        };
    
        const contentStyle = {
        maxHeight: expanded ? 'none' : '70px',
        overflow: 'hidden',
        };

    const exportButtonStyle = {
        padding: '10px 20px',
        backgroundColor: '#007bff', // Color de fondo del botón (puedes cambiarlo)
        color: '#fff', // Color del texto del botón (puedes cambiarlo)
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease', // Transición suave al cambiar el color de fondo
        };
    
    // FIN DISENNO Y PAGINACION

    // EXPORT BUTTON
    
    const exportData = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Data');
    
        worksheet.columns = [
            { header: 'Id', key: 'PeticionId' },
            { header: 'Fecha', key: 'PeticionDate' },
            { header: 'Método', key: 'PeticionMethod' },
            { header: 'Petición', key: 'PeticionConsult' },
            { header: 'Resultado', key: 'PeticionDataReturn' }
        ];
    
        requests.forEach(request => {
            worksheet.addRow(request);
        });
    
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'data.xlsx');
    };
    
    // FIN EXPORT BUTTON


    // INICIO C.R.U.D.
    const getRequest = async () => {
        axios.get(`${API}/peticionApi`)
        .then(response => {
        // Una vez que se obtienen los datos de la API, actualizamos el estado del componente con la respuesta
        setRequests(response.data);
        console.log(response.data)
        })
        .catch(error => {
        // Manejo de errores en caso de que ocurra alguno
        console.error(error);
        });
    }

    useEffect(() => {
        // Realizar la solicitud GET a la API para obtener los datos
        getRequest();
    }, []);

    const deleteRequest = async(PeticionId) => {
        const userResponse = window.confirm('Esta seguro que quiere eliminar este registro de peticion?')
        if(userResponse){
            console.log(PeticionId)

            await axios.delete(`${API}/peticionApi/${PeticionId}`)
            .then(response => {
                // Aquí puedes manejar la respuesta de la API si lo deseas
                console.log(response.data);
                // Si es necesario, actualizar el estado de tu componente para reflejar los cambios en la interfaz
                })
                .catch(error => {
                // Manejo de errores en caso de que ocurra alguno
                console.error(error);
                });

                getRequest();
        }
    }
    
    
    const editRequest = async (e) => {  //async hace referencia a que la funcion no va  adetener la ejecucion de la pagina
        e.preventDefault();
        console.log(PeticionId, PeticionDate, PeticionMethod,PeticionConsult,PeticionDataReturn,);
        
        const sendData =() => {
            const data = {
                PeticionId,
                PeticionDate,
                PeticionMethod,
                PeticionConsult,
                PeticionDataReturn          
            }
            axios.put(`${API}/peticionApi/`, data)
      .then(response => {
        // respuesta de la API si lo deseas
        console.log(response.data);
      })
      .catch(error => {
        // Manejo de errores 
        console.error(error);
      });
        };

        sendData();
        await  getRequest();
    }

    // FIN C.R.U.D.
    return(
        
        <div className="container"  style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div className="Title" style={{padding: 30}} >
            <h2>Peticiones</h2>
            </div>
            <div className="col-md-4" style={{ marginBottom: '70px', alignSelf: 'center' }}>
                <form className="card card-body" onSubmit={editRequest}>
                <div className="form-group">
                    <input 
                    type="text" 
                    onChange={e => setIdentificador(e.target.value)} 
                    value={PeticionId}
                    className="form-control"
                    placeholder="Id peticion"
                    autoFocus
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="text" 
                    onChange={e => setFecha(e.target.value)} 
                    value={PeticionDate}
                    className="form-control"
                    placeholder="YYYY-MM-DD"
                    autoFocus
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="text" 
                    onChange={e => setMetodo(e.target.value)} 
                    value={PeticionMethod}
                    className="form-control"
                    placeholder="Method"
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="text" 
                    onChange={e => setPeticion(e.target.value)} 
                    value={PeticionConsult}
                    className="form-control"
                    placeholder="URL"
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="text" 
                    onChange={e => setResultado(e.target.value)} 
                    value={PeticionDataReturn}
                    className="form-control"
                    placeholder="Result"
                    />
                </div>
                <button className="btn btn-primary btn-block">
                    Editar 
                </button>
                </form>
            </div> 
            <div className="col-md-6" style={{ marginTop: 'auto' }}>
                <table className="table table-striped">
                    <thead>
                        <tr >
                            <th>options</th>
                            <th>Id</th>
                            <th>Fecha</th>
                            <th>Método</th>
                            <th>Petición</th>
                            <th>Resultado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                      {currentRequests.map((request) =>(
                        <tr key={request.PeticionId}>
                            <td>
                            <button 
                            className="btn btn-danger btn-sm btn-block"
                            onClick={(e) => deleteRequest(request.PeticionId)}>
                                Delete
                            </button>
                            </td>
                            <td>{request.PeticionId}</td>
                            <td>{request.PeticionDate}</td>
                            <td>{request.PeticionMethod}</td>
                            <td>{request.PeticionConsult}</td>
                            <td> 
                                <div style={contentStyle}>
                                    {request.PeticionDataReturn}
                                </div>
                            </td>
                            <td>
                            <a href="#" onClick={toggleExpand}>
                                {expanded ? 'Mostrar menos' : 'Mostrar más'}
                            </a>
                            </td>
                        </tr>
                      ))}
                    </tbody>
                </table>
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
                <div>
                    <button style={exportButtonStyle} onClick={exportData}>
                        Export Data
                    </button>
                </div>
            </div>
        </div>
    );
}