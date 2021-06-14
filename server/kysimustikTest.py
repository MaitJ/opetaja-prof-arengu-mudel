from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import random

import mysql.connector as mysql

db = mysql.connect(
    host = "localhost",
    user = "opprofmudeluser",
    passwd = "0pProfMudel10!",
    database = "opprofmudeldb2"
)

cursor = db.cursor()

cursor.execute("SELECT MAX(kysimus_vastus_id) FROM kysimus_vastus")

kysimusVastusStart = int(cursor.fetchone()[0])

driver = webdriver.Firefox()
driver.get('http://localhost:3000')

email = 'maitjurask1@test.ee'
password = 'Maitjurask10!'

loginElement = driver.find_element_by_id("loginLink")
loginElement.click()

driver.find_element_by_id("email").send_keys(email)
driver.find_element_by_id("password").send_keys(password)
driver.find_element_by_class_name("login-button").click()

time.sleep(2)

kysimustikElement = driver.find_elements_by_id("nav-item")[1]
kysimustikElement.click()

driver.find_element_by_class_name("kysimustik-button").click()

class Kysimus:
    def __init__(self, kysimus_id, kysimus_vastus_id, vastus, eneseanalyys):
        self.kysimus_id = kysimus_id
        self.kysimus_vastus_id = kysimus_vastus_id
        self.vastus = vastus
        self.eneseanalyys = eneseanalyys

kysimuseVastused = []

def endQuestionaire():
    try:
        driver.find_element_by_id("end-button").click()
        time.sleep(5)
        return False
    except:
        try:
            driver.find_element_by_class_name("kysimus-plokk")
            return True
        except:
            return False

    

kysimusCount = 0

while endQuestionaire():
    time.sleep(1)
    try:
        kysimusPlokk = driver.find_elements_by_class_name("kysimus-plokk")
        blockButtons = driver.find_elements_by_id("kysimuste-plokk-button")
        for kysimus in kysimusPlokk:
            currentVastusContainer = kysimus.find_element_by_class_name("vastuse-valik-container")
            currentVastusInputs = currentVastusContainer.find_elements_by_id("vastus")
            vastus = random.randint(0, 2)
            currentVastusInputs[vastus].click()
            currentEnesehinnang = kysimus.find_element_by_id("enesehinnangText")
            currentKysimusTekst = kysimus.find_element_by_class_name("kysimus")
            eneseanalyys = currentKysimusTekst.text[0:4]
            currentEnesehinnang.send_keys(eneseanalyys)
            kysimusCount += 1
            kysimusVastusStart += 1
            kysimuseVastused.append(Kysimus(kysimusCount, kysimusVastusStart, vastus, eneseanalyys))
        time.sleep(5)


        if len(blockButtons) <= 1:
            if blockButtons:
                if blockButtons[0].text == "Jargmine alamplokk":
                    blockButtons[0].click()
                else:
                    raise NameError('no next block button found')
            else:
                driver.find_element_by_id("next-page-button").click()
                time.sleep(5)
            
        else:
            if (blockButtons[1].text == "Jargmine alamplokk"):
                blockButtons[1].click()

    except NameError:
        time.sleep(2)
        try:
            driver.find_element_by_id("next-page-button").click()
            time.sleep(2)
            if endQuestionaire():
                print("Found end button: " + str(driver.find_element_by_id("end-button")))
            else:
                driver.find_element_by_class_name("next-block-button").click()
        except:
            print("Next page button wasnt found")


for kysimus in kysimuseVastused:
    print("id: {0}, kysimus_vastus_id: {1}, vastus: {2}, eneseanalyys: {3}".format(
        str(kysimus.kysimus_id),
        str(kysimus.kysimus_vastus_id),
        str(kysimus.vastus),
        str(kysimus.eneseanalyys)
    ))



driver.close()

