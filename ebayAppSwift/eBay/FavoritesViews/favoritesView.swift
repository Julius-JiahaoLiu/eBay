//
//  favoritesView.swift
//  HW4
//
//  Created by 刘珈豪 on 2023/11/23.
//

import SwiftUI

struct favoritesView: View {
    @StateObject var db = mongodbModel()
    @State var getItems = false
    var body: some View {
//        NavigationView{ // this whole view is already in a NavigationView !!! Watch out DUPLICATE
        Group{
            if !getItems {
                List{}.navigationTitle("Favorites").overlay{
                    Text("Loading...")
                }
            }
            else if getItems && db.wishListItems.isEmpty{
                List{}.navigationTitle("Favorites").overlay{
                    Text("No items in wishlist")
                }
            }
            else{
                List{
                    HStack {
                        Text("Wishlist total(\(db.wishListItems.count)) items:").font(.headline)
                        Spacer()
                        Text("$\(calculateTotalPrice(items: db.wishListItems))").font(.headline)
                    }
                    ForEach(db.wishListItems, id: \.ItemID) { item in
                        Group{
                            HStack{
                                ImageView(urlString: item.Image ).frame(width: 100, height: 100)
                                    .cornerRadius(/*@START_MENU_TOKEN@*/10.0/*@END_MENU_TOKEN@*/)
                                
                                VStack(alignment: .leading, spacing: 5){
                                    Text(item.Title.prefix(19).appending("...") ).font(.headline)
                                    Text("$\(item.Price)").foregroundColor(/*@START_MENU_TOKEN@*/.blue/*@END_MENU_TOKEN@*/).font(.headline)
                                    Text(item.Shipping == "0.0" ? "FREE SHIPPING" :  "$\(item.Shipping )").foregroundColor(.gray)
                                    
                                    var conditionDisplay: String {
                                        let conditionId = item.ConditionID
                                        
                                        switch conditionId {
                                        case "1000":
                                            return "NEW"
                                        case "2000", "2500":
                                            return "REFURBISHED"
                                        case "3000", "4000", "5000", "6000":
                                            return "USED"
                                        default:
                                            return "NA"
                                        }
                                    }
                                    HStack{
                                        Text(item.Zipcode)
                                        Spacer()
                                        Text(conditionDisplay)
                                    }.foregroundColor(.gray)
                                }
                            }
                        }
                        .swipeActions {
                            Button{
                                Task{
                                    await db.removeWishList(ItemID: item.ItemID)
                                    await db.getWishListItems()
                                }
                            }label: {
                                Text("Delete")
                            }.tint(.red)
                          }
                    }
                }.navigationTitle("Favorites")
            }
        }
        .onAppear{
            Task{
                await db.getWishListItems()
                getItems = true
                print(db.wishListItems)
            }
        }
    }
}

func calculateTotalPrice(items: [WishListItems]) -> String {
  let prices = items.map { Float($0.Price) ?? 0 }
  let total = prices.reduce(0, +)
  return  String(format:"%.2f", total)
}

#Preview {
    favoritesView()
}
