//
//  searchResultView.swift
//  HW4
//
//  Created by 刘珈豪 on 2023/11/20.
//

import SwiftUI

struct searchResultView: View {
    @Binding var getSearchResult: Bool
    var result: [SearchResultResponse.FindItemsAdvancedResponse.SearchResult.Item]
    @Binding var showAlert: Bool
    @Binding var errorMessage: String
    @StateObject var db = mongodbModel()
    
    var body: some View {
//        NavigationView{
//            List{
        Text("Results").font(.title).fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/).padding(.vertical, 2.0)
            .onAppear {
                Task{
                    await db.checkWishList()
                }
        }
        if !getSearchResult{
            HStack{
                Spacer()
                VStack {
                    ProgressView()
                    Text("Please wait...").foregroundColor(Color.gray)
                }.id(UUID())
                Spacer()
            }
        }else if getSearchResult && result.isEmpty{
            Text("No results found.").foregroundColor(Color.red)
        }else if getSearchResult && !result.isEmpty{
            ForEach(Array(result.enumerated()), id: \.element.itemId.first) { index, item in
                @State var isFavorite: Bool = db.isFavorite(ItemID: item.itemId.first ?? "")
                NavigationLink(destination: searchDetailView(item: item, isFavorite: $isFavorite)){
                    HStack{
                        AsyncImage(url: URL(string: item.galleryURL.first ?? ""),content:{ returnedImage in
                            returnedImage
                                .resizable()
                                .scaledToFit()
                                .frame(width: 100, height: 100)
                                .cornerRadius(/*@START_MENU_TOKEN@*/10.0/*@END_MENU_TOKEN@*/)
                        }, placeholder: {ProgressView()})
                        VStack(alignment: .leading, spacing: 5){
                            let titlePrefix = item.title.first?.prefix(19) ?? ""
                            let shouldUsePrefix16 = titlePrefix.allSatisfy { $0.isUppercase }
                            let finalTitle = shouldUsePrefix16 ? titlePrefix.prefix(16) : titlePrefix
                            Text(finalTitle.appending("...")).font(.headline)
                            HStack{
                                VStack(alignment: .leading, spacing: 5){
                                    Text("$\(item.sellingStatus?.first?.currentPrice.first?.value ?? "")").foregroundColor(/*@START_MENU_TOKEN@*/.blue/*@END_MENU_TOKEN@*/).font(.headline)
                                    Text(item.shippingInfo?.first?.shippingServiceCost.first?.value == "0.0" ? "FREE SHIPPING" :  "$\(item.shippingInfo?.first?.shippingServiceCost.first?.value ?? "")").foregroundColor(.gray)
                                }
                                Spacer()
//                                Image(systemName: db.isFavorite(ItemID: item.itemId.first ?? "") ? "heart.fill" : "heart")
//                                    .resizable()
//                                    .aspectRatio(contentMode: .fit)
//                                    .frame(width: 28, height: 28)
//                                    .foregroundColor(Color.red)
//                                    .onTapGesture {
//                                        Task{
//                                            if db.isFavorite(ItemID: item.itemId.first ?? "") {
//                                                errorMessage = "Removed from favorites"
//                                                await db.removeWishList(ItemID: item.itemId.first ?? "")
//                                            }else{
//                                                errorMessage = "Added to favorites"
//                                                await db.addWishList(ItemID: item.itemId.first ?? "", Image: item.galleryURL.first ?? "", Title: item.title.first ?? "", Price: item.sellingStatus?.first?.currentPrice.first?.value ?? "", Shipping: item.shippingInfo?.first?.shippingServiceCost.first?.value ?? "", Zipcode: item.postalCode.first ?? "", ConditionID: item.condition?.first?.conditionId.first ?? "")
//                                            }
//                                            showAlert = true
//                                            await db.checkWishList()
//                                            DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
//                                                showAlert = false
//                                            }
//                                        }
//                                    }
                                Button{
                                    Task{
                                        if isFavorite{
                                            errorMessage = "Removed from favorites"
                                            await db.removeWishList(ItemID: item.itemId.first ?? "")
                                        } else {
                                            errorMessage = "Added to favorites"
                                            await db.addWishList(ItemID: item.itemId.first ?? "", Image: item.galleryURL.first ?? "", Title: item.title.first ?? "", Price: item.sellingStatus?.first?.currentPrice.first?.value ?? "", Shipping: item.shippingInfo?.first?.shippingServiceCost.first?.value ?? "", Zipcode: item.postalCode.first ?? "", ConditionID: item.condition?.first?.conditionId.first ?? "")
                                        }
                                        showAlert = true
                                        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
                                            showAlert = false
                                        }
                                        await db.checkWishList()
                                        isFavorite = db.isFavorite(ItemID: item.itemId.first ?? "")
                                    }
                                } label:{
                                        Image(systemName: db.isFavorite(ItemID: item.itemId.first ?? "") ? "heart.fill" : "heart")
                                            .resizable()
                                            .aspectRatio(contentMode: .fit)
                                            .frame(width: 28, height: 28)
                                            .foregroundColor(Color.red)
                                }.buttonStyle(.plain)
                            }
                            var conditionDisplay: String {
                                guard let conditionId = item.condition?.first?.conditionId.first else {
                                    return "NA"
                                }
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
                                Text(item.postalCode.first ?? "")
                                Spacer()
                                Text(conditionDisplay)
                            }.foregroundColor(.gray)
                        }
                    }
                }
                .navigationViewStyle(StackNavigationViewStyle()) // used to omit the space between the nagivation bar and content
                
            }
        }
