import { defineConfig } from "cypress";

/**
 * Cypress Configuration - Clean Architecture
 * 
 * Separates concerns:
 * - Network config (baseUrl, requestTimeout)
 * - UI config (viewport, timeouts)
 * - E2E test hooks (setupNodeEvents)
 */
const BASE_URL = process.env.CYPRESS_BASE_URL || "http://localhost:5000";
const REQUEST_TIMEOUT = 8000; // Wait for server to respond
const PAGE_LOAD_TIMEOUT = 10000; // Wait for page to load
const COMMAND_TIMEOUT = 5000; // Wait for Cypress commands

export default defineConfig({
  projectId: undefined, // Set if using Cypress Cloud
  allowCypressEnv: false,

  e2e: {
    // ==========================================
    // Network Configuration
    // ==========================================
    baseUrl: BASE_URL,
    requestTimeout: REQUEST_TIMEOUT,
    responseTimeout: REQUEST_TIMEOUT,
    
    // ==========================================
    // Timeouts Configuration
    // ==========================================
    pageLoadTimeout: PAGE_LOAD_TIMEOUT,
    defaultCommandTimeout: COMMAND_TIMEOUT,
    
    // ==========================================
    // UI Configuration
    // ==========================================
    viewportWidth: 720,
    viewportHeight: 1280,
    video: false,
    screenshotOnRunFailure: true,
    
    // ==========================================
    // Node Events & Hooks
    // ==========================================
    setupNodeEvents(on, config) {
      // Handle test failures with detailed logging
      on("task", {
        log(message) {
          console.log(`[CYPRESS TEST] ${message}`);
          return null;
        },
      });
      
      return config;
    },
    
    // ==========================================
    // Test Files Pattern
    // ==========================================
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
  },
});
