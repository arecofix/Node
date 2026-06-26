# 🛍️ Academy - Carrito de Compras Fullstack

Aplicación web fullstack que implementa un **carrito de compras interactivo** para cursos de programación. Cuenta con un frontend SPA en **React**, backend en **Express.js** y persistencia con **SQLite**.

### 🚀 Link de Deploy (después de hacer deploy)

```
https://tu-proyecto-arecofix.vercel.app
```

_Instrucciones completas en la sección "🚀 Deploy a Vercel" más abajo_

---

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
pnpm install

# 2. Iniciar el servidor
pnpm run start

# 3. Abrir en el navegador
# Frontend: http://localhost:5000
# API Docs: http://localhost:5000/api-docs
```

---

## 📁 Estructura de Archivos - Guía Rápida de Presentación

### 🔧 Backend (Node.js + Express)

| Archivo | Ubicación | Descripción |
|---------|-----------|-------------|
| **server.js** | `/server.js` | 🎯 **Punto de entrada principal**. Inicializa la BD y levanta el servidor en puerto 5000. |
| **app.js** | `/app.js` | 📡 **Configuración de Express**. Define todos los endpoints de la API REST y maneja Swagger. |
| **db.js** | `/db.js` | 🗄️ **Gestión de SQLite**. Crea tablas, gestiona conexiones y proporciona funciones query/run/get. |

### 📊 Base de Datos SQLite

| Ubicación | Descripción |
|-----------|-------------|
| **`database.sqlite`** | 💾 Archivo de BD (se genera automáticamente). Contiene 2 tablas principales. |

**Tablas en la BD:**
- `productos`: id, nombre, precio
- `carrito`: producto_id, cantidad

### 🎨 Frontend (React + Vite)

| Archivo | Ubicación | Descripción |
|---------|-----------|-------------|
| **App.jsx** | `/frontend/src/App.jsx` | 🎯 **Componente principal de React**. Donde están TODOS los llamados a la API. |
| **main.jsx** | `/frontend/src/main.jsx` | 📦 Punto de entrada del frontend. Renderiza la app. |
| **index.html** | `/frontend/index.html` | 🖥️ Template HTML. Vite lo procesa. |
| **index.css** | `/frontend/src/index.css` | 🎨 Estilos CSS de la aplicación. |

### 🧪 Testing

| Archivo | Ubicación | Tipo | Descripción |
|---------|-----------|------|-------------|
| **app.test.js** | `/tests/app.test.js` | Unitario | Tests con Vitest para los endpoints de la API. |
| **db.test.js** | `/tests/db.test.js` | Unitario | Tests para las funciones de BD. |
| **carrito.spec.js** | `/e2e/tests/carrito.spec.js` | E2E | Tests de flujo completo con Playwright. |

---

## � ¿Qué es Swagger? (Explicado para Principiantes)

### 🤔 Imagina que Swagger es como un "Manual de Instrucciones Interactivo" para tu API

**Sin Swagger:** Si le preguntas a alguien que use tu API, tiene que preguntarte:
- ¿Cuál es la dirección de tu servidor?
- ¿Cuáles son todos los "botones" (endpoints) que puedo presionar?
- ¿Qué información necesito enviar con cada botón?
- ¿Qué respuesta me vas a dar?

**Con Swagger:** Todo eso está documentado y **puedes probar los endpoints directamente desde el navegador** sin escribir código.

### 🎯 ¿Cómo funciona?

1. **Especificación OpenAPI:** En `app.js` escribimos comentarios especiales `@openapi` que describen cada endpoint
2. **Swagger UI:** Es una interfaz visual que **lee esos comentarios** y los convierte en una página web bonita
3. **Pruebas interactivas:** Desde esa página puedes hacer clic en botones y **probar los endpoints en tiempo real**

### 📍 Dónde está tu Swagger

```
http://localhost:5000/api-docs
```

Cuando abras esa URL verás:
- ✅ Todos tus endpoints listados
- ✅ Una descripción de qué hace cada uno
- ✅ Qué parámetros necesita
- ✅ Qué respuesta devuelve
- ✅ Botones para **probar cada endpoint**
- ✅ La respuesta real de tu servidor

### 💡 Ejemplo Real

**Endpoint:** `POST /agregar/1`

En el Swagger verás:
- **Descripción:** "Agregar producto al carrito"
- **Parámetro:** `id` (número, en la URL)
- **Respuesta esperada:** Un objeto con los productos en el carrito
- **Botón "Try it out":** Haz clic, y se ejecuta la acción real

```json
// Respuesta:
{
  "1": 1,      // Producto 1 → 1 unidad
  "2": 2       // Producto 2 → 2 unidades
}
```

### 🔍 Ventajas de Swagger

| Problema | Antes (sin Swagger) | Con Swagger |
|----------|---------------------|-------------|
| Documentación desactualizada | ❌ Tienes que actualizar un documento Word | ✅ Se actualiza automáticamente del código |
| Probar un endpoint | ❌ Abres Postman y escribes todo | ✅ Un clic en el navegador |
| ¿Qué devuelve un endpoint? | ❌ Preguntas por chat | ✅ Ves un ejemplo JSON |
| ¿Qué parámetros necesita? | ❌ Lees documentación confusa | ✅ Ves un formulario claro |

---

## �🔗 Endpoints de la API (en `app.js`)

Todos los llamados desde el frontend están en **`frontend/src/App.jsx` línea 3 en adelante**.

### Endpoints principales:

| Método | Endpoint | Descripción | Línea en App.jsx |
|--------|----------|-------------|------------------|
| **GET** | `/` | Obtiene lista de productos | Línea 59 |
| **GET** | `/carrito` | Obtiene el carrito actual | Línea 60 |
| **GET** | `/total` | Obtiene el total del carrito | Línea 61, 94, 110 |
| **POST** | `/agregar/{id}` | Agrega producto al carrito | Línea 88 |
| **DELETE** | `/eliminar/{id}` | Elimina producto del carrito | Línea 104 |
| **DELETE** | `/vaciar` | Vacía todo el carrito | Línea 120, 132 |

---

## 🎯 Cómo Presentar Rápidamente

### Paso 1: Mostrar la Interfaz (2 minutos)
1. Abre `http://localhost:5000` en el navegador
2. Muestra los 3 cursos disponibles (Python, JavaScript, Java)
3. Agrega algunos productos al carrito
4. Muestra que el total se calcula correctamente

