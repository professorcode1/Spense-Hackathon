import pandas as pd
from selenium import webdriver 
from selenium.webdriver.chrome.service import Service 
from selenium.webdriver.chrome.options import Options 
from selenium.webdriver.chrome.webdriver import WebDriver 
from webdriver_manager.chrome import ChromeDriverManager 
from selenium.webdriver.common.by import By 
from selenium.webdriver.remote.webelement import WebElement 
import time 
import html 
from tqdm import tqdm
import pandas
option = Options() 
option.add_experimental_option("detach", True) 
driver:WebDriver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=option) 

category_data = pd.read_csv("category data and links.csv", index_col = "Index")

def check_for_amazon_signout():
    try:
        driver.find_element(By.XPATH, ".//a/span[text()=\"Sign in\"]")
        input("AMAZON SIGNED YOU OUT SIGN IN !!!!")
        return True
    except:
        return False

def get_brand_data_for_category_index(index:int = 0):
    driver.get(category_data.iloc[index,3])
    if(check_for_amazon_signout()):
        driver.get(category_data.iloc[index,3])
    brand_list_div = driver.find_element(By.XPATH, ".//div[contains(@class, \"apb-browse-left-nav\")]//div/div/span[text()=\"Brands\"]").find_element(By.XPATH, "./../..")
    brand_anchor_elements = brand_list_div.find_elements(By.XPATH, ".//a")
    res:list[tuple[int, str,str]] = []
    for brand in brand_anchor_elements:
        brand_amazon_link = brand.get_attribute("href")
        brand_name = brand.find_element(By.XPATH, "./span").get_attribute("innerHTML")
        res.append((index, brand_name, brand_amazon_link))
    return res


def generate_brand_data():
    data:list[tuple[int,str,str]] = []
    success = 0
    for brand_index in tqdm(range(category_data.shape[0])):
        try:
            data.extend(get_brand_data_for_category_index(brand_index))
            print("\nSUCCESS\n")
            success += 1
        except:
            print("\nFAIL for category",category_data.iloc[brand_index, 0:3],"\n" )
        print("\noverall success :: ",success, "/",  brand_index + 1  , "\n")
    df = pandas.DataFrame(data, columns=["category index", "brand", "link"])
    df.index.name = "Index"
    df.to_csv("brand data and links.csv")
generate_brand_data()