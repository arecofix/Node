import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determina el nombre del archivo de la base de datos.
// Si estamos corriendo tests, usa ':memory:' (una base temporal en RAM que se borra al terminar).
// De lo contrario, crea/usa el archivo físico 'database.sqlite' en esta carpeta.
const dbFile = process.env.NODE_ENV === 'test' 
  ? ':memory:' 
  : path.join(__dirname, 'database.sqlite');

// Activa el modo verbose para depuración (ayuda a ver errores de SQL en la consola)
const sqlite = sqlite3.verbose();

// Instancia y exporta la conexión a la base de datos. ¡A través de 'db' hablamos con SQLite!
export const db = new sqlite.Database(dbFile);

// Habilitar claves foráneas
db.run('PRAGMA foreign_keys = ON');

// =========================================================
// FUNCIONES AUXILIARES (HELPERS) PARA FACILITAR EL USO
// Convierten la manera antigua de SQLite (callbacks) a Promesas (async/await)
// =========================================================

// 'query' sirve para hacer consultas que devuelven MUCHOS resultados (ej: SELECT *)
export const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows); // Retorna un array con todas las filas encontradas
    });
  });
};

// 'run' sirve para ejecutar comandos que NO devuelven datos, 
// solo modifican cosas (ej: INSERT, UPDATE, DELETE)
export const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes }); // Retorna info de lo que modificó
    });
  });
};

// 'get' sirve para buscar UNA SOLA fila (ej: SELECT * WHERE id = 1)
export const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row); // Retorna un único objeto con los datos
    });
  });
};

// =========================================================
// INICIALIZACIÓN DE LA BASE DE DATOS
// =========================================================
export const initDb = async () => {
  // Crea la tabla 'productos' si es que aún no existe. 
  // Cada producto tiene un id, un nombre único y un precio.
  await run(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY,
      nombre TEXT UNIQUE,
      precio REAL
    )
  `);

  // Crea la tabla 'carrito' donde se guardarán los productos agregados.
  // Tiene una relación (FOREIGN KEY) con la tabla productos.
  await run(`
    CREATE TABLE IF NOT EXISTS carrito (
      producto_id INTEGER PRIMARY KEY,
      cantidad INTEGER,
      FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
    )
  `);

  // Si la tabla productos está vacía (0 registros), inserta (semilla) 3 cursos por defecto
  // Esto asegura que la página siempre tenga algo para mostrar la primera vez.
  const countRow = await get('SELECT COUNT(*) as count FROM productos');
  if (countRow.count === 0) {
    await run("INSERT INTO productos (id, nombre, precio) VALUES (1, 'python', 10.0)");
    await run("INSERT INTO productos (id, nombre, precio) VALUES (2, 'javascript', 12.0)");
    await run("INSERT INTO productos (id, nombre, precio) VALUES (3, 'java', 19.0)");
  }
};
