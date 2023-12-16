//
//  mongodbModel.swift
//  HW4
//
//  Created by 刘珈豪 on 2023/11/21.
//

import Foundation

@MainActor
class mongodbModel: NSObject, ObservableObject {
    @Published var wishListItemID = [WishListItemID]()
    @Published var wishListItems = [WishListItems]()
    
    func isFavorite(ItemID: String) -> Bool{
        return wishListItemID.contains(where: {$0.ItemID == ItemID})
    }
    func getWishListItems() async{
        guard let url = URL(string: "https://jliu2620.wl.r.appspot.com/mongoDB/getAllWishListItems") else{
            print("Invalid URL")
            return
        }
        do{
            let (data, _) = try await URLSession.shared.data(from: url)
            let result = try JSONDecoder().decode([WishListItems].self, from: data)
            wishListItems = result
        }catch{
            print("Error decoding JSON: \(error)")
        }
    }
    func checkWishList() async {
        guard let url = URL(string: "https://jliu2620.wl.r.appspot.com/mongoDB/checkWishList") else {
            print("Invalid URL")
            return
        }
        do{
            let (data, _) = try await URLSession.shared.data(from: url)
            let result = try JSONDecoder().decode([WishListItemID].self, from: data)
            wishListItemID = result
        }catch {
            print("Error decoding JSON: \(error)")
        }
    }
    func addWishList(ItemID: String, Image: String, Title: String, Price: String, Shipping: String, Zipcode: String, ConditionID: String) async {
        var components = URLComponents(string: "https://jliu2620.wl.r.appspot.com/mongoDB/addWishList")!
        components.queryItems = [
            URLQueryItem(name: "ItemID", value: ItemID),
            URLQueryItem(name: "Image", value: Image),
            URLQueryItem(name: "Title", value: Title),
            URLQueryItem(name: "Price", value: Price),
            URLQueryItem(name: "Shipping", value: Shipping),
            URLQueryItem(name: "Zipcode", value: Zipcode),
            URLQueryItem(name: "ConditionID", value: ConditionID)
        ]
        let url = components.url! // Encode query string
        do{
            let (_, _) = try await URLSession.shared.data(from: url)
        }catch{
            print("AddWishList Error: \(error)")
        }
    }
    func removeWishList(ItemID: String) async {
        let url = "https://jliu2620.wl.r.appspot.com/mongoDB/removeWishList?ItemID=" + ItemID
        guard let url = URL(string: url) else {
            print("Invalid URL")
            return
        }
        do{
            let (_, _) = try await URLSession.shared.data(from: url)
        }catch{
            print("RemoveWishList Error: \(error)")
        }
    }
}
struct WishListItemID: Codable {
    let ItemID: String
}
struct WishListItems: Codable{
    let ItemID: String
    let Image: String
    let Title: String
    let Price: String
    let Shipping: String
    let Zipcode: String
    let ConditionID: String
}