//            }
//        }
    }
}


//struct ContentView_Previews: PreviewProvider {
//    static let fixeddata = """
//        {"findItemsAdvancedResponse":[{"ack":["Success"],"version":["1.13.0"],"timestamp":["2023-11-21T05:33:59.462Z"],"searchResult":[{"@count":"3","item":[{"itemId":["295925356766"],"title":["Phone Case Cover for iPhone15 14 13 12 ProMax Electroplating Heat Dissipation"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["20349"],"categoryName":["Cases, Covers & Skins"]}],"galleryURL":["https://i.ebayimg.com/thumbs/images/g/A6wAAOSwBWZk~YQF/s-l140.jpg"],"viewItemURL":["https://www.ebay.com/itm/Phone-Case-Cover-iPhone15-14-13-12-ProMax-Electroplating-Heat-Dissipation-/295925356766?var=594117197952"],"autoPay":["false"],"postalCode":["900**"],"location":["Los Angeles,CA,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"0.0"}],"shippingType":["Free"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["3"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"9.34"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"9.34"}],"sellingState":["Active"],"timeLeft":["P19DT4H14M55S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2023-09-11T08:49:00.000Z"],"endTime":["2023-12-10T09:48:54.000Z"],"listingType":["FixedPrice"],"gift":["false"]}],"returnsAccepted":["true"],"distance":[{"@unit":"mi","__value__":"5.0"}],"condition":[{"conditionId":["1000"],"conditionDisplayName":["New"]}],"isMultiVariationListing":["true"],"topRatedListing":["false"]},{"itemId":["394870447899"],"title":["Electroplating Heat Dissipation Plating Fine Hole Case Cover for iPhone 14 13 12"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["20349"],"categoryName":["Cases, Covers & Skins"]}],"galleryURL":["https://i.ebayimg.com/thumbs/images/g/FFwAAOSw8DxlHkcH/s-l140.jpg"],"viewItemURL":["https://www.ebay.com/itm/Electroplating-Heat-Dissipation-Plating-Fine-Hole-Case-Cover-iPhone-14-13-12-/394870447899?var=663436046725"],"autoPay":["false"],"postalCode":["900**"],"location":["Los Angeles,CA,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"0.0"}],"shippingType":["Free"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["3"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"9.89"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"9.89"}],"sellingState":["Active"],"timeLeft":["P19DT5H4M57S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2023-09-11T09:39:04.000Z"],"endTime":["2023-12-10T10:38:56.000Z"],"listingType":["FixedPrice"],"gift":["false"]}],"returnsAccepted":["true"],"distance":[{"@unit":"mi","__value__":"5.0"}],"condition":[{"conditionId":["1000"],"conditionDisplayName":["New"]}],"isMultiVariationListing":["true"],"topRatedListing":["false"]},{"itemId":["404599761538"],"title":["For iPhone 14 15 Pro Max Magnetic Leather Wallet Stand Case Screen Protector"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["20349"],"categoryName":["Cases, Covers & Skins"]}],"galleryURL":["https://i.ebayimg.com/thumbs/images/g/a-4AAOSwfcNlIrRr/s-l140.jpg"],"viewItemURL":["https://www.ebay.com/itm/iPhone-14-15-Pro-Max-Magnetic-Leather-Wallet-Stand-Case-Screen-Protector-/404599761538?var=674591587231"],"autoPay":["false"],"postalCode":["900**"],"location":["Los Angeles,CA,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"0.0"}],"shippingType":["Free"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["3"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"11.04"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"11.04"}],"sellingState":["Active"],"timeLeft":["P14DT5H57M4S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2023-11-06T11:31:08.000Z"],"endTime":["2023-12-05T11:31:03.000Z"],"listingType":["FixedPrice"],"gift":["false"]}],"returnsAccepted":["true"],"distance":[{"@unit":"mi","__value__":"5.0"}],"condition":[{"conditionId":["1000"],"conditionDisplayName":["New"]}],"isMultiVariationListing":["true"],"topRatedListing":["false"]}]}],"paginationOutput":[{"pageNumber":["1"],"entriesPerPage":["50"],"totalPages":["1"],"totalEntries":["35"]}],"itemSearchURL":["https://www.ebay.com/sch/i.html?LH_Distance=90009..5&_nkw=iPhone15ProMax&_ddo=1&_fpos=90009&_fspt=1&_ipg=50&_pgn=1&_pos=90009&_sadis=5&_stpos=90009"]}]}
//""".data(using: .utf8)!
//    static var previews: some View {
//            do {
//                let result = try JSONDecoder().decode(SearchResultResponse.self, from: fixeddata)
//                let items = result.findItemsAdvancedResponse.first?.searchResult.first?.item
//                return AnyView(searchResultView(getSearchResult: true, result: items!))
//            } catch {
//                // Handle the decoding error
//                return AnyView(Text("Error decoding JSON: \(error.localizedDescription)"))
//            }
//        }
//        
//}
