const db = require("../config/database");
const bcrypt = require("bcryptjs");

// REGISTRAR USUARIO (Encriptando la contraseña)
exports.register = async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    let conn;
    try {
        conn = await db();
        
        // Encriptar password (10 rondas de sal)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await conn.execute(
            `INSERT INTO usuarios (nombre, email, password, rol) VALUES (:nombre, :email, :password, :rol)`,
            { nombre, email, password: hashedPassword, rol: rol || 'vendedor' },
            { autoCommit: true }
        );

        res.json({ mensaje: "Usuario registrado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (conn) await conn.close();
    }
};

// LOGIN DE USUARIO
exports.login = async (req, res) => {
    const { email, password } = req.body;
    let conn;
    try {
        conn = await db();
        
        // Oracle devuelve un objeto. Buscaremos por email
        const result = await conn.execute(
            `SELECT id, nombre, email, password, rol, estado FROM usuarios WHERE email = :email`,
            { email }
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Credenciales incorrectas (Email no encontrado)" });
        }

        // Mapear los datos obtenidos (Oracle devuelve arrays de arrays o índices dependiendo del fetch)
        // Si no configuraste outFormat, vienen ordenados tal cual el SELECT:
        const [id, nombre, userEmail, dbPassword, rol, estado] = result.rows[0];

        if (estado === 0) {
            return res.status(403).json({ error: "Usuario inactivo" });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, dbPassword);
        if (!isMatch) {
            return res.status(400).json({ error: "Credenciales incorrectas (Contraseña inválida)" });
        }

        // Respuesta limpia para el frontend
        res.json({
            mensaje: "Login exitoso",
            usuario: { id, nombre, email: userEmail, rol }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (conn) await conn.close();
    }
};