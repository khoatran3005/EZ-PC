from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set up Selenium WebDriver
driver = webdriver.Chrome(executable_path='/path/to/chromedriver')  # Make sure to specify the path to chromedriver

# Navigate to the product details page
driver.get('http://localhost:3000/product-details')  # Replace with the actual URL of your product details page

# Wait for the product details to load
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'product-layout')))

# Verify the presence of the product image and details
product_image = driver.find_element(By.CLASS_NAME, 'card-img')
assert product_image.is_displayed(), "Product image not found or not displayed"

product_details = driver.find_element(By.CLASS_NAME, 'product-details')
assert product_details.is_displayed(), "Product details not found or not displayed"

# Click the "Back" button
back_button = driver.find_element(By.XPATH, '//button[@variant="secondary" and contains(text(), "Back")]')
back_button.click()

# Verify navigation back to the previous page
WebDriverWait(driver, 10).until(EC.url_contains('previous-page-url'))  # Replace 'previous-page-url' with the URL of the previous page

# Close the browser window
driver.quit()
