from selenium import webdriver 
from selenium.webdriver.chrome.service import Service 
from selenium.webdriver.chrome.options import Options 
from selenium.webdriver.chrome.webdriver import WebDriver 
from webdriver_manager.chrome import ChromeDriverManager 
from selenium.webdriver.common.by import By 
from selenium.webdriver.remote.webelement import WebElement 
import time 
import html 
import pandas
option = Options() 
option.add_experimental_option("detach", True) 
driver:WebDriver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=option) 

def explore_category(category_element:WebElement) -> list[tuple[str,str,str,str]] : 
    category_element.click() 
    time.sleep(0.5) 
    current_subcategories_ul_element = driver.find_element(By.XPATH, ".//ul[contains(@class, 'hmenu-visible')]") 
    list_children = current_subcategories_ul_element.find_elements(By.XPATH, ".//li") 
    category_name = category_element.find_element(By.XPATH, ".//div").get_attribute("innerHTML") 
    print(category_name)
    go_back_button = list_children.pop(0) 
    sub_category = None 
    result : list[tuple[str,str,str,str]] = [] 
    # return [] 
    for list_child in list_children: 
        try: 
            sub_category = list_child.find_element(By.XPATH, ".//div[contains(@class, 'hmenu-title')]").get_attribute("innerHTML") 
            continue 
        except: 
            None 
        try: 
            sub_sub_category_elemnt = list_child.find_element(By.XPATH, ".//a") 
            sub_sub_category_name = html.unescape(sub_sub_category_elemnt.get_attribute("innerHTML")) 
            sub_sub_category_link = sub_sub_category_elemnt.get_attribute("href") 
            result.append((category_name, sub_category, sub_sub_category_name,sub_sub_category_link)) 
            continue 
        except: None 
    go_back_button.click() 
    time.sleep(0.5) 
    return result 
    
def get_all_amazon_data(): 
    driver.get("https://www.amazon.in") 
    # driver.maximize_window() 
    all_hambug_menu_anchor = driver.find_element(By.ID, 'nav-hamburger-menu') 
    all_hambug_menu_anchor.click() 
    driver.find_element(By.XPATH, './/a[contains(@class, \'hmenu-compressed-btn\')]').click() 
    all_amazon_options = driver.find_element(By.ID, 'nav-hamburger-menu').find_element(By.XPATH, "//ul[contains(@data-menu-id, 1)]") 
    current_heading = None 
    amNotHeadingElement = True 
    categories_element:list[WebElement] = [] 
    data:list[tuple[str,str,str,str]] = []
    for option in all_amazon_options.find_elements(By.XPATH, ".//li"): 
        try: 
            current_heading = option.find_element(By.XPATH, ".//div[contains(@class, 'hmenu-title')]") 
            current_heading = current_heading.get_attribute("innerHTML") 
            amNotHeadingElement = False 
        except: 
            amNotHeadingElement = True 
        try:
            if option.get_attribute("class") == "hmenu-mini-divider":
                continue
        except:
            None
        try:
            option.find_element(By.XPATH, ".//a[contains(@class, 'hmenu-compressed-btn')]")
            break
        except:
            None
        if current_heading == "shop by category" and amNotHeadingElement: 
            categories_element.append(option) 
    for category_element in categories_element: 
        data.extend(explore_category(category_element))
    df = pandas.DataFrame(data=data, columns=["Category","Sub-Category","Sub-Sub-Category", "Link"])
    df.index.name = "Index"
    df.to_csv("category data and links.csv")
get_all_amazon_data()
