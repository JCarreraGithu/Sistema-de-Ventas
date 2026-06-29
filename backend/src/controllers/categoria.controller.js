const db = require("../config/database");


// LISTAR
exports.getCategorias = async(req,res)=>{

    let conn;

    try{

        conn = await db();

        const result = await conn.execute(
            `
            SELECT 
                id,
                nombre,
                descripcion,
                estado
            FROM categorias
            ORDER BY id
            `
        );


        res.json(result.rows);


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }finally{

        if(conn)
            await conn.close();

    }

}



// INSERTAR
exports.createCategoria = async(req,res)=>{


    const {
        nombre,
        descripcion
    } = req.body;


    let conn;


    try{


        conn = await db();


        await conn.execute(

        `
        INSERT INTO categorias
        (
        nombre,
        descripcion
        )
        VALUES
        (
        :nombre,
        :descripcion
        )
        `,

        {
            nombre,
            descripcion
        },

        {
            autoCommit:true
        }

        );


        res.json({
            mensaje:"Categoría creada"
        });


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }


}




// ACTUALIZAR

exports.updateCategoria = async(req,res)=>{


    const id=req.params.id;


    const {
        nombre,
        descripcion,
        estado
    }=req.body;



    let conn;


    try{


        conn=await db();


        await conn.execute(

        `
        UPDATE categorias
        SET
        nombre=:nombre,
        descripcion=:descripcion,
        estado=:estado
        WHERE id=:id
        `,

        {
            nombre,
            descripcion,
            estado,
            id
        },

        {
            autoCommit:true
        }


        );


        res.json({
            mensaje:"Actualizado"
        });



    }catch(error){

        res.status(500).json(error.message)

    }


}





// ELIMINAR

exports.deleteCategoria=async(req,res)=>{


let conn;


try{


conn=await db();


await conn.execute(

`
DELETE FROM categorias
WHERE id=:id
`,
{
id:req.params.id
},

{
autoCommit:true
}


);



res.json({
mensaje:"Eliminada"
})



}catch(error){

res.status(500).json(error.message)

}



}