### Paso 2: Mostrar la Persistencia (1 minuto)
1. Recarga la página (F5)
2. **Los productos se mantienen en el carrito** → La BD está funcionando

### Paso 3: Mostrar la API en Swagger (2 minutos)
1. Abre `http://localhost:5000/api-docs`
2. Prueba los endpoints:
   - GET `/` → muestra productos
   - POST `/agregar/1` → agrega producto
   - GET `/total` → muestra total
   - DELETE `/vaciar` → limpia carrito

### Paso 4: Mostrar el Código (3 minutos)

**Backend - Archivo `db.js`:**
- Muestra cómo se inicializa SQLite
- Muestra las tablas `productos` y `carrito`
- Explica las funciones `query()`, `run()`, `get()`

**Backend - Archivo `app.js`:**
- Muestra los endpoints definidos
- Señala cómo se comunica con la BD

**Frontend - Archivo `App.jsx`:**
- Línea 3: `const API_BASE = ''` (se conecta localmente)
- Línea 59-61: `useEffect` que carga datos iniciales
- Línea 88: `handleAddToCart` → POST `/agregar/{id}`
- Línea 104: `handleRemoveFromCart` → DELETE `/eliminar/{id}`
- Línea 120: `handleClearCart` → DELETE `/vaciar`

---

## 🧪 Testing con Cypress

### ¿Qué es Cypress?
Cypress es una herramienta de testing **E2E (End-to-End)** que permite automatizar pruebas en el navegador. Simula acciones reales del usuario (clicks, escritura, navegación) y valida comportamientos.

