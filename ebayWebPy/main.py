from flask import Flask, jsonify
from flask import request
import requests
from ebay_oauth_token import OAuthToken

app = Flask(__name__, static_folder='static')
@app.route('/')
def homepage():
    return app.send_static_file("index.html")

@app.route('/search', methods=['GET']) 
def search_form():
    if request.method == 'GET':
        form_data =  request.args  # request.get_json() for POST requests
        client_id = "JiahaoLi-CSCI571H-PRD-172bbdc3d-0143f126"
        payload = {"OPERATION-NAME": "findItemsAdvanced", 
                "SERVICE-VERSION": "1.0.0",
                "SECURITY-APPNAME": client_id,
                "RESPONSE-DATA-FORMAT": "JSON",
                "REST-PAYLOAD": "true",
                "keywords": form_data.get("keyword", ""),
                "paginationInput.entriesPerPage": "10",
                "sortOrder": form_data.get("sort_by", "BestMatch")}
        filters1 = {}
        filters1Cnt = 0
        for (filterKey, filterName) in {"priceFrom": "MinPrice", "priceTo": "MaxPrice", "seller_return": "ReturnsAcceptedOnly", "shipping_free": "FreeShippingOnly"}.items():
            if(form_data.get(filterKey)):
                filters1["itemFilter(%d).name" % filters1Cnt] = filterName
                filters1["itemFilter(%d).value" % filters1Cnt] = form_data.get(filterKey, "false")
                if(filterKey in ["priceFrom", "priceTo"]):
                    filters1["itemFilter(%d).paramName" % filters1Cnt] = "Currency"
                    filters1["itemFilter(%d).paramValue" % filters1Cnt] = "USD"
                filters1Cnt += 1
        payload.update(filters1)
        filters2 = {"itemFilter(%d).name" % filters1Cnt: "Condition"}
        filters2Cnt = 0
        for (filterKey, filterValue) in {"condition_new": "1000", "condition_used": "3000", "condition_verygood": "4000", "condition_good": "5000", "condition_acceptable": "6000"}.items():
            if(form_data.get(filterKey)):
                filters2["itemFilter(%d).value(%d)" % (filters1Cnt, filters2Cnt)] = filterValue
                filters2Cnt += 1
        if(len(filters2) > 1):
            payload.update(filters2)
        r = requests.get("https://svcs.ebay.com/services/search/FindingService/v1", params=payload)
        if r.status_code == 200:
            return jsonify(r.json())
        else:
            return jsonify({"error": "API request failed"}), 500

@app.route('/details', methods=['GET'])
def item_details():
    if request.method == 'GET':
        form_data = request.args # request.get_json() for POST requests
        itemId = form_data.get("itemId", "")
        client_id = "JiahaoLi-CSCI571H-PRD-172bbdc3d-0143f126"
        client_secret = "PRD-72bbdc3dbc07-4156-4bfe-b57b-00b6"
        oauth_utility = OAuthToken(client_id, client_secret) 
        header = {"X-EBAY-API-IAF-TOKEN": oauth_utility.getApplicationToken()}
        payload = {"callname": "GetSingleItem",
                   "responseencoding": "JSON",
                   "appid": client_id,
                   "siteid": "0",
                   "version": "967",
                   "ItemID": itemId,
                   "IncludeSelector": "Description,Details,ItemSpecifics"}
        r = requests.get("https://open.api.ebay.com/shopping", params=payload, headers=header)
        if r.status_code == 200:
            return jsonify(r.json())
        else:
            return jsonify({"error": "API request failed"}), 500 
if __name__ == '__main__':
    app.run(debug = True, port=8080)

    
    
