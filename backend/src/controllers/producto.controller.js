const db = require("../config/database");

// =======================
// LISTAR PRODUCTOS
// =======================
exports.getProductos = async (req, res) => {

    let conn;

    try {

        conn = await db();

        const result = await conn.execute(
            `
            SELECT
                p.id,
                p.codigo_barras,
                p.nombre,
                p.descripcion,
                p.precio_venta,
                p.stock,
                p.imagen_url,
                p.estado,
                c.id categoria_id,
                c.nombre categoria
            FROM productos p
            INNER JOIN categorias c
                ON p.categoria_id = c.id
            ORDER BY p.id
            `,
            [],
            {
                outFormat: require("oracledb").OUT_FORMAT_OBJECT
            }
        );

        res.json(result.rows);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    } finally {

        if (conn)
            await conn.close();

    }

};

// =======================
// INSERTAR PRODUCTO
// =======================
exports.createProducto = async (req, res) => {

    let conn;

    try {

        conn = await db();

        const {
            categoria_id,
            codigo_barras,
            nombre,
            descripcion,
            precio_venta,
            stock,
            imagen_url,
            estado
        } = req.body;

        await conn.execute(

            `
            INSERT INTO productos
            (
                categoria_id,
                codigo_barras,
                nombre,
                descripcion,
                precio_venta,
                stock,
                imagen_url,
                estado
            )
            VALUES
            (
                :categoria_id,
                :codigo_barras,
                :nombre,
                :descripcion,
                :precio_venta,
                :stock,
                :imagen_url,
                :estado
            )
            `,

            {
                categoria_id,
                codigo_barras,
                nombre,
                descripcion,
                precio_venta,
                stock,
                imagen_url,
                estado
            },

            {
                autoCommit: true
            }

        );

        res.json({
            mensaje: "Producto creado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    } finally {

        if (conn)
            await conn.close();

    }

};

// =======================
// ACTUALIZAR
// =======================
exports.updateProducto = async (req, res) => {

    let conn;

    try {

        conn = await db();

        const id = req.params.id;

        const {
            categoria_id,
            codigo_barras,
            nombre,
            descripcion,
            precio_venta,
            stock,
            imagen_url,
            estado
        } = req.body;

        await conn.execute(

            `
            UPDATE productos
            SET

                categoria_id=:categoria_id,
                codigo_barras=:codigo_barras,
                nombre=:nombre,
                descripcion=:descripcion,
                precio_venta=:precio_venta,
                stock=:stock,
                imagen_url=:imagen_url,
                estado=:estado

            WHERE id=:id
            `,

            {
                categoria_id,
                codigo_barras,
                nombre,
                descripcion,
                precio_venta,
                stock,
                imagen_url,
                estado,
                id
            },

            {
                autoCommit: true
            }

        );

        res.json({
            mensaje: "Producto actualizado"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    } finally {

        if (conn)
            await conn.close();

    }

};

// =======================
// ELIMINAR
// =======================
exports.deleteProducto = async (req, res) => {

    let conn;

    try {

        conn = await db();

        await conn.execute(

            `
            DELETE FROM productos
            WHERE id=:id
            `,

            {
                id: req.params.id
            },

            {
                autoCommit: true
            }

        );

        res.json({
            mensaje: "Producto eliminado"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    } finally {

        if (conn)
            await conn.close();

    }

};