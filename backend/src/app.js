const categoriaRoutes=require("./routes/categoria.routes");
const productoRoutes = require("./routes/producto.routes");
const authRoutes = require("./routes/auth.routes");
const express = require("express");
const cors=require("cors");


const app=express();
app.use(express.json());
app.use("/api/categorias",categoriaRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/auth", authRoutes);
app.use(cors());



app.get("/",(req,res)=>{

    res.json({
        mensaje:"API funcionando"
    })

});


app.listen(3000,()=>{

console.log("Servidor en puerto 3000");

});