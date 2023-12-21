//
//  searchDetailModel.swift
//  HW4
//
//  Created by 刘珈豪 on 2023/11/24.
//

import Foundation

@MainActor
class searchDetailModel: NSObject, ObservableObject {
    @Published var searchDetails: SearchDetailResponse.Item? // searchDetials is optional
//    init() {
//        super.init()
//    }
    func search(itemId: String) async {
        guard let url = URL(string: "https://jliu2620.wl.r.appspot.com/searchDetail?itemId=" + itemId) else {
            print("Invalid URL")
            return
        }
        do{
            let (data, _) = try await URLSession.shared.data(from: url)
            let result = try JSONDecoder().decode(SearchDetailResponse.self, from: data)
            searchDetails = result.Item
        }catch {
            print("Error decoding JSON: \(error)")
        }

    }
}

struct SearchDetailResponse: Decodable {
    let Item: Item
    struct Item: Decodable {
        let ItemID: String
        let ViewItemURLForNaturalSearch: String
        let PictureURL: [String]
        let Seller: Seller?
        let CurrentPrice: CurrentPrice
        let Title: String
        let ItemSpecifics: ItemSpecifics?
        let Storefront: Storefront?
        let ReturnPolicy: ReturnPolicy?
        let HandlingTime: Int?
        let ConditionID: Int?
        let ConditionDisplayName: String?
        let GlobalShipping: Bool?
    }
    struct CurrentPrice: Decodable {
        let Value: Double
        let CurrencyID: String
    }
    struct ItemSpecifics: Decodable {
        let NameValueList: [NameValueList]
    }
    struct NameValueList: Decodable, Hashable {
        let Name: String
        let Value: [String]
        func hash(into hasher: inout Hasher) {
                hasher.combine(Name)
                hasher.combine(Value)
            }
        static func == (lhs: NameValueList, rhs: NameValueList) -> Bool {
            return lhs.Name == rhs.Name && lhs.Value == rhs.Value
        }
    }
    struct ReturnPolicy: Decodable {
        let Refund, ReturnsWithin, ReturnsAccepted, ShippingCostPaidBy: String?
    }
    struct Seller: Decodable {
        let FeedbackScore: Int
        let PositiveFeedbackPercent: Double
    }
    struct Storefront: Decodable {
        let StoreURL: String
        let StoreName: String
    }

}


