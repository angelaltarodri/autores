import React, {useState, useEffect} from "react";
import axios from "axios";
import{useHistory, useParams}from "react-router-dom";

const ActualizarAutor = () => {
    const {id} = useParams()
    
    const [nombre,setnombre] = useState("");

    const [imagen, setimagen] = useState("")
    const [libros, setlibros] = useState(false)
    const [articulos, setarticulos] = useState(false)
    const [novelagrafica, setnovelagrafica] = useState(false)
    const [cuentos, setcuentos] = useState(false)

    const [errors,seterrors] = useState({});
    const history = useHistory();

    useEffect(() =>{
        axios.get("http://localhost:8000/api/autores/" + id)
            .then(res => {
                setnombre(res.data.nombre)
                setimagen(res.data.imagen)
                setlibros(res.data.libros)
                setarticulos(res.data.articulos)
                setnovelagrafica(res.data.novelagrafica)
                setcuentos(res.data.cuentos)
            })
            .catch(err => {
                history.push("/error")
            })
    },[id, history])
    
    const actualizarAutor = (e) => {
        e.preventDefault()
        axios.put("http://localhost:8000/api/autores/" + id, {
            nombre,
            imagen,
            libros,
            articulos,
            novelagrafica,
            cuentos
        })
            .then(res => history.push("/"))
            .catch(err=> seterrors(err.response.data.errors))
    }

    return (
        <div>
            <h1>Editar Autor</h1>
            <form onSubmit={actualizarAutor}>
            <div className="form-group">
                    <label htmlFor="nombre"> Nombre: </label>
                    <input type="text" id="nombre" name="nombre" value={nombre} onChange={(e)=>setnombre(e.target.value)} className="form-control"/>
                    {errors.nombre ? <span className="text-danger"> {errors.nombre.message} </span> : null}
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="imagen">URL Imagen : </label>
                            <input type="text" id="imagen" name="imagen" value={imagen} onChange={(e)=>setimagen(e.target.value)} className="form-control"/>
                        </div>
                        <div className="col-6">
                            <img src={imagen} className="img-fluid" />
                        </div>
                    </div>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="libros" name="libros" checked={libros} onChange={(e)=>setlibros(e.target.checked)} />
                    <label className="form-check-label" htmlFor="libros">Autor de libros</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="articulos" name="articulos" checked={articulos} onChange={(e)=>setarticulos(e.target.checked)} />
                    <label className="form-check-label" htmlFor="articulos">Autor de articulos</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="novelagrafica" name="novelagrafica" checked={novelagrafica} onChange={(e)=>setnovelagrafica(e.target.checked)} />
                    <label className="form-check-label" htmlFor="novelagrafica">Autor de novela gráfica</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="cuentos" name="cuentos" checked={cuentos} onChange={(e)=>setcuentos(e.target.checked)} />
                    <label className="form-check-label" htmlFor="cuentos">Autor de cuentos</label>
                </div>
                <input type="submit"value="Guardar"className="btn btn-success"/>
            </form>
        </div>
    )
}

export default ActualizarAutor