### 🚀 Abrir Cypress (Modo Interactivo)

```bash
# Terminal 1: Asegúrate que el servidor esté corriendo
pnpm run start

# Terminal 2: Abre Cypress en modo interactivo
pnpm run cypress
```

**Esto abrirá:**
- Una ventana de Cypress con una lista de tests disponibles
- Interfaz visual donde puedes **ver en tiempo real** qué hace el test
- Opción de pausar, reanudar y depurar

### 📝 Ejecutar Tests de Cypress (Headless)

```bash
# Ejecuta todos los tests sin interfaz gráfica
pnpm run cypress:run
```

### 🎯 Archivos de Tests de Cypress

| Ubicación | Descripción |
|-----------|-------------|
| `/cypress/e2e/1-getting-started/todo.cy.js` | ✅ Tests de ejemplo (verificar elementos HTML, agregar items) |
| `/cypress/e2e/2-advanced-examples/` | 📚 Más ejemplos (navegación, almacenamiento, red, etc.) |
| `/cypress.config.js` | ⚙️ Configuración de Cypress |

### 📋 Guía Paso a Paso: Hacer un Test en Cypress

#### 1️⃣ **Abrir Cypress en modo interactivo**
```bash
pnpm run cypress
```

#### 2️⃣ **Seleccionar un test**
- En la ventana de Cypress, haz clic en **`todo.cy.js`** (en la carpeta `1-getting-started`)
- Se abrirá un navegador mostrando el test en ejecución

#### 3️⃣ **Ver el test en acción**
El test hace lo siguiente:
```javascript
// Visita la URL
cy.visit('https://example.cypress.io/todo')

// Verifica que hay 2 items
cy.get('.todo-list li').should('have.length', 2)

// Verifica el texto del primer item
cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')

// Verifica el texto del último item
cy.get('.todo-list li').last().should('have.text', 'Walk the dog')

// Agrega un nuevo item escribiendo "Feed the cat"
cy.get('[data-test=new-todo]').type('Feed the cat{enter}')
```

#### 4️⃣ **Entender los comandos de Cypress**

| Comando | Qué hace | Ejemplo |
|---------|----------|---------|
| `cy.visit()` | Navega a una URL | `cy.visit('http://localhost:5000')` |
| `cy.get()` | Selecciona elementos HTML | `cy.get('.product-card')` |
| `cy.type()` | Escribe texto en un input | `cy.type('JavaScript{enter}')` |
| `cy.click()` | Hace clic en un elemento | `cy.click()` |
| `cy.should()` | Valida que algo sea verdadero | `.should('have.text', 'Hola')` |
| `cy.intercept()` | Intercepta llamadas HTTP | `cy.intercept('GET', '/api/*')` |

#### 5️⃣ **Pausar y Depurar un Test**
- En Cypress, haz clic en el icono de **pausa** (⏸️) en la barra de herramientas
- Luego puedes inspeccionar elementos, ver el DOM, etc.
- Presiona play (▶️) para continuar

### 💡 Crear tu Propio Test para el Carrito

Para crear un test que valide tu carrito de compras, crea un archivo `/cypress/e2e/carrito-test.cy.js`:

```javascript
describe('Carrito de Compras', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000')
  })

  it('debe mostrar los productos disponibles', () => {
    // Verifica que hay 3 tarjetas de productos
    cy.get('.product-card').should('have.length', 3)
  })

  it('debe agregar un producto al carrito', () => {
    // Haz clic en el botón agregar del primer producto
    cy.get('#btn-add-1').click()
    
    // Verifica que el carrito ahora tiene 1 item
    cy.get('#header-cart-count').should('have.text', '1')
  })

  it('debe calcular el total correctamente', () => {
    // Agrega 2 productos
    cy.get('#btn-add-1').click()
    cy.get('#btn-add-2').click()
    
    // Verifica que el total se muestra correctamente
    cy.get('.cart-total').should('contain', '$')
  })

  it('debe persistir el carrito después de recargar', () => {
    // Agrega un producto
    cy.get('#btn-add-1').click()
    
    // Recarga la página
    cy.reload()
    
    // Verifica que el producto sigue en el carrito
    cy.get('#header-cart-count').should('have.text', '1')
  })

  it('debe vaciar el carrito', () => {
    // Agrega un producto
    cy.get('#btn-add-1').click()
    
    // Haz clic en vaciar carrito
    cy.get('#btn-clear-cart').click()
    
    // Verifica que el carrito está vacío
    cy.get('#header-cart-count').should('have.text', '0')
  })
})
```

