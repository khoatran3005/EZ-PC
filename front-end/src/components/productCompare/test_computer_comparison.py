from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

# Set up Selenium WebDriver
driver = webdriver.Chrome(executable_path='/path/to/chromedriver')  # Make sure to specify the path to chromedriver

# Navigate to the computer comparison page
driver.get('http://localhost:3001/computer-compare')  # Replace with the actual URL of your computer comparison page

# Wait for the computers to load
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'compare-container')))

# Verify the presence of the comparison grid
comparison_grid = driver.find_element(By.CLASS_NAME, 'comparison-grid')
assert comparison_grid.is_displayed(), "Comparison grid not found or not displayed"

# Verify the presence and data of each computer
computers = driver.find_elements(By.CLASS_NAME, 'computer-specs')
for computer in computers:
    # Verify specific elements and data for each computer
    assert computer.find_element(By.CLASS_NAME, 'spec').is_displayed(), "Computer specs not found or not displayed"
    assert computer.find_element(By.CLASS_NAME, 'actions').is_displayed(), "Actions not found or not displayed"
    save_button = computer.find_element(By.XPATH, './/button[contains(text(), "Save")]')
    assert save_button.is_displayed(), "Save button not found or not displayed"
    
    # Click the "Save" button for each computer
    save_button.click()
    
    # Verify that the toast notification appears
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'Toastify__toast')))
    print("Toast notification appeared for computer:", computer.find_element(By.CLASS_NAME, 'spec').text)

# Click the "Back" button
back_button = driver.find_element(By.XPATH, '//button[@class="btn"]/a[contains(@href, "/suggest")]')
back_button.click()

# Verify the page redirection
WebDriverWait(driver, 10).until(EC.url_to_be('http://localhost:3000/suggest'))

# Close the browser window
driver.quit()
