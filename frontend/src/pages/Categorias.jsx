    import {useEffect,useState} from "react";
    import api from "../api/api";


    function Categorias(){

//test: activando pipeline del frontend con un cambio real
    const [categorias,setCategorias]=useState([]);


    const [nombre,setNombre]=useState("");
    const [descripcion,setDescripcion]=useState("");

//pruebas de yaml

    const cargar=()=>{


    api.get("/categorias")
    .then(res=>{

    setCategorias(res.data)

    )

    }
    }


    useEffect(()=>{

    cargar();

    },[])




    const guardar=async()=>{


    await api.post("/categorias",{

    nombre,
    descripcion

    });


    setNombre("");
    setDescripcion("");

    cargar();


    }




    return (

    <div className="container mt-4">


    <h2>Categorías</h2>


    <div className="card p-3">


    <input
    className="form-control mb-2"
    placeholder="Nombre"
    value={nombre}
    onChange={e=>setNombre(e.target.value)}
    />


    <input
    className="form-control mb-2"
    placeholder="Descripción"
    value={descripcion}
    onChange={e=>setDescripcion(e.target.value)}
    />


    <button
    className="btn btn-primary"
    onClick={guardar}
    >

    Guardar

    </button>


    </div>



    <table className="table mt-3">


    <thead>

    <tr>
    <th>ID</th>
    <th>Nombre</th>
    <th>Descripción</th>
    </tr>

    </thead>


    <tbody>


    {
    categorias.map(c=>(

    <tr key={c.ID}>

    <td>{c.ID}</td>

    <td>{c.NOMBRE}</td>

    <td>{c.DESCRIPCION}</td>


    </tr>


    ))

    }


    </tbody>


    </table>



    </div>


    )


    }


    export default Categorias;