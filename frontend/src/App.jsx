import {useEffect,useState} from "react";
import api from "./api/api";


function App(){


const [categorias,setCategorias]=useState([]);


useEffect(()=>{


api.get("/categorias")
.then(res=>{

setCategorias(res.data)

})


},[])



return (

<div>

<h1>Categorias</h1>


{
categorias.map(c=>(

<p key={c.ID}>
{c.NOMBRE}
</p>

))
}


</div>

)

}


export default App;