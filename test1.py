from selenium import webdriver
from selenium.webdriver.common.keys import Keys
d=webdriver.Chrome()
d.get("https://www.google.com")
d.find_element("name","q").send_keys("Selenium Webdriver\n")
print("test successful")
d.quit()
