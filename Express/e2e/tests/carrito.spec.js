import { test, expect } from '@playwright/test';

test.describe('Flujo E2E del Carrito de Compras', () => {
  
  test.beforeEach(async ({ request }) => {
    // Vaciar el carrito en el backend antes de cada test para tener un estado limpio
    await request.delete('/vaciar');
  });

  test('debe listar los productos y ejecutar el flujo completo de compra con persistencia', async ({ page }) => {
    // 1. Abrir la página del frontend
    await page.goto('/');

    // 2. Verificar que los productos se listen correctamente
    const pythonCard = page.locator('#product-card-1');
    const jsCard = page.locator('#product-card-2');
    const javaCard = page.locator('#product-card-3');

    await expect(pythonCard).toBeVisible();
    await expect(pythonCard.locator('.product-name')).toHaveText('python');
    await expect(pythonCard.locator('.product-price')).toHaveText('$10.00');

    await expect(jsCard).toBeVisible();
    await expect(javaCard).toBeVisible();

    // 3. Verificar que el carrito esté vacío inicialmente
    await expect(page.locator('#header-cart-count')).toHaveText('0');
    await expect(page.locator('#cart-empty-state')).toBeVisible();

    // 4. Agregar un curso de Python
    await page.locator('#btn-add-1').click();

    // Verificar indicador de cabecera y lista de carrito
    await expect(page.locator('#header-cart-count')).toHaveText('1');
    await expect(page.locator('#cart-item-1')).toBeVisible();
    await expect(page.locator('#qty-1')).toHaveText('1');
    await expect(page.locator('#cart-total')).toHaveText('$10.00');

    // 5. Incrementar cantidad de Python desde el carrito
    await page.locator('#btn-plus-1').click();
    await expect(page.locator('#qty-1')).toHaveText('2');
    await expect(page.locator('#cart-total')).toHaveText('$20.00');

    // 6. Agregar curso de JavaScript ($12.00)
    await page.locator('#btn-add-2').click();
    await expect(page.locator('#header-cart-count')).toHaveText('3');
    await expect(page.locator('#cart-item-2')).toBeVisible();
    await expect(page.locator('#qty-2')).toHaveText('1');
    await expect(page.locator('#cart-total')).toHaveText('$32.00');

    // 7. PRUEBA DE PERSISTENCIA: Recargar la página y verificar que el estado se mantiene
    await page.reload();
    await expect(page.locator('#header-cart-count')).toHaveText('3');
    await expect(page.locator('#cart-item-1')).toBeVisible();
    await expect(page.locator('#qty-1')).toHaveText('2');
    await expect(page.locator('#cart-item-2')).toBeVisible();
    await expect(page.locator('#qty-2')).toHaveText('1');
    await expect(page.locator('#cart-total')).toHaveText('$32.00');

    // 8. Decrementar / Quitar JavaScript del carrito
    await page.locator('#btn-minus-2').click();
    await expect(page.locator('#cart-item-2')).not.toBeVisible();
    await expect(page.locator('#header-cart-count')).toHaveText('2');
    await expect(page.locator('#cart-total')).toHaveText('$20.00');

    // 9. Finalizar la compra
    await page.locator('#btn-checkout').click();

    // Verificar modal de éxito
    const modal = page.locator('#checkout-modal');
    await expect(modal).toBeVisible();
    await expect(modal.locator('.modal-title')).toHaveText('¡Compra Exitosa!');

    // Cerrar modal
    await page.locator('#btn-close-modal').click();
    await expect(modal).not.toBeVisible();

    // Verificar que el carrito esté vacío después de finalizar la compra
    await expect(page.locator('#header-cart-count')).toHaveText('0');
    await expect(page.locator('#cart-empty-state')).toBeVisible();
  });

  test('debe permitir vaciar el carrito con el boton vaciar', async ({ page }) => {
    await page.goto('/');

    // Agregar Python y Java
    await page.locator('#btn-add-1').click();
    await page.locator('#btn-add-3').click();
    await expect(page.locator('#header-cart-count')).toHaveText('2');

    // Hacer click en Vaciar
    await page.locator('#btn-clear-cart').click();

    // Verificar carrito vacío
    await expect(page.locator('#header-cart-count')).toHaveText('0');
    await expect(page.locator('#cart-empty-state')).toBeVisible();
  });
});
