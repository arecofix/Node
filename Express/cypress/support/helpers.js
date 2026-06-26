/**
 * Cypress Test Helpers - Clean Architecture
 * 
 * Centralized utilities for common test operations
 * Reduces code duplication and improves maintainability
 */

/**
 * Wait for API response and verify status
 * @param {string} method - HTTP method (GET, POST, DELETE)
 * @param {string} url - API endpoint URL pattern
 * @param {number} statusCode - Expected HTTP status code
 * @returns {object} Intercepted request/response
 */
export const waitForApiResponse = (method, url, statusCode = 200) => {
  cy.intercept(method, url).as(`api${method}${Date.now()}`);
  cy.wait(`@api${method}${Date.now()}`).then((interception) => {
    expect(interception.response.statusCode).to.equal(statusCode);
  });
};

/**
 * Add multiple products to cart
 * @param {number[]} productIds - Array of product IDs to add
 */
export const addProductsToCart = (productIds) => {
  productIds.forEach((id) => {
    cy.get(`[data-testid="btn-add-${id}"]`).click();
    cy.wait(300); // Wait for animation
  });
};

/**
 * Verify cart total is displayed correctly
 * @param {string} expectedTotal - Expected total value
 */
export const verifyCartTotal = (expectedTotal) => {
  cy.get('[data-testid="cart-total"]')
    .should('exist')
    .should('contain', expectedTotal);
};

/**
 * Clear all data and reset application
 */
export const resetApp = () => {
  cy.visit('/');
  cy.get('[data-testid="btn-clear-cart"]').then(($btn) => {
    if ($btn.length > 0) {
      cy.wrap($btn).click();
    }
  });
  cy.wait(500);
};

/**
 * Get cart count from UI
 * @returns {Chainable} Cypress chainable for assertion
 */
export const getCartCount = () => {
  return cy.get('[data-testid="cart-count"]');
};
