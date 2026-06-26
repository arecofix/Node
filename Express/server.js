import app from './app.js';
import { initDb } from './db.js';

const PORT = process.env.PORT || 5000;

// En Vercel no usamos app.listen(), exportamos la app directamente
if (process.env.VERCEL) {
  initDb().catch(console.error);
} else {
  // Inicializa la BD antes de levantar el servidor localmente
  initDb()
    .then(() => {
      console.log('Database initialized successfully.');
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
      });
    })
    .catch((err) => {
      console.error('Failed to initialize database:', err);
      process.exit(1);
    });
}

export default app;
