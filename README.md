<h1> eBay shopping projects </h1>
<h3> ebayAppSwift </h3>
<p>An Swift iOS App with NodeJS as backend server. Here is the Demo video <a src="https://youtu.be/yZ3M3VpDQmo">https://youtu.be/yZ3M3VpDQmo</a>. </p> 
<p>After a launch screen, the home page displays Product Search form with search conditions for items and autocomplete for postalcode. </p>
<div style="display: flex; justify-content: center;">
    <img src="./README/ebayAppImage0.jpg" style="width: 200px">
    <img src="./README/ebayAppImage1.jpg" style="width: 200px">
    <img src="./README/ebayAppImage2.jpg" style="width: 200px">
</div> 
<p>Search results are displayed with item cards, including item title, current price, shipping cost, postalcode and current condition. There is a heart icon for each item to add or remove from favorites.</p>
<div style="display: flex; justify-content: center;">
    <img src="./README/ebayAppImage3.jpg" style="width: 200px">
    <img src="./README/ebayAppImage4.jpg" style="width: 200px">
</div> 
<p>Item cards in Results are clickable and redirect to item detail views. The info tab includes a facebook icon for sharing, a carousel for item images and a scrollView table for description of product. Then, Shipping tab displays Seller, Shipping and Return policy in three sections, beginning with a link to Store page on ebay.com site. </p>
<div style="display: flex; justify-content: center;">
    <img src="./README/ebayAppImage5.jpg" style="width: 200px">
    <img src="./README/ebayAppImage6.jpg" style="width: 200px">
    <img src="./README/ebayAppImage7.jpg" style="width: 200px">
</div>
<p>The Photos tab displays a ScrollView for all relevant images about item title by Google Search Engine. While the Similar tab displays all similar items of this certain item with sorting function by Name, Price, Days left and Shipping cost.</p>
<div style="display: flex; justify-content: center;">
    <img src="./README/ebayAppImage8.jpg" style="width: 200px">
    <img src="./README/ebayAppImage9.jpg" style="width: 200px">
    <img src="./README/ebayAppImage10.jpg" style="width: 200px">
</div>
<p>The heart button on the top right corner of home page is also clickable and redirect to Favorites page that connects to MongoDB database and automatically compute the total price of favorite items after adding and removing.</p>
<div style="display: flex; justify-content: center;">
    <img src="./README/ebayAppImage11.jpg" style="width: 200px">
    <img src="./README/ebayAppImage12.jpg" style="width: 200px">
</div>

<h3> ebayWebAngular </h3>
<p>An Responsive Angular Website with NodeJS backend server. Here is the website <a src="https://jliu2620.wl.r.appspot.com/">https://jliu2620.wl.r.appspot.com</a>. The following snapshots are shown on mobile devices.</p> 
<p>The Home page is also a Product search form with input validation and autocomplete for zip code.</p>
<div style="display: flex; justify-content: center;">
    <img src="./README/ebayWebImage1.jpg" style="width: 200px">
    <img src="./README/ebayWebImage2.jpg" style="width: 200px">
    <img src="./README/ebayWebImage3.jpg" style="width: 200px">
</div>
<p>The Results of searching display items in a dark table with item index, image, title, current price, shipping cost, zip code and a clickable icon for adding and removing favorite.</p>
<div style="display: flex; justify-content: center;">
    <img src="./README/ebayWebImage4.jpg" style="width: 200px">
    <img src="./README/ebayWebImage5.jpg" style="width: 200px">
</div>
<p>The titles in Results table are clickable and redirect to item details. Then Product tab displays all the product description in table with a link for popping up module of product images and a facebook icon for sharing product.</p>
<div style="display: flex; justify-content: center;">
    <img src="./README/ebayWebImage6.jpg" style="width: 200px">
    <img src="./README/ebayWebImage7.jpg" style="width: 200px">
    <img src="./README/ebayWebImage0.jpg" style="width: 200px">
</div>
<p>The Photos tab displays all images from Google Search Engine on product title. While, the Shipping and Seller tabs contains relevant info of product with different symbols shown base on product value.</p>
<div style="display: flex; justify-content: center;">
    <img src="./README/ebayWebImage8.jpg" style="width: 200px">
    <img src="./README/ebayWebImage9.jpg" style="width: 200px">
    <img src="./README/ebayWebImage10.jpg" style="width: 200px">
</div>
<p>The Similar tab shows all the eBay similar products of the clicked item, and also contains sorting units base on the Product Name, Days Left, Price and Shipping Cost. The List button can redirect back to Search Results with recently clicked item highlighted.</p>
<div style="display: flex; justify-content: center;">
    <img src="./README/ebayWebImage11.jpg" style="width: 200px">
    <img src="./README/ebayWebImage12.jpg" style="width: 200px">
    <img src="./README/ebayWebImage15.jpg" style="width: 200px">
</div>
<p>Finally, the WishList button connects to MongoDB database with latest favorite items and Total Shopping cost after adding and removing. The item title in WishList is also clickable and redirect to product details, which is independent of Details in Results Part.</p>
<div style="display: flex; justify-content: center;">
    <img src="./README/ebayWebImage13.jpg" style="width: 200px">
    <img src="./README/ebayWebImage14.jpg" style="width: 200px">
</div>

<h3> ebayBackNodeJS </h3>
<p>This is a Backend Server for the eBay Search projects, providing interfaces for postalcode autoComplete, ebay searchResult, ebay searchDeail, googleSearchEngine images, ebay searchSimilar and mongoDB database. The whole server is deployed on GCP.</p>