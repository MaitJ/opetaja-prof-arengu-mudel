from selenium import webdriver
from selenium.webdriver.common.keys import Keys

driver = webdriver.Firefox()
driver.get('http://localhost:3000')

email = 'maitjurask3@test.ee'
password = 'Maitjurask10!'

driver.find_element_by_xpath('//a[@href="login"]')