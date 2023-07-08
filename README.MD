<img src="usage.gif">
<br>
To use locally
<br>
<ul>
    <li>Run the script CreateDb.sql in postgres sql( \i 'location_of_this_file')</li>
    <li>Run load_scraped_data_to_db.js</li>
    <li>Run FixDbAfterScraperUpload.sql in the shell</li>
    <li>in the spense-hack directory run `npx yarn install` then `npx yarn dev`</li>
    <li>in the spense-hack/front-end directory run 'npx yarn install' then 'npx yarn dev --port 8080' </li>
    <li>head over to port 8080 to use the app</li>
</ul>
<br>
Not all the data is in the csv in amazon-scraper. If you want all the data first delete all csvs then , run 
<ol>
<li>category_scraper.py (will take a few minutes )</li>
<li>brand_scraper.py (will take a few hours)</li>
<li>product_scraper.py (will take a day or more)</li>
</ol>
<br>
Attributions

Image by <a href="https://www.freepik.com/free-vector/hand-drawn-different-people-icons-pack_17893869.htm#query=people&position=26&from_view=keyword&track=sph">Freepik</a>


Image by <a href="https://www.freepik.com/free-vector/ecommerce-web-page-concept-illustration_21727022.htm#query=e%20commerce&position=0&from_view=keyword&track=ais">Freepik </a>
