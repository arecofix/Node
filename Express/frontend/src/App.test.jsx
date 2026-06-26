// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import App from './App';

// Mock de fetch global
global.fetch = vi.fn();

const mockProductos = [
  { id: 1, nombre: 'python', precio: 10.0 },
  { id: 2, nombre: 'javascript', precio: 12.0 },
  { id: 3, nombre: 'java', precio: 19.0 },
];

describe('App Component (UI React Tests - Caja Blanca)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar la aplicacion y cargar productos al inicio', async () => {
    // Mock de las 3 peticiones iniciales
    fetch.mockImplementation((url) => {
      if (url === '/') return Promise.resolve({ ok: true, json: () => Promise.resolve(mockProductos) });
      if (url === '/carrito') return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      if (url === '/total') return Promise.resolve({ ok: true, json: () => Promise.resolve({ total: 0 }) });
      return Promise.reject(new Error('URL no mockeada: ' + url));
    });

    render(<App />);
    
    // Verificar renderizado inicial
    expect(screen.getByText('A Academy')).toBeInTheDocument();

    // Esperar a que los productos se carguen y se rendericen
    await waitFor(() => {
      expect(screen.getByText('python')).toBeInTheDocument();
      expect(screen.getByText('javascript')).toBeInTheDocument();
      expect(screen.getByText('java')).toBeInTheDocument();
    });

    // Verificar que el carrito esté vacío
    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
  });

  it('debe actualizar la UI al agregar un producto', async () => {
    fetch.mockImplementation((url, options) => {
      if (url.endsWith('/carrito')) return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      if (url.endsWith('/')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockProductos) });
      
      // Simular petición para agregar producto 1
      if (url.includes('/agregar/1') && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ '1': 1 }) });
      }
      
      // Manejar /total
      if (url.includes('/total')) {
         return Promise.resolve({ ok: true, json: () => Promise.resolve({ total: 10.0 }) });
      }
      
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('python')).toBeInTheDocument();
    });

    // Clic en el primer boton de agregar (que corresponde a Python)
    const addButtons = screen.getAllByText(/Agregar/i);
    fireEvent.click(addButtons[0]);

    // Verificar que el carrito muestra el ítem
    await waitFor(() => {
      const pythonTexts = screen.getAllByText(/python/i);
      expect(pythonTexts.length).toBeGreaterThanOrEqual(2);
      expect(screen.getByText(/Resumen de Compra/i)).toBeInTheDocument();
    });
  });

  it('maneja el caso de error de servidor (500) silenciosamente o manteniendo estado anterior', async () => {
    fetch.mockImplementation((url, options) => {
      if (url.endsWith('/carrito')) return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      if (url.endsWith('/total')) return Promise.resolve({ ok: true, json: () => Promise.resolve({ total: 0 }) });
      if (url.endsWith('/')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockProductos) });
      
      // Error intencional en POST
      if (url.includes('/agregar/1') && options?.method === 'POST') {
        return Promise.resolve({ ok: false, status: 500 });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('python')).toBeInTheDocument();
    });

    const addButtons = screen.getAllByText(/Agregar/i);
    fireEvent.click(addButtons[0]);

    // Al fallar silenciosamente, el carrito sigue vacío
    await waitFor(() => {
      expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
    });
  });
});
