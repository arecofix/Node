import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { query, run, get } from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// CONFIGURACIÓN INICIAL DEL SERVIDOR
// ==========================================
const app = express(); // Crea la aplicación (el servidor web)

// Evitar que el navegador pida el icono por defecto y de error
app.get('/favicon.ico', (req, res) => res.status(204).send());

// Middlewares: 
// CORS permite que el frontend (otra IP/puerto) pueda hacerle peticiones sin error
app.use(cors());
// express.json() permite que el servidor entienda peticiones con formato JSON
app.use(express.json());

// Sirve los archivos estáticos del frontend compilado
// En desarrollo: public/ | En producción (Vercel): frontend/dist/
const isProd = process.env.NODE_ENV === 'production';
const staticDir = isProd 
  ? path.join(__dirname, 'frontend', 'dist')
  : path.join(__dirname, 'public');
app.use(express.static(staticDir, { index: false }));

// Swagger setup
const baseUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:5000';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Carrito de Compras API',
      version: '1.0.0',
      description: 'API en Express para gestionar un carrito de compras interactivo.',
    },
    servers: [
      {
        url: baseUrl,
        description: isProd ? 'Servidor en Producción' : 'Servidor Local',
      },
    ],
  },
  apis: ['./app.js'], // buscar anotaciones en este mismo archivo
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * /:
 *   get:
 *     summary: Obtener lista de productos
 *     responses:
 *       200:
 *         description: Lista de productos disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   precio:
 *                     type: number
 */
// ==========================================
// RUTA 1: OBTENER TODOS LOS PRODUCTOS
// ==========================================
app.get('/', async (req, res) => {
  // Si la petición viene de un navegador pidiendo HTML, devuelve la página principal
  const accept = req.headers.accept || '';
  if (accept.includes('text/html')) {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  
  // Si es una petición a la API, busca los productos en la base de datos
  try {
    const products = await query('SELECT * FROM productos');
    res.json(products); // Los devuelve en formato JSON al frontend
  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 = Error del servidor
  }
});

/**
 * @openapi
 * /carrito:
 *   get:
 *     summary: Obtener contenido del carrito
 *     responses:
 *       200:
 *         description: Carrito actual con cantidades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: integer
 */
// ==========================================
// RUTA 2: OBTENER EL CARRITO
// ==========================================
app.get('/carrito', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM carrito');
    // Transformamos las filas en un objeto simple: { id_producto: cantidad, ... }
    const cartObj = {};
    rows.forEach(row => {
      cartObj[row.producto_id] = row.cantidad;
    });
    res.json(cartObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /agregar/{id}:
 *   post:
 *     summary: Agregar producto al carrito
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del producto a agregar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Carrito actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: integer
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
// ==========================================
// RUTA 3: AGREGAR UN PRODUCTO AL CARRITO
// ==========================================
app.post('/agregar/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID de producto inválido' });
    }

    // 1. Verificar si el producto realmente existe en la BD
    const product = await get('SELECT * FROM productos WHERE id = ?', [id]);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' }); // 404 = No encontrado
    }

    // 2. Buscar si el producto ya está en el carrito
    const item = await get('SELECT * FROM carrito WHERE producto_id = ?', [id]);
    if (item) {
      // Si ya está, le sumamos 1 a la cantidad (UPDATE)
      await run('UPDATE carrito SET cantidad = cantidad + 1 WHERE producto_id = ?', [id]);
    } else {
      // Si no está, lo insertamos por primera vez con cantidad 1 (INSERT)
      await run('INSERT INTO carrito (producto_id, cantidad) VALUES (?, 1)', [id]);
    }

    // 3. Devolver el carrito actualizado al frontend para que se refresque
    const rows = await query('SELECT * FROM carrito');
    const cartObj = {};
    rows.forEach(row => {
      cartObj[row.producto_id] = row.cantidad;
    });
    res.json(cartObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /eliminar/{id}:
 *   delete:
 *     summary: Eliminar producto del carrito
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Carrito actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: integer
 *       404:
 *         description: Producto no está en el carrito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
app.delete('/eliminar/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID de producto inválido' });
    }

    // Verificar si el producto está en el carrito
    const item = await get('SELECT * FROM carrito WHERE producto_id = ?', [id]);
    if (!item) {
      return res.status(404).json({ error: 'Producto no está en el carrito' });
    }

    if (item.cantidad > 1) {
      await run('UPDATE carrito SET cantidad = cantidad - 1 WHERE producto_id = ?', [id]);
    } else {
      await run('DELETE FROM carrito WHERE producto_id = ?', [id]);
    }

    // Obtener carrito actualizado
    const rows = await query('SELECT * FROM carrito');
    const cartObj = {};
    rows.forEach(row => {
      cartObj[row.producto_id] = row.cantidad;
    });
    res.json(cartObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /total:
 *   get:
 *     summary: Calcular total de la compra
 *     responses:
 *       200:
 *         description: Total acumulado del carrito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 */
// ==========================================
// RUTA 5: CALCULAR EL TOTAL A PAGAR
// ==========================================
app.get('/total', async (req, res) => {
  try {
    // Usamos SQL (JOIN) para juntar el carrito y los productos, 
    // multiplicando la cantidad de items por el precio del producto y sumando todo.
    const row = await get(`
      SELECT SUM(c.cantidad * p.precio) as total 
      FROM carrito c 
      JOIN productos p ON c.producto_id = p.id
    `);
    const totalVal = row.total !== null ? row.total : 0.0;
    res.json({ total: totalVal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /vaciar:
 *   delete:
 *     summary: Vaciar el carrito
 *     responses:
 *       200:
 *         description: Carrito vaciado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 carrito:
 *                   type: object
 */
app.delete('/vaciar', async (req, res) => {
  try {
    await run('DELETE FROM carrito');
    res.json({ mensaje: 'Carrito vaciado', carrito: {} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// FALLBACK ROUTE: Para el SPA (React Router)
// ==========================================
// Cualquier ruta no manejada por la API se redirige a index.html
app.get('*', (req, res) => {
  const indexPath = path.join(
    __dirname, 
    isProd ? 'frontend/dist' : 'public', 
    'index.html'
  );
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(500).json({ error: 'index.html no encontrado' });
    }
  });
});

export default app;
