//
//  similarTabView.swift
//  HW4
//
//  Created by 刘珈豪 on 2023/11/25.
//

import SwiftUI

struct similarTabView: View {
    @State var itemId : String = ""
    @StateObject var searchSimilar = searchSimilarModel()
    @State var getSimilar = false
    
    let sortOptions = ["Default", "Name", "Price", "Days Left", "Shipping"]
    let orderOptions = ["Ascending", "Descending"]
    @State private var selectedSortOption = "Default"
    @State private var selectedOrderOption = "Ascending"
    private var sortedItems: [searchSimilarResponse.getSimilarItemsResponse.itemRecommendations.item] {
            var sortedArray = searchSimilar.similarItems ?? []
            switch selectedSortOption {
            case "Name":
                sortedArray.sort { $0.title.trimmingCharacters(in: .whitespaces) < $1.title.trimmingCharacters(in: .whitespaces) }
            case "Price":
                sortedArray.sort { comparePrice(item1: $0, item2: $1) }
            case "Days Left":
                sortedArray.sort { compareDaysLeft(item1: $0, item2: $1) }
            case "Shipping":
                sortedArray.sort { compareShipping(item1: $0, item2: $1) }
            default:
                break
            }
            if selectedOrderOption == "Descending" {
                sortedArray.reverse()
            }
            return sortedArray
    }
    var body: some View {
        Group{
            if getSimilar {
                    VStack(alignment: .leading){
                        Text("Sort By:").font(.title2).fontWeight(.heavy)
                        Picker("Sort By", selection: $selectedSortOption) {
                            ForEach(sortOptions, id: \.self) { option in
                                Text(option)
                            }
                        }
                        .pickerStyle(SegmentedPickerStyle())
                        if selectedSortOption != "Default"{
                            Text("Order:").font(.title2).fontWeight(.heavy)
                            Picker("Sort Order", selection: $selectedOrderOption) {
                                ForEach(orderOptions, id: \.self) { option in
                                    Text(option)
                                }
                            }
                            .pickerStyle(SegmentedPickerStyle())
                        }
                    }.padding(.horizontal)
                    ScrollView{
                        LazyVGrid(columns: [GridItem(), GridItem()]) {
                            ForEach(Array(sortedItems), id:\.self) { item in
                                    VStack(alignment: .leading) {
//                                        AsyncImage(url: URL(string: item.imageURL),content:{ returnedImage in
//                                            returnedImage
//                                                .resizable()
//                                                .scaledToFit()
//                                                .aspectRatio(contentMode: .fit)
//                                                .frame(width: 145, height: 145)
//                                                .cornerRadius(10.0)
//                                        }, placeholder: {ProgressView()})
                                        ImageView(urlString: item.imageURL).frame(width: 145, height: 145)
                                            .cornerRadius(/*@START_MENU_TOKEN@*/10.0/*@END_MENU_TOKEN@*/)
                                        Text(item.title.trimmingCharacters(in: .whitespaces).prefix(25).appending("...")).font(.callout)
                                        HStack{
                                            Text("$\(item.shippingCost.value)")
                                            Spacer()
                                            Text(daysTrans(item.timeLeft) + " days left")
                                        }.font(.subheadline).foregroundColor(.gray)
                                        HStack{
                                            Spacer()
                                            Text("$\(item.buyItNowPrice.value)").font(.title3).foregroundColor(.blue).fontWeight(.bold)
                                        }.padding(.vertical, 2.0)
                                    }
                                    .padding()
                                    .background(Color(.systemGray6))
                                    .cornerRadius(15)
                                    .overlay(
                                      RoundedRectangle(cornerRadius: 15)
                                        .stroke(Color.gray, lineWidth: 1)
                                    )
                                    .padding(.horizontal)
                            }.frame(maxWidth: .infinity) // locate the scroll bar at the right edge of the screen
                        }
                    }
                    .padding(.vertical)
            }else{
                ProgressView()
            }
        }.onAppear{
            Task{
                getSimilar = false
                await searchSimilar.search(itemId: itemId)
                getSimilar = true
            }
        }
    }
}

func daysTrans(_ str: String) -> String {
    do {
        let regex = try NSRegularExpression(pattern: "\\d+")
        let matches = regex.matches(in: str, range: NSRange(str.startIndex..., in: str))
        if let match = matches.first {
            let range = Range(match.range, in: str)
            return String(str[range!])
        }
    } catch {
        print("Error creating regular expression: \(error)")
    }
    return "N/A"
}

func comparePrice(item1: searchSimilarResponse.getSimilarItemsResponse.itemRecommendations.item, item2: searchSimilarResponse.getSimilarItemsResponse.itemRecommendations.item) -> Bool{
    return (Double(item1.buyItNowPrice.value) ?? 0.0) - (Double(item2.buyItNowPrice.value) ?? 0.0) < 0
}
func compareDaysLeft(item1: searchSimilarResponse.getSimilarItemsResponse.itemRecommendations.item, item2: searchSimilarResponse.getSimilarItemsResponse.itemRecommendations.item) -> Bool{
    return (Double(daysTrans(item1.timeLeft)) ?? 0.0) - (Double(daysTrans(item2.timeLeft)) ?? 0.0) < 0
}
func compareShipping(item1: searchSimilarResponse.getSimilarItemsResponse.itemRecommendations.item, item2: searchSimilarResponse.getSimilarItemsResponse.itemRecommendations.item) ->Bool{
    return (Double(item1.shippingCost.value) ?? 0.0) - (Double(item2.shippingCost.value) ?? 0.0) < 0
}


#Preview {
    similarTabView(itemId: "384861546374")
}
