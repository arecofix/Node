import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { initDb, run } from '../db.js';

// Usar base de datos en memoria para los tests
process.env.NODE_ENV = 'test';

beforeAll(async () => {
  await initDb();
});

beforeEach(async () => {
  // Limpiar el carrito antes de cada test para que sean independientes
  await run('DELETE FROM carrito');
});

describe('Carrito API Endpoints', () => {
  it('GET / debe retornar todos los productos de la semilla', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(3);
    
    const nombres = res.body.map(p => p.nombre);
    expect(nombres).toContain('python');
    expect(nombres).toContain('javascript');
    expect(nombres).toContain('java');
  });

  it('GET /carrito debe retornar un carrito vacio inicialmente', async () => {
    const res = await request(app).get('/carrito');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({});
  });

  it('POST /agregar/:id debe agregar productos y retornar el carrito actualizado', async () => {
    const res1 = await request(app).post('/agregar/1');
    expect(res1.status).toBe(200);
    expect(res1.body).toEqual({ '1': 1 });

    const res2 = await request(app).post('/agregar/1');
    expect(res2.status).toBe(200);
    expect(res2.body).toEqual({ '1': 2 });

    const res3 = await request(app).post('/agregar/2');
    expect(res3.status).toBe(200);
    expect(res3.body).toEqual({ '1': 2, '2': 1 });
  });

  it('POST /agregar/:id debe retornar 404 si el producto no existe', async () => {
    const res = await request(app).post('/agregar/999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('DELETE /eliminar/:id debe decrementar y eventualmente quitar del carrito', async () => {
    // Cargar productos de prueba
    await request(app).post('/agregar/1');
    await request(app).post('/agregar/1');
    await request(app).post('/agregar/2');

    // Decrementar cantidad de id:1
    const res1 = await request(app).delete('/eliminar/1');
    expect(res1.status).toBe(200);
    expect(res1.body).toEqual({ '1': 1, '2': 1 });

    // Quitar por completo id:1
    const res2 = await request(app).delete('/eliminar/1');
    expect(res2.status).toBe(200);
    expect(res2.body).toEqual({ '2': 1 });

    // Quitar por completo id:2
    const res3 = await request(app).delete('/eliminar/2');
    expect(res3.status).toBe(200);
    expect(res3.body).toEqual({});
  });

  it('DELETE /eliminar/:id debe retornar 404 si el producto no esta en el carrito', async () => {
    const res = await request(app).delete('/eliminar/1');
    expect(res.status).toBe(404);
  });

  it('GET /total debe retornar la suma correcta de precios y cantidades', async () => {
    // python (10.0) * 2 + java (19.0) * 1 = 39.0
    await request(app).post('/agregar/1');
    await request(app).post('/agregar/1');
    await request(app).post('/agregar/3');

    const res = await request(app).get('/total');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ total: 39.0 });
  });

  it('DELETE /vaciar debe limpiar el carrito por completo', async () => {
    await request(app).post('/agregar/1');
    await request(app).post('/agregar/2');

    const res = await request(app).delete('/vaciar');
    expect(res.status).toBe(200);
    expect(res.body.mensaje).toBe('Carrito vaciado');
    expect(res.body.carrito).toEqual({});

    const getRes = await request(app).get('/carrito');
    expect(getRes.body).toEqual({});
  });

  // --- Pruebas de Caja Blanca / Edge Cases ---
  it('POST /agregar/:id debe retornar 400 o fallar si el id no es un numero valido', async () => {
    // Si pasamos letras, la API debe validar que no es un número y retornar 400 Bad Request
    const res = await request(app).post('/agregar/abc');
    expect(res.status).toBe(400);
  });

  it('DELETE /eliminar/:id debe retornar 400 o fallar si el id no es un numero valido', async () => {
    const res = await request(app).delete('/eliminar/abc');
    expect(res.status).toBe(400);
  });
});
