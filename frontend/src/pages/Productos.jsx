import { useEffect, useState } from "react";
import api from "../api/api";

function Productos() {

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [form, setForm] = useState({
        categoria_id: "",
        codigo_barras: "",
        nombre: "",
        descripcion: "",
        precio_venta: "",
        stock: "",
        imagen_url: "",
        estado: 1
    });

    const cargarProductos = async () => {

        const res = await api.get("/productos");

        setProductos(res.data);

    };

    const cargarCategorias = async () => {

        const res = await api.get("/categorias");

        setCategorias(res.data);

    };

    useEffect(() => {

        cargarProductos();
        cargarCategorias();

    }, []);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const guardar = async () => {

        await api.post("/productos", form);

        setForm({
            categoria_id: "",
            codigo_barras: "",
            nombre: "",
            descripcion: "",
            precio_venta: "",
            stock: "",
            imagen_url: "",
            estado: 1
        });

        cargarProductos();

    };

    return (

        <div className="container mt-4">

            <h2>Productos</h2>

            <div className="card p-3">

                <div className="row">

                    <div className="col-md-6 mb-2">

                        <select
                            className="form-control"
                            name="categoria_id"
                            value={form.categoria_id}
                            onChange={handleChange}
                        >

                            <option value="">Seleccione categoría</option>

                            {

                                categorias.map(cat => (

                                    <option
                                        key={cat.ID}
                                        value={cat.ID}
                                    >

                                        {cat.NOMBRE}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div className="col-md-6 mb-2">

                        <input
                            className="form-control"
                            placeholder="Código de barras"
                            name="codigo_barras"
                            value={form.codigo_barras}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-2">

                        <input
                            className="form-control"
                            placeholder="Nombre"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-2">

                        <input
                            className="form-control"
                            placeholder="Descripción"
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-3 mb-2">

                        <input
                            className="form-control"
                            type="number"
                            placeholder="Precio"
                            name="precio_venta"
                            value={form.precio_venta}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-3 mb-2">

                        <input
                            className="form-control"
                            type="number"
                            placeholder="Stock"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-2">

                        <input
                            className="form-control"
                            placeholder="Imagen URL"
                            name="imagen_url"
                            value={form.imagen_url}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <button
                    className="btn btn-success mt-3"
                    onClick={guardar}
                >

                    Guardar Producto

                </button>

            </div>

            <table className="table table-bordered table-striped mt-4">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        productos.map(prod => (

                            <tr key={prod.ID}>

                                <td>{prod.ID}</td>

                                <td>{prod.NOMBRE}</td>

                                <td>{prod.CATEGORIA}</td>

                                <td>Q {prod.PRECIO_VENTA}</td>

                                <td>{prod.STOCK}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Productos;