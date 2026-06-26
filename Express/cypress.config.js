import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5000",
    viewportWidth: 720,
    viewportHeight: 1280,
    defaultCommandTimeout: 5000,
    pageLoadTimeout: 5000,
  },
});
