const oracledb = require("oracledb");
require("dotenv").config();


const connection = async()=>{

    try{

        const conn = await oracledb.getConnection({

            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECT

        });


        console.log("Oracle conectado");

        return conn;


    }catch(error){

        console.log(error);

    }

}


module.exports = connection;