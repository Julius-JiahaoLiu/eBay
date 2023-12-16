function ClearForm(){
    document.getElementById("information_form").reset();
    const searchResults = document.querySelector('.search_results');
    if (searchResults) {
        while (searchResults.firstChild) {
            searchResults.removeChild(searchResults.firstChild);
        }
    }
}
function SubmitForm(){
    if(document.getElementById("keyword").value.trim() === ""){
        document.getElementById("keyword").reportValidity();
        return; 
    }
    const priceFromValue = parseFloat(document.getElementById("priceFrom").value.trim());
    const priceToValue = parseFloat(document.getElementById("priceTo").value.trim());
    if(priceFromValue < 0 || priceToValue < 0){
        alert('Price Range values cannot be negative! Please try a value greater than or equal to 0.0');
        return;
    }
    if(priceFromValue > priceToValue){
        alert('Oops! Lower price limit cannot be greater than upper price limit! Please try again.');
        return;
    }
    // fetch('/search', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ // send data to server inside body
    //         keyword: document.getElementById("keyword").value.trim(),
    //         priceFrom: document.getElementById("priceFrom").value.trim(),
    //         priceTo: document.getElementById("priceTo").value.trim(),
    //         condition_new: document.getElementById("condition_new").checked,
    //         condition_used: document.getElementById("condition_used").checked,
    //         condition_verygood: document.getElementById("condition_verygood").checked,
    //         condition_good: document.getElementById("condition_good").checked,
    //         condition_acceptable: document.getElementById("condition_acceptable").checked,
    //         seller_return: document.getElementById("seller_return").checked,
    //         shipping_free: document.getElementById("shipping_free").checked,
    //         // shipping_expedited: document.getElementById("shipping_expedited").checked,
    //         sort_by: document.getElementById("sort_by").value,
    //         })
    // })
    fetch('/search?'+
        'keyword=' + encodeURIComponent(document.getElementById("keyword").value.trim()) + '&' +
        'priceFrom=' + encodeURIComponent(document.getElementById("priceFrom").value.trim()) + '&' +
        'priceTo=' + encodeURIComponent(document.getElementById("priceTo").value.trim()) + '&' +
        'condition_new=' + document.getElementById("condition_new").checked + '&' +
        'condition_used=' + document.getElementById("condition_used").checked + '&' +
        'condition_verygood=' + document.getElementById("condition_verygood").checked + '&' +
        'condition_good=' + document.getElementById("condition_good").checked + '&' +
        'condition_acceptable=' + document.getElementById("condition_acceptable").checked + '&' +
        'seller_return=' + document.getElementById("seller_return").checked + '&' +
        'shipping_free=' + document.getElementById("shipping_free").checked + '&' +
        // 'shipping_expedited=' + document.getElementById("shipping_expedited").checked + '&' +
        'sort_by=' + encodeURIComponent(document.getElementById("sort_by").value)
    )
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const search_results = document.querySelector('.search_results');
        while(search_results.firstChild){
            search_results.removeChild(search_results.firstChild);
        }
        const resultsNum = document.createElement('div');
        if(data.findItemsAdvancedResponse[0].ack[0] === "Failure" || data.findItemsAdvancedResponse[0].paginationOutput[0].totalEntries[0] === "0"){
            resultsNum.textContent = 'No Results found';
            resultsNum.style.fontWeight = 'bold';
            resultsNum.style.fontSize = '22px';
            search_results.appendChild(resultsNum);
            return;
        }
        const total = data.findItemsAdvancedResponse[0].paginationOutput[0].totalEntries[0];
        const keywords = document.createElement('span');
        keywords.textContent = document.getElementById("keyword").value.trim();
        keywords.style.fontStyle = 'italic';
        resultsNum.textContent = total + ' Results found for '; // resultsNum.appendChild(document.createTextNode(total + ' Results found for '));
        resultsNum.appendChild(keywords);
        resultsNum.style.fontWeight = 'bold';
        resultsNum.style.fontSize = '22px';
        search_results.appendChild(resultsNum);
        
        const hrElement = document.createElement('hr');
        hrElement.style.borderTop = '1px solid rgba(245,245,245,255)';
        hrElement.style.margin = '7px 0px 10px 0px';
        search_results.appendChild(hrElement);
        
        const itemContainer = document.createElement('div');
        function createItemCard(item){
            if (!item || !item.title || !item.viewItemURL || !item.primaryCategory || !item.condition || !item.sellingStatus) {
                return false;
            }
            const itemCard = document.createElement('div');
            itemCard.classList.add('item_card');

            const leftPart = document.createElement('div');
            leftPart.classList.add('left_part');
            const image = document.createElement('img');
            if(item.galleryURL[0] === ""){
                image.src = "https://csci571.com/hw/hw6/images/ebay_default.jpg"
            }else{
                image.src = item.galleryURL[0];
            }
            leftPart.appendChild(image);
            itemCard.appendChild(leftPart);

            const rightPart = document.createElement('div');
            rightPart.classList.add('right_part');
            const title = document.createElement('div');
            title.textContent = item.title[0];
            title.style.fontSize = '1rem'; 
            title.style.fontWeight = 'bold'; 
            title.style.whiteSpace = 'nowrap'; // Prevent text from wrapping
            title.style.textOverflow = 'ellipsis'; // using ellipsis for overflowed text
            title.style.overflow = 'hidden'; // Hide the overflowed text
            title.style.width = '500px'; // Set a fixed width for the container
            rightPart.appendChild(title);

            const category = document.createElement('div');
            category.style.display = 'flex';
            category.style.alignItems = 'center';
            const categoryLink = document.createElement('a');
            categoryLink.href = item.viewItemURL[0];  
            categoryLink.addEventListener('click', function (event) {
                event.stopPropagation(); // Prevent the event from propagating to the itemCard
            });
            const categoryImage = document.createElement('img');
            categoryImage.src = 'https://csci571.com/hw/hw6/images/redirect.png';
            categoryImage.alt = 'Redirect';
            categoryImage.style.width = '1rem';
            categoryImage.style.height = '1rem';
            categoryLink.appendChild(categoryImage);
            categoryLink.style.marginLeft = '0.5rem';
            const categoryText = document.createElement('span');
            categoryText.textContent = item.primaryCategory[0].categoryName[0];
            categoryText.style.fontStyle = 'italic';
            categoryText.style.marginLeft = '0.5rem';
            category.appendChild(categoryText);
            category.appendChild(categoryLink);
            category.prepend(document.createTextNode('Category: '));
            rightPart.appendChild(category);

            const condition = document.createElement('div');
            condition.style.display = 'flex';
            condition.style.alignItems = 'center';
            condition.textContent = 'Condition: ' + item.condition[0].conditionDisplayName[0]; 
            if (item.topRatedListing[0] === 'true') {
                const topRatedImage = document.createElement('img');
                topRatedImage.src = "https://csci571.com/hw/hw6/images/topRatedImage.png";
                topRatedImage.style.width = '1.5rem';
                topRatedImage.style.height = '2rem';
                topRatedImage.style.marginLeft = '1rem';
                condition.appendChild(topRatedImage);
            }
            rightPart.appendChild(condition);

            const price = document.createElement('div');
            price.textContent = 'Price: $' + item.sellingStatus[0].convertedCurrentPrice[0].__value__;
            if (item.shippingInfo && item.shippingInfo[0].shippingServiceCost && parseFloat(item.shippingInfo[0].shippingServiceCost[0].__value__) >= 0.01) {
                price.textContent += ' (+ $' + item.shippingInfo[0].shippingServiceCost[0].__value__ + ' for shipping)';
            }
            price.style.fontWeight = 'bold';
            rightPart.appendChild(price);
            itemCard.appendChild(rightPart);
            
            itemCard.addEventListener('click', function () {
                ItemDetails(item.itemId[0]);
            });  
            return itemCard;
        }
        function displayItems(startIndex, endIndex, container) {
            for (let i = startIndex; i < endIndex; i++) {
                const itemCard = createItemCard(data.findItemsAdvancedResponse[0].searchResult[0].item[i]);
                if(itemCard) {
                    container.appendChild(itemCard);
                }
            }
        }
        displayItems(0, 3, itemContainer);
        const moreItems = document.createElement('div');
        itemContainer.appendChild(moreItems);
        search_results.appendChild(itemContainer);

        const buttonElement = document.createElement('button');
        buttonElement.textContent = 'Show More';
        search_results.appendChild(buttonElement);

        let expanded = false;
        buttonElement.addEventListener('click', function () {
            if (!expanded) {
                displayItems(3, 10, moreItems); 
                buttonElement.textContent = 'Show Less';
            } else {
                while (moreItems.firstChild){
                    moreItems.removeChild(moreItems.firstChild);
                }
                buttonElement.textContent = 'Show More';
            }
            expanded = !expanded;
          });          
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function ItemDetails(itemid){
    // fetch('/details',{method: 'POST',headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({itemId: itemid})
    // })
    fetch('/details?itemId=' + encodeURIComponent(itemid))
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const search_results = document.querySelector('.search_results');
        while(search_results.firstChild){
            search_results.removeChild(search_results.firstChild);
        }
        const itemDetails = document.createElement('div');
        itemDetails.textContent = 'Item Details';
        itemDetails.style.fontWeight = 'bold';
        itemDetails.style.fontSize = '22px';
        search_results.appendChild(itemDetails);

        const buttonElement = document.createElement('button');
        buttonElement.textContent = 'Back to search results';
        buttonElement.addEventListener('click', function () {
            SubmitForm();
        });
        search_results.appendChild(buttonElement);
        
        const formContainer = document.createElement('div');
        formContainer.classList.add('form_container');
        search_results.appendChild(formContainer);
        function createFormLine(label, value){
            const formLine = document.createElement('div');
            formLine.classList.add('detail_lines');
            const labelPart = document.createElement('div');
            labelPart.classList.add('label_part');
            labelPart.textContent = label;
            const valuePart = document.createElement('div');
            valuePart.classList.add('value_part');
            if(label === 'Photo'){
                const image = document.createElement('img');
                image.src = value;
                valuePart.appendChild(image);
            }else if(label === 'eBay Link'){
                const link = document.createElement('a');
                link.href = value;
                link.textContent = 'eBay Product Link';
                valuePart.appendChild(link);
            }
            else{
                const text = document.createElement('span');
                text.textContent = value;
                valuePart.appendChild(text);                      
            }
            formLine.appendChild(labelPart);
            formLine.appendChild(valuePart);
            formContainer.appendChild(formLine);
        }
        createFormLine('Photo', data.Item.PictureURL[0]);
        createFormLine('eBay Link', data.Item.ViewItemURLForNaturalSearch);   
        createFormLine('Title', data.Item.Title);
        createFormLine('Price', `${data.Item.CurrentPrice.Value} ${data.Item.CurrentPrice.CurrencyID}`);
        createFormLine('Location', data.Item.Location + ', ' + data.Item.PostalCode);
        createFormLine('Seller', data.Item.Seller.UserID);
        if(data.Item.ReturnPolicy.ReturnsAccepted && data.Item.ReturnPolicy.ReturnsWithin){
            createFormLine('Return Policy (US)', data.Item.ReturnPolicy.ReturnsAccepted + ' within ' + data.Item.ReturnPolicy.ReturnsWithin);
        }else if(data.Item.ReturnPolicy.ReturnsAccepted){
            createFormLine('Return Policy (US)', data.Item.ReturnPolicy.ReturnsAccepted);
        }else if(data.Item.ReturnPolicy.ReturnsWithin){
            createFormLine('Return Policy (US)', 'within ' + data.Item.ReturnPolicy.ReturnsWithin);
        }else{
            createFormLine('Return Policy (US)', '');
        }
        for(let i = 0; i < data.Item.ItemSpecifics.NameValueList.length; i++){
            createFormLine(data.Item.ItemSpecifics.NameValueList[i].Name, data.Item.ItemSpecifics.NameValueList[i].Value[0]);
        }

        })
        .catch(error => {
        console.error('Error fetching details:', error);
        });
}