Luego ejecuta: `pnpm run cypress`

---

## 🏗️ Arquitectura

```
Express Server (Puerto 5000)
    ↓
[API Endpoints] ← → [SQLite BD]
    ↓
[Vite + React Frontend]
    ↓
Llamadas fetch() desde App.jsx
```

**Flujo de un agregado al carrito:**
1. Usuario hace click en "Agregar" en React (`App.jsx`)
2. Se dispara `handleAddToCart()` → `fetch POST /agregar/{id}`
3. Express recibe la petición en `app.js`
4. Express actualiza la tabla `carrito` en SQLite (`db.js`)
5. Express devuelve el carrito actualizado
6. React actualiza el estado y renderiza la UI

---

## 📚 Tecnologías Utilizadas

- **Frontend:** React 19, Vanilla CSS, Vite
- **Backend:** Node.js, Express.js 5, CORS
- **Base de Datos:** SQLite3
- **Testing:** Vitest, Supertest, Playwright
- **Documentación:** Swagger UI + JSDoc

---

## 🚀 Deploy a Vercel (Monorepo Fullstack)

Este proyecto está configurado para **deploy en Vercel como monorepo** (frontend + backend en el mismo lugar).

### 📋 Requisitos Previos

1. **Cuenta en Vercel:** https://vercel.com/
2. **Git instalado** y repositorio de GitHub
3. **Proyecto en GitHub** (push de tu código a GitHub)

### 🔧 Pasos para hacer Deploy

#### Paso 1: Sube tu proyecto a GitHub

