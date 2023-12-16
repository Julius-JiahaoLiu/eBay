//
//  searchSimilarModel.swift
//  HW4
//
//  Created by 刘珈豪 on 2023/11/25.
//

import Foundation
@MainActor
class searchSimilarModel: NSObject, ObservableObject {
    @Published var similarItems: [searchSimilarResponse.getSimilarItemsResponse.itemRecommendations.item]? // optional
    func search(itemId: String) async {
        guard let url = URL(string: "https://jliu2620.wl.r.appspot.com/searchSimilar?itemId=" + itemId) else {
            print("Invalid URL")
            return
        }
        do{
            let (data, _) = try await URLSession.shared.data(from: url)
            let result = try JSONDecoder().decode(searchSimilarResponse.self, from: data)
            similarItems = result.getSimilarItemsResponse.itemRecommendations.item
        }catch {
            print("Error decoding JSON: \(error)")
        }
    }
}

struct searchSimilarResponse: Decodable{
    let getSimilarItemsResponse: getSimilarItemsResponse
    struct getSimilarItemsResponse: Decodable{
        let itemRecommendations: itemRecommendations
        struct itemRecommendations: Decodable{
            let item: [item]
            struct item: Decodable, Hashable{
                let imageURL: String
                let title: String
                let buyItNowPrice: Price
                let shippingCost: Price
                let timeLeft: String
                func hash(into hasher: inout Hasher) {
                    hasher.combine(imageURL)
                    hasher.combine(title)
                    hasher.combine(timeLeft)
                }
                static func == (lhs: item, rhs: item) -> Bool {
                    return lhs.imageURL == rhs.imageURL && lhs.title == rhs.title && lhs.timeLeft == rhs.timeLeft
                }
            }
            struct Price: Decodable, Hashable {
                let currencyId: String
                let value: String
                private enum CodingKeys: String, CodingKey {
                    case currencyId = "@currencyId"
                    case value = "__value__"
                }
                func hash(into hasher: inout Hasher){
                    hasher.combine(currencyId)
                    hasher.combine(value)
                }
                static func == (lhs: Price, rhs: Price) -> Bool {
                    return lhs.currencyId == rhs.currencyId && lhs.value == rhs.value
                }
            }
        }
    }
}

