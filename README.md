# E-Commerce & Sales Management System

Plataforma Web full-stack orientada a la gestión de inventario, catálogo de productos tecnológicos y procesamiento de ventas para comercio electrónico.

---

#Tecnologías Utilizadas

* **Frontend:** React.js, Vite, Axios, Bootstrap 5.
* **Backend:** Node.js, Express, `oracledb` (Oracle Database Driver).
* **Base de Datos:** Oracle Database (PL/SQL, Triggers y Secuencias).

---

## 🏗️ Arquitectura de la Aplicación

```text
Sistema-de-Ventas/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── categoria.controller.js
│   │   │   └── producto.controller.js
│   │   └── routes/
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   └── pages/
│   └── package.json
└── DB/
    └── schema.sql
