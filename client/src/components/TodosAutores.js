import {Link} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
const TodosAutores = () => {
    
    const [autores, setautores] = useState([])

    useEffect(() =>{
        axios.get("http://localhost:8000/api/autores")
            .then(res=>{
                setautores(res.data)
            })
            .catch(err=>{
                console.error(err)
            })
    },[])

    const borrarAutor = (idAutor) => {
        axios.delete("http://localhost:8000/api/autores/" + idAutor) 
            .then(res=>{
                //Actualizo lista filter
                let nuevaListAutors = autores.filter(autor=>autor._id !== idAutor)
                setautores(nuevaListAutors)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        <div>
            <h1>Todos los autores</h1>
            <Link className="btn btn-success" to="/nuevo">Nuevo Autor</Link>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Libros</th>
                        <th>Artículos</th>
                        <th>Novelas Gráficas</th>
                        <th>Cuentos</th>
                        <th>Fecha de creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        autores.map((autor, index) => (
                            <tr key={index}>
                                <td>{autor.nombre}</td>
                                <td><img style={{width:"150px"}} src={autor.imagen}/></td>
                                <td> { autor.libros ? <span className="glyphicon glyphicon-ok text-success"></span> : <span className="glyphicon glyphicon-remove text-danger"></span>}</td>
                                <td> { autor.articulos ? <span className="glyphicon glyphicon-ok text-success"></span> : <span className="glyphicon glyphicon-remove text-danger"></span>}</td>
                                <td> { autor.novelagrafica ? <span className="glyphicon glyphicon-ok text-success"></span> : <span className="glyphicon glyphicon-remove text-danger"></span>}</td>
                                <td> { autor.cuentos ? <span className="glyphicon glyphicon-ok text-success"></span> : <span className="glyphicon glyphicon-remove text-danger"></span>}</td>
                                <td>{autor.createdAt}</td>
                                <td>
                                    <Link className="btn btn-info" to={`/autor/editar/${autor._id}`}>Editar</Link>
                                    <button className="btn btn-danger" onClick={()=>borrarAutor(autor._id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TodosAutores