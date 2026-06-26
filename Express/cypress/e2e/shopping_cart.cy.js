describe('Shopping Cart E2E', () => {
  beforeEach(() => {
    // Clear the cart via API to ensure a clean state reliably
    cy.request('DELETE', '/vaciar');
    
    // Visit the base URL
    cy.visit('/');
    
    // Wait for the app to finish loading (loading text disappears)
    cy.contains('Cargando tienda...').should('not.exist');
  });

  it('completes the full purchase flow successfully', () => {
    // 1. Verify the initial state: empty cart
    cy.get('#cart-empty-state').should('be.visible');
    cy.get('#header-cart-count').should('contain', '0');

    // 2. Add the first product to the cart
    // Assuming product with ID 1 exists (e.g., Python or JS course)
    cy.get('#btn-add-1').should('be.visible').click();

    // 3. Verify the product was added to the cart
    cy.get('#header-cart-count').should('contain', '1');
    cy.get('#cart-items-container').should('be.visible');
    cy.get('#cart-item-1').should('be.visible');
    cy.get('#qty-1').should('contain', '1');

    // 4. Increase the quantity of the product
    cy.get('#btn-plus-1').click();
    cy.get('#header-cart-count').should('contain', '2');
    cy.get('#qty-1').should('contain', '2');

    // 5. Decrease the quantity of the product
    cy.get('#btn-minus-1').click();
    cy.get('#header-cart-count').should('contain', '1');
    cy.get('#qty-1').should('contain', '1');

    // 6. Verify total is greater than 0
    cy.get('#cart-total').invoke('text').then((text) => {
      const total = parseFloat(text.replace('$', ''));
      expect(total).to.be.greaterThan(0);
    });

    // 7. Proceed to checkout
    cy.get('#btn-checkout').click();

    // 8. Verify the success modal appears
    cy.get('#checkout-modal').should('be.visible');
    cy.get('.modal-title').should('contain', '¡Compra Exitosa!');

    // 9. Close the modal
    cy.get('#btn-close-modal').click();
    cy.get('#checkout-modal').should('not.exist');

    // 10. Verify the cart is empty again
    cy.get('#cart-empty-state').should('be.visible');
    cy.get('#header-cart-count').should('contain', '0');
  });
});
