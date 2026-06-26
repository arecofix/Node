import { describe, it, expect, beforeAll } from 'vitest';
import { initDb, query, get, run } from '../db.js';

process.env.NODE_ENV = 'test';

beforeAll(async () => {
  await initDb();
});

describe('Database Wrapper (db.js) - Caja Blanca', () => {
  it('query() debe resolver con un array de filas', async () => {
    const rows = await query('SELECT * FROM productos');
    expect(rows).toBeInstanceOf(Array);
    expect(rows.length).toBeGreaterThan(0);
  });

  it('get() debe resolver con un objeto o undefined', async () => {
    const row = await get('SELECT * FROM productos WHERE id = ?', [1]);
    expect(row).toBeDefined();
    expect(row.nombre).toBe('python');

    const emptyRow = await get('SELECT * FROM productos WHERE id = ?', [999]);
    expect(emptyRow).toBeUndefined();
  });

  it('query() debe rechazar correctamente si la sintaxis SQL es inválida', async () => {
    await expect(query('SELECT * FROM tabla_falsa')).rejects.toThrow();
  });

  it('get() debe rechazar correctamente si la sintaxis SQL es inválida', async () => {
    await expect(get('SELECT * FORM productos')).rejects.toThrow();
  });

  it('run() debe rechazar por violación de restricción UNIQUE/PRIMARY KEY', async () => {
    await expect(
      run("INSERT INTO productos (id, nombre, precio) VALUES (1, 'duplicado', 10.0)")
    ).rejects.toThrow(/UNIQUE constraint failed|PRIMARY KEY/);
  });

  it('run() debe rechazar por violación de foreign key al insertar producto inexistente en carrito', async () => {
    // Al intentar agregar al carrito un ID que no está en productos
    await expect(
      run("INSERT INTO carrito (producto_id, cantidad) VALUES (999, 1)")
    ).rejects.toThrow(/FOREIGN KEY constraint failed/);
  });
});