```bash
# Si no tienes un repo aún
git init
git add .
git commit -m "Initial commit: Carrito de Compras Fullstack"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

#### Paso 2: Conecta GitHub con Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Click en **"Import Git Repository"**
3. Busca tu repositorio en GitHub y selecciona **"Import"**

#### Paso 3: Configura las variables de entorno (si es necesario)

En la página de configuración de Vercel, en la sección **"Environment Variables"**:

```
NODE_ENV = production
```

(Si usas otras variables, agrégalas aquí)

#### Paso 4: Deploy

1. Deja todas las otras configuraciones por defecto
2. Click en **"Deploy"**
3. ¡Listo! Vercel construirá y desplegará tu proyecto automáticamente

### 🌐 Accede a tu Aplicación

Una vez completado el deploy, Vercel te dará una URL como:

```
https://tu-proyecto-arecofix.vercel.app
```

- **Frontend:** https://tu-proyecto-arecofix.vercel.app
- **API Docs (Swagger):** https://tu-proyecto-arecofix.vercel.app/api-docs
- **API Endpoints:** https://tu-proyecto-arecofix.vercel.app/api/* (mismo dominio)

### ⚙️ Cómo Funciona el Deploy

**Estructura de carpetas:**
```
project/
├── server.js          → Backend (Express)
├── app.js             → Configuración API
├── db.js              → Base de datos
├── vercel.json        → Configuración de Vercel
├── frontend/
│   ├── src/
│   ├── index.html
│   └── dist/          → Frontend compilado (después del build)
└── package.json       → Dependencias
```

**¿Qué hace Vercel al deployar?**

1. **Build:** Ejecuta `npm run build`
   - Compila React (Vite) → genera `frontend/dist/`
2. **Deploy Node.js:** Levanta el servidor Express en puerto dinámico
3. **Configuración:** Usa `vercel.json` para:
   - Servir el frontend desde `frontend/dist/`
   - Enrutar peticiones a `/api/*` hacia Express
   - Redirigir rutas desconocidas a `index.html` (SPA)

### 🔄 Redeploy Automático

Cada vez que hagas `git push` a `main`, Vercel **automáticamente**:
1. Obtiene los cambios de GitHub
2. Compila el proyecto
3. Deploy en vivo

### 🗄️ ⚠️ Importante: Base de Datos

En Vercel, SQLite **no es persistente** (se borra en cada redeploy). Para producción, considera:

**Opción 1 (Simple):** Mantener SQLite (datos se resetean en cada deploy)
- ✅ Fácil
- ❌ Datos se pierden

**Opción 2 (Recomendado):** Usar PostgreSQL gratis en Supabase

```bash
# 1. Crea una DB en supabase.io (PostgreSQL gratis)
# 2. Obtén la URL de conexión
# 3. En vercel.json, agrega:
```

```json
"env": {
  "DATABASE_URL": "@database-url"
}
```

```bash
# 4. En Vercel dashboard, en Settings > Environment Variables:
#    DATABASE_URL = (tu URL de Supabase)
# 5. Actualiza db.js para usar PostgreSQL en lugar de SQLite
```

### 🐛 Solucionar Problemas

| Problema | Solución |
|----------|----------|
| `Error: Cannot find module` | Asegúrate que `npm install` haya corrido. Vercel lo hace automáticamente. |
| `frontend/dist no encontrado` | Verifica que `npm run build` compile correctamente. Revisa `vite.config.js` |
| `API devuelve 404` | Verifica que `vercel.json` esté bien configurado. Las rutas `/api/*` deben apuntar a `server.js` |
| `Datos se pierden después del deploy` | Normal con SQLite. Considera migrar a PostgreSQL. |
| `Error de CORS` | Ya está configurado en `app.js`. Si aún tienes problemas, revisa que `cors()` sea el primer middleware. |

### 📝 Ejemplo: URL de tu Proyecto

Si tu usuario de Vercel es **arecofix** y el proyecto se llama **academy-cart**, verás:

- **URL principal:** https://academy-cart-arecofix.vercel.app
- **Swagger:** https://academy-cart-arecofix.vercel.app/api-docs
- **Obtener productos:** https://academy-cart-arecofix.vercel.app/ (GET)
- **Agregar al carrito:** https://academy-cart-arecofix.vercel.app/agregar/1 (POST)

---

## 🎓 Criterios de Evaluación Cubiertos

✅ **Correctitud:** CRUD completo del carrito  
✅ **Persistencia:** Datos guardados en SQLite (o PostgreSQL en producción)  
✅ **Cálculo correcto:** Total actualizado en tiempo real  
✅ **Código limpio:** Separación de responsabilidades (db.js, app.js, server.js)  
✅ **Testing:** Cobertura con Vitest y E2E con Playwright  
✅ **Documentación:** API documentada con Swagger  
✅ **Deploy:** Configurado para Vercel como monorepo fullstack

---

## 🔍 Dificultades Resueltas

| Problema | Solución | Ubicación |
|----------|----------|-----------|
| Sincronización carrito | Esperar respuesta de API antes de actualizar estado | `App.jsx` línea 88-96 |
| Persistencia en E2E | Usar `page.reload()` en tests para validar BD | `e2e/tests/carrito.spec.js` |
| Favicon 404 | Agregar ruta GET `/favicon.ico` en Express | `app.js` línea 16 |
| Frontend + Backend en Vercel | Configurar `vercel.json` y rutas de fallback | `vercel.json` y `app.js` línea 325+ |
| Swagger en producción | Detectar `VERCEL_URL` y usar URL dinámica | `app.js` línea 30 |

---

_Nota para el alumno: El proyecto está completamente configurado para deploy. Solo falta hacer push a GitHub y conectar con Vercel (ver sección "🚀 Deploy a Vercel" arriba). El link se mostrará después del primer deploy en Vercel._
