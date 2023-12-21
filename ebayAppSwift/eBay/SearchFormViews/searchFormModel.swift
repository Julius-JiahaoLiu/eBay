//
//  searchFormModel.swift
//  HW4
//
//  Created by 刘珈豪 on 2023/11/18.
//

import Foundation

@MainActor
class searchFormModel: NSObject, ObservableObject {
    @Published var searchResults: [SearchResultResponse.FindItemsAdvancedResponse.SearchResult.Item] = []
    private var ipInfo = ipInfoModel()
    func search(keyword: String, category: String, isNew: String, isUsed: String, isPickup: String, isFreeShipping: String, distance: String, isZipcode: Bool, zipcode: String) async {
        var url: String = "https://jliu2620.wl.r.appspot.com/searchResult?"
        if !isZipcode{
            await ipInfo.getIpInfo()
            let ipzipcode: String = ipInfo.ipInfo
            print(ipzipcode)
            url = url + "keyword=" + keyword + "&category=" + category + "&newCond=" + isNew + "&usedCond=" + isUsed + "&localPickup=" + isPickup + "&freeShipping=" + isFreeShipping + "&distance=" + distance + "&zipCode=" + ipzipcode
            print(url)
            guard let url = URL(string: url) else {
                print("Invalid URL")
                return
            }
            do{
                let (data, _) = try await URLSession.shared.data(from: url)
                let result = try JSONDecoder().decode(SearchResultResponse.self, from: data)
                if let items = result.findItemsAdvancedResponse.first?.searchResult.first?.item {
                    searchResults = items
                }
            }catch {
                print("Error decoding JSON: \(error)")
            }
        }else{
            url = url + "keyword=" + keyword + "&category=" + category + "&newCond=" + isNew + "&usedCond=" + isUsed + "&localPickup=" + isPickup + "&freeShipping=" + isFreeShipping + "&distance=" + distance + "&zipCode=" + zipcode
            guard let url = URL(string: url) else {
                print("Invalid URL")
                return
            }
            do{
                let (data, _) = try await URLSession.shared.data(from: url)
                let result = try JSONDecoder().decode(SearchResultResponse.self, from: data)
                if let items = result.findItemsAdvancedResponse.first?.searchResult.first?.item {
                    searchResults = items
                }
            }catch {
                print("Error decoding JSON: \(error)")
            }
        }
    }
}

struct SearchResultResponse: Decodable {
    let findItemsAdvancedResponse: [FindItemsAdvancedResponse]
    struct FindItemsAdvancedResponse: Decodable {
        let searchResult: [SearchResult]
        struct SearchResult: Decodable {
            let item: [Item]
            struct Item: Decodable {
                let itemId: [String]
                let title: [String]
                let galleryURL: [String]
                let postalCode: [String]
                let condition: [Condition]?
                let sellingStatus: [SellingStatus]?
                let shippingInfo: [ShippingInfo]?
                let returnsAccepted: [String]?
            }
            struct Condition: Decodable{
                let conditionDisplayName: [String]?
                let conditionId: [String]
            }
            struct SellingStatus: Decodable {
                let currentPrice: [Price]
                let convertedCurrentPrice: [Price]?
                let sellingState: [String]?
            }
            struct ShippingInfo: Decodable {
                let shippingServiceCost: [Price]
                let shippingType: [String]?
                let shipToLocations: [String]?
                let handlingTime: [String]?
                let expeditedShipping: [String]?
                let oneDayShippingAvailable: [String]?
            }
            struct Price: Decodable {
                let currencyId: String
                let value: String
                private enum CodingKeys: String, CodingKey {
                    case currencyId = "@currencyId"
                    case value = "__value__"
                }
            }
        }
    }
}



