import pandas as pd
from selenium import webdriver 
from selenium.webdriver.chrome.service import Service 
from selenium.webdriver.chrome.options import Options 
from selenium.webdriver.chrome.webdriver import WebDriver 
from webdriver_manager.chrome import ChromeDriverManager 
from selenium.webdriver.common.by import By 
from selenium.webdriver.remote.webelement import WebElement 
from selenium.webdriver.common.action_chains import ActionChains
import time 
import html 
import pandas
import json
from tqdm import tqdm
option = Options() 
option.add_experimental_option("detach", True) 
driver:WebDriver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=option)
action_chain = ActionChains(driver)
from os.path import exists


brand_data = pd.read_csv("brand data and links.csv", index_col = "Index")

def check_for_amazon_signout():
    try:
        driver.find_element(By.XPATH, ".//a/span[text()=\"Sign in\"]")
        input("AMAZON SIGNED YOU OUT SIGN IN !!!!")
        return True
    except:
        return False

def hower_on_product_image_icons():
    HOWER_TIME = 0.15
    image_icon_eles = driver.find_element(By.ID, "altImages").find_elements(By.XPATH,".//li[contains(@class,'item')]")
    for image_icon_element in image_icon_eles:
        action_chain.move_to_element(image_icon_element).perform()
        time.sleep(HOWER_TIME) 

def get_product_metadata():
    res = dict()
    try:
        row_elements = driver.find_elements(By.XPATH, ".//div[@id='productOverview_feature_div']/div/table/tbody/tr")
#         print(row_elements)
        for row_ele in row_elements:
            value_elements = row_ele.find_elements(By.XPATH, "./td/span")
            assert len(value_elements) == 2, "Unexpected schema encountered"
            key = value_elements[0].get_attribute("innerHTML")
            value = value_elements[1].get_attribute("innerHTML")
            res[key] = value
        return res
    except Exception as e:
        return dict()
    
def get_product_data_from_product_link(product_link) -> tuple[str, int,str,str,str]:
    driver.get(product_link)
    if(check_for_amazon_signout()):
        driver.get(product_link)
    hower_on_product_image_icons()
    product_name  = driver.find_element(By.ID, "productTitle").get_attribute("innerHTML")
    product_price = int(driver.find_element(By.XPATH, \
                    ".//div[@id='corePriceDisplay_desktop_feature_div']//span[contains(@class, 'a-price-whole')]")\
                    .get_attribute("innerHTML").replace(',',''))
    product_image_elements = driver.find_elements(By.XPATH, ".//span[@data-action=\"main-image-click\"]//img[@src]")
    product_image_links = list(map(lambda x: x.get_attribute("src"), product_image_elements))
    product_description_ele_list = driver.find_elements(By.XPATH, ".//div[@id='feature-bullets']/ul/li/span")
    product_description_list = list(map(lambda x: x.get_attribute("innerHTML"), product_description_ele_list))
    product_metadata = get_product_metadata()
    return product_name, \
            product_price, \
            json.dumps(product_description_list), \
            json.dumps(product_image_links), \
            json.dumps(product_metadata)

def get_products_data_list_for_brand(index:int = 0) -> list[tuple[int, str,int,str,str,str]]:
    link = brand_data.iloc[index, 2]
    res:list[tuple[int, str,int,str,str,str]] = []
    driver.get(link)
    if(check_for_amazon_signout()):
        driver.get(link)
    product_list = driver.find_elements(By.XPATH, ".//div[@data-component-type='s-search-result']//a[@href]/div/img/../..")
    product_links = list(map(lambda x: x.get_attribute("href"), product_list))
    success = 0
    for product_link in product_links:
        try:
            res.append((index, *get_product_data_from_product_link(product_link)))
            success += 1 
        except Exception as e:
            None
    print("\nproduct success :: ", success, "/", len(product_links))
    return res

def dump_current_df_to_file(data:list[tuple[int, str,int,str,str,str]]):
    df = pandas.DataFrame(data)
    df.to_csv("product data and links.csv", mode='a', index=False, header=False)



def generate_products_data():
    if not exists("./product data and links.csv"):
        csv_file = open("./product data and links.csv", "w")
        csv_file.write("brand index,product name,product price,json description list,json image url list,json metadata")
        csv_file.close()
    data:list[tuple[int, str,int,str,str,str]] = [] #brand index, name, price, json parse description list, json parsed links list, json parsed metadata
    columns = ["brand index", "product name", "product price", "json description list", "json image url list", "json metadata"]
    success = 0
    starting_brand_index = 65
    for brand_index in tqdm(range(starting_brand_index, brand_data.shape[0])):
        try:
            data = get_products_data_list_for_brand(brand_index)
            success += 1
            print("\nSUCCESS\n")
        except Exception as e:
            print("\nFAIL for ", brand_data.iloc[brand_index, 0],brand_data.iloc[brand_index, 1], "\n")
        print("\noverall success :: ",success, "/",  brand_index -starting_brand_index + 1  , "\n")
        dump_current_df_to_file(data)    

        
generate_products_data()