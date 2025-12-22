//import { test, expect } from '@playwright/test';
import {Login} from '../page-objects/login'
import { test, expect } from '../tests/Fixtures/auth-fixture';
import { Payment } from '../page-objects/payment';
import { Register } from '../page-objects/register';

async function addFirstProductToCart(page) {
    await page.getByRole('link', { name: 'Products' }).first().click();
    await page.getByRole('link', { name: 'View Product' }).first().click();
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.getByRole('link', { name: 'View Cart' }).click();
  }

test.describe('Unathenticated Flows', () => { 

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.logo')).toBeVisible();
  });

  test('Register', async ({ page }) => {
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    const register = new Register(page);
    await register.userRegistration('Amidat', 'amidat12@gmail.com', 'Ola@123', '12', '3', '2006', 'Amidat', 'Bello', 'Arsenal FC', '17 Belarus','Canada', 'Ontario', 'Maryland', '120987', '56783422')
    await page.getByRole('link', { name: 'Delete Account' }).click();
    await expect(page.getByText('Account Deleted!')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });
  
  test('Login - Valid', async ({ page }) => {
      await page.getByRole('link', { name: 'Signup / Login' }).click();
      const login = new Login(page);
        await login.loginWithUsernameAndPassword('Ola123@gmail.com', 'ola@123');
        await expect(page.getByText('Logged in as Ola')).toBeVisible()
  });
  
  test('Login - Invalid Password', async ({ page }) => {
      await page.getByRole('link', { name: 'Signup / Login' }).click();
      const login = new Login(page);
      await login.loginWithUsernameAndPassword('Ola123@gmail.com', 'ola@13');
      await expect(page.getByText('Your email or password is incorrect!')).toBeVisible()
  });
  
  test('Logout', async ({ page }) => {
      await page.getByRole('link', { name: 'Signup / Login' }).click();
      const login = new Login(page);
      await login.loginWithUsernameAndPassword('Ola123@gmail.com', 'ola@123');
      await expect(page.getByText('Logged in as Ola')).toBeVisible()
      await page.getByRole('link', { name: 'Logout' }).click()
      await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  });
  
  test('Register user with existing email', async ({ page }) => {
      await page.getByRole('link', { name: 'Signup / Login' }).click();
      await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
      await page.getByRole('textbox', { name: 'Name' }).fill('Ola')
      await page.locator('[data-qa="signup-email"]').fill('Ola123@gmail.com')
      await page.getByRole('button', { name: 'Signup' }).click();
      await expect(page.getByText('Email Address already exist!')).toBeVisible()
  }); 

// CATEGORY B --- 14, 15 , 20, 23   CATEGORY C - 25, 26

test('Test Case 14: Place Order: Register while Checkout', async ({ page }) => {
    await expect(page.locator('.logo')).toBeVisible();
    await addFirstProductToCart(page);
    await expect(page.getByText('Shopping Cart')).toBeVisible();
    await page.getByText('Proceed To Checkout').click();
    await page.getByRole('link', { name: 'Register / Login' }).click();
    const register = new Register(page);
    await register.userRegistration('Olamide', 'amidat24@gmail.com', 'Ola@123', '10', '4', '2001', 'Olamide', 'Bello', 'Arsenal FC', '17 Belarus','Canada', 'Ontario', 'Maryland', '122987', '56793422')
    await page.getByRole('link', { name: 'Cart' }).click()
    await page.getByText('Proceed To Checkout').click();
    await expect(page.getByRole('heading', { name: 'Your delivery address' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Your billing address' })).toBeVisible();
    await page.locator('textarea[name="message"]').fill('Testing is so cool, Automation wowowow')
    await page.getByRole('link', { name: 'Place Order' }).click()
    const cardDetails = new Payment(page);
    await cardDetails.enterCardDetails('Amidat Bello', '1234567890', '435', '12', '2029')
    await expect(page.getByText('Congratulations! Your order')).toBeVisible()
    await page.getByRole('link', { name: 'Continue' }).click()
  });

  test('Test Case 15: Place Order: Login while Checkout', async ({ page }) => {
    await expect(page.locator('.logo')).toBeVisible();
    await addFirstProductToCart(page);
    await expect(page.getByText('Shopping Cart')).toBeVisible();
    await page.getByText('Proceed To Checkout').click();
    await page.getByRole('link', { name: 'Register / Login' }).click();
    const login = new Login(page);
    await login.loginWithUsernameAndPassword('Ola123@gmail.com', 'ola@123');
    await page.getByRole('link', { name: 'Cart' }).click()
    await page.getByText('Proceed To Checkout').click();
    await expect(page.getByRole('heading', { name: 'Your delivery address' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Your billing address' })).toBeVisible();
    await page.locator('textarea[name="message"]').fill('Testing is so cool, Automation wowowow')
    await page.getByRole('link', { name: 'Place Order' }).click()
    const cardDetails = new Payment(page);
    await cardDetails.enterCardDetails('Amidat Bello', '1234567890', '435', '12', '2029')
    await expect(page.getByText('Congratulations! Your order')).toBeVisible()
    await page.getByRole('link', { name: 'Continue' }).click()
  });

  test('Test Case 20: Search Products and Verify Cart After Login', async ({ page }) => {
    await page.getByRole('link', { name: 'Products' }).click();
    await page.getByRole('textbox', { name: 'Search Product' }).fill('Winter Top')
    await page.locator('#submit_search').click()
    await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
    await expect(page.getByText('Winter Top').nth(1)).toBeVisible()
    await page.locator('[data-product-id]').first().click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    const login = new Login(page);
    await login.loginWithUsernameAndPassword('Ola123@gmail.com', 'ola@123');
    await page.getByRole('link', { name: 'Cart' }).click()
    await expect(page.getByRole('link', { name: 'Winter Top' })).toBeVisible();
});

});

test.describe('Authentication Flows', () => {

    test.beforeEach(async ({ authenticatedPage }) => {
     await authenticatedPage.goto('/');
      await expect(authenticatedPage.getByText('Logged in as Ola')).toBeVisible()
    });

test('Contact Us Form', async ({ authenticatedPage }) => {
    await authenticatedPage.getByRole('link', { name: 'Contact us' }).click();
    await authenticatedPage.getByRole('textbox', { name: 'Name' }).fill('Amidat ');
    await authenticatedPage.getByRole('textbox', { name: 'Email', exact: true }).fill('Ola123@gmail.com');
    await authenticatedPage.getByRole('textbox', { name: 'Subject' }).fill('Testing - Contact Us');
    await authenticatedPage.getByRole('textbox', { name: 'Your Message Here' }).fill('Testing Testing Testing');
    await authenticatedPage.getByRole('button', { name: 'Submit' }).click()
    //await page.getByRole('button', { name: 'Choose File' }).setInputFiles(' -2.jpg');
    authenticatedPage.on('dialog', dialog => {
    expect (dialog.message()).toEqual('Press OK to proceed!')
    dialog.accept()})
    await expect(authenticatedPage.locator('.status')).toHaveText('Success! Your details have been submitted successfully.')
});

test('Validate Test Cases Page', async ({ authenticatedPage }) => {
    await authenticatedPage.getByRole('link', { name: 'Test Cases' }).first().click();
    await expect(authenticatedPage.getByRole('heading', { name: 'Test Cases', exact: true }).locator('b')).toBeVisible()
});

test('Verify All Products and product detail page', async ({ authenticatedPage }) => {
    await authenticatedPage.getByRole('link', { name: 'Products' }).first().click();
    await authenticatedPage.getByRole('link', { name: 'View Product' }).first().click()
    await expect(authenticatedPage.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
    await expect(authenticatedPage.getByText('Category: Women > Tops')).toBeVisible();
    await expect(authenticatedPage.getByText('Rs. 500')).toBeVisible();
    await expect(authenticatedPage.getByText('Availability: In Stock')).toBeVisible();
    await expect(authenticatedPage.getByText('Condition: New')).toBeVisible();
    await expect(authenticatedPage.getByText('Brand: Polo')).toBeVisible();
});

test('Search Product', async ({ authenticatedPage }) => {
    await authenticatedPage.getByRole('link', { name: 'Products' }).first().click();
    await authenticatedPage.getByRole('textbox', { name: 'Search Product' }).fill('Winter Top')
    await authenticatedPage.locator('#submit_search').click()
    await expect(authenticatedPage.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
    await expect(authenticatedPage.getByText('Winter Top').nth(1)).toBeVisible()
});

test('Verify Subscription in home page', async ({ authenticatedPage }) => {
    await expect(authenticatedPage.getByRole('heading', { name: 'Subscription' })).toBeVisible()
    await authenticatedPage.getByRole('textbox', { name: 'Your email address' }).fill('amidats153@gmail.com')
    await authenticatedPage.locator('#subscribe').click()
    await expect(authenticatedPage.getByText('You have been successfully subscribed!')).toBeVisible()
});

test('Test Case 12: Add Products in Cart', async ({ authenticatedPage }) => {
    await authenticatedPage.getByRole('link', { name: 'Products' }).first().click();
    const products = authenticatedPage.locator('.features_items');
    await products.locator('[data-product-id="1"]').first().click();
    await authenticatedPage.getByRole('button', { name: 'Continue Shopping' }).click();
    await products.locator('[data-product-id="2"]').first().click();
    await authenticatedPage.getByRole('link', { name: 'View Cart' }).click(); 
    await expect(authenticatedPage.getByText('Shopping Cart')).toBeVisible();
    await expect(authenticatedPage.getByRole('link', { name: 'Blue Top' })).toBeVisible();
    await expect(authenticatedPage.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();
  });
  
  test('Test Case 13: Verify product quantity in cart', async ({ authenticatedPage }) => {
    await authenticatedPage.getByRole('link', { name: 'Products' }).first().click();
    const products = authenticatedPage.locator('.features_items');
    await authenticatedPage.getByRole('link', { name: 'View Product' }).first().click()
    await authenticatedPage.locator('#quantity').fill('4');
    await authenticatedPage.getByRole('button', { name: 'Add to cart' }).click();
    await authenticatedPage.getByRole('link', { name: 'View Cart' }).click();
    await expect(authenticatedPage.getByText('Shopping Cart')).toBeVisible();
    await expect(authenticatedPage.locator('.cart_quantity')).toHaveText('4');
  });

  test('Test Case 16: Place Order', async ({ authenticatedPage }) => {
    await authenticatedPage.getByRole('link', { name: 'Products' }).first().click();
    const products = authenticatedPage.locator('.features_items');
    await products.locator('[data-product-id="1"]').first().click();
    await authenticatedPage.getByRole('link', { name: 'View Cart' }).click(); 
    await expect(authenticatedPage.getByText('Shopping Cart')).toBeVisible();
    await expect(authenticatedPage.getByRole('link', { name: 'Blue Top' })).toBeVisible();
    await authenticatedPage.getByText('Proceed To Checkout').click();
    await expect(authenticatedPage.getByRole('heading', { name: 'Your delivery address' })).toBeVisible();
    await expect(authenticatedPage.getByRole('heading', { name: 'Your billing address' })).toBeVisible();
    await authenticatedPage.locator('textarea[name="message"]').fill('Testing is so cool, Automation wowowow')
    await authenticatedPage.getByRole('link', { name: 'Place Order' }).click()
    const cardDetails = new Payment(authenticatedPage);
    await cardDetails.enterCardDetails('Amidat Bello', '1234567890', '435', '12', '2029')
    await expect(authenticatedPage.getByText('Congratulations! Your order')).toBeVisible()
    await authenticatedPage.getByRole('link', { name: 'Continue' }).click()
  });
  
  test('Test Case 17: Remove Products From Cart', async ({ authenticatedPage }) => {
    await authenticatedPage.getByRole('link', { name: 'Products' }).first().click();
    const products = authenticatedPage.locator('.features_items');
    await products.locator('[data-product-id="1"]').first().click();
    await authenticatedPage.getByRole('link', { name: 'View Cart' }).click(); 
    await expect(authenticatedPage.getByText('Shopping Cart')).toBeVisible();
    await expect(authenticatedPage.getByRole('link', { name: 'Blue Top' })).toBeVisible();
    await authenticatedPage.locator('.cart_quantity_delete').first().click()
  });

});

