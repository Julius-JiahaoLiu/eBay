//
//  searchDetailView.swift
//  HW4
//
//  Created by 刘珈豪 on 2023/11/20.
//

import SwiftUI

struct searchDetailView: View {
    let item: SearchResultResponse.FindItemsAdvancedResponse.SearchResult.Item?
    @State private var getDetail = false
    @StateObject private var searchDetail = searchDetailModel()
    @StateObject var db = mongodbModel()
    @State var ItemID = ""
    @Binding var isFavorite: Bool
    @State var detailFavorite: Bool = false
    @State var shipCost = ""
    
    var body: some View {
        tabViewContent()
        .onAppear{
            Task{
                ItemID = item?.itemId.first ?? ""
                detailFavorite = isFavorite
                getDetail = false
                await searchDetail.search(itemId: ItemID)
                getDetail = true
            }
        }
        .navigationBarTitle("", displayMode: .inline) // this is used to remove the whitespace under the NavigationBar
        .navigationBarItems(
            trailing: 
                HStack(spacing: 10) {
                    Button(action: {
                        guard let url = URL(string: "https://www.facebook.com/sharer/sharer.php?u=" + (searchDetail.searchDetails?.ViewItemURLForNaturalSearch ?? "")) else {
                                return
                        }
                        UIApplication.shared.open(url)
                    }) {Image("fb").resizable().frame(width: 25, height: 25)}
                    Button{
                        Task{
                            if detailFavorite {
                                await db.removeWishList(ItemID: ItemID)
                            } else {
                                await db.addWishList(ItemID: ItemID, Image: item?.galleryURL.first ?? "", Title: item?.title.first ?? "", Price: item?.sellingStatus?.first?.currentPrice.first?.value ?? "", Shipping: item?.shippingInfo?.first?.shippingServiceCost.first?.value ?? "", Zipcode: item?.postalCode.first ?? "", ConditionID: item?.condition?.first?.conditionId.first ?? "")
                            }
                            await db.checkWishList()
//                            isFavorite.toggle()
                            detailFavorite = db.isFavorite(ItemID: ItemID)
                            isFavorite = db.isFavorite(ItemID: ItemID)
                        }
                    } label:{
                            Image(systemName: detailFavorite ? "heart.fill" : "heart")
                                .resizable()
                                .aspectRatio(contentMode: .fit)
                                .frame(width: 25, height: 25)
                                .foregroundColor(Color.red)
                    }.buttonStyle(.plain)
                })
    }
    // Function to define content based on the selected tab
    @ViewBuilder
    private func tabViewContent() -> some View {
        TabView {
            Group{
                VStack {
                    infoTabView(searchDetails: searchDetail.searchDetails, getDetail: getDetail)
                }
                .tabItem {
                    Image(systemName: "info.circle")
                    Text("Info")
                }
                VStack {
                    shippingTabView(searchDetails: searchDetail.searchDetails, shippingCost: shipCost, getDetail: getDetail).onAppear{
                        getDetail = false;
                        Timer.scheduledTimer(withTimeInterval: 0.5, repeats: false) { _ in
                            shipCost =  item?.shippingInfo?.first?.shippingServiceCost.first?.value == "0.0" ? "FREE" : (item?.shippingInfo?.first?.shippingServiceCost.first?.value ?? "0.0")
                            getDetail = true;
                        }
                    }
                }
                .tabItem {
                    Image(systemName: "shippingbox")
                    Text("Shipping")
                }
                VStack {
                    photosTabView(title: searchDetail.searchDetails?.Title ?? "")
                }
                .tabItem {
                    Image(systemName: "photo.stack.fill")
                    Text("Photos")
                }
                VStack {
                    similarTabView(itemId: item?.itemId.first ?? "")
                }
                .tabItem {
                    Image(systemName: "list.bullet.indent")
                    Text("Similar")
                }
            }.toolbarBackground(.visible, for: .tabBar)
        }
        .indexViewStyle(PageIndexViewStyle(backgroundDisplayMode: .always))
        .ignoresSafeArea(.container)
    }
}
//struct BackButton: View {
//    let label: String
//    @Environment(\.presentationMode) var presentationMode
//    var body: some View {
//        HStack {
//            Image(systemName: "chevron.left")
//            Text(label)
//        }.foregroundColor(.blue)
//        .onTapGesture {
//            presentationMode.wrappedValue.dismiss() // Handle back button action
//        }
//    }
//}

//struct ContentView_Previews: PreviewProvider {
//    static let fixeddata = """
//        {"findItemsAdvancedResponse":[{"ack":["Success"],"version":["1.13.0"],"timestamp":["2023-11-21T05:33:59.462Z"],"searchResult":[{"@count":"3","item":[{"itemId":["295925356766"],"title":["Phone Case Cover for iPhone15 14 13 12 ProMax Electroplating Heat Dissipation"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["20349"],"categoryName":["Cases, Covers & Skins"]}],"galleryURL":["https://i.ebayimg.com/thumbs/images/g/A6wAAOSwBWZk~YQF/s-l140.jpg"],"viewItemURL":["https://www.ebay.com/itm/Phone-Case-Cover-iPhone15-14-13-12-ProMax-Electroplating-Heat-Dissipation-/295925356766?var=594117197952"],"autoPay":["false"],"postalCode":["900**"],"location":["Los Angeles,CA,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"0.0"}],"shippingType":["Free"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["3"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"9.34"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"9.34"}],"sellingState":["Active"],"timeLeft":["P19DT4H14M55S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2023-09-11T08:49:00.000Z"],"endTime":["2023-12-10T09:48:54.000Z"],"listingType":["FixedPrice"],"gift":["false"]}],"returnsAccepted":["true"],"distance":[{"@unit":"mi","__value__":"5.0"}],"condition":[{"conditionId":["1000"],"conditionDisplayName":["New"]}],"isMultiVariationListing":["true"],"topRatedListing":["false"]},{"itemId":["394870447899"],"title":["Electroplating Heat Dissipation Plating Fine Hole Case Cover for iPhone 14 13 12"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["20349"],"categoryName":["Cases, Covers & Skins"]}],"galleryURL":["https://i.ebayimg.com/thumbs/images/g/FFwAAOSw8DxlHkcH/s-l140.jpg"],"viewItemURL":["https://www.ebay.com/itm/Electroplating-Heat-Dissipation-Plating-Fine-Hole-Case-Cover-iPhone-14-13-12-/394870447899?var=663436046725"],"autoPay":["false"],"postalCode":["900**"],"location":["Los Angeles,CA,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"0.0"}],"shippingType":["Free"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["3"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"9.89"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"9.89"}],"sellingState":["Active"],"timeLeft":["P19DT5H4M57S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2023-09-11T09:39:04.000Z"],"endTime":["2023-12-10T10:38:56.000Z"],"listingType":["FixedPrice"],"gift":["false"]}],"returnsAccepted":["true"],"distance":[{"@unit":"mi","__value__":"5.0"}],"condition":[{"conditionId":["1000"],"conditionDisplayName":["New"]}],"isMultiVariationListing":["true"],"topRatedListing":["false"]},{"itemId":["404599761538"],"title":["For iPhone 14 15 Pro Max Magnetic Leather Wallet Stand Case Screen Protector"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["20349"],"categoryName":["Cases, Covers & Skins"]}],"galleryURL":["https://i.ebayimg.com/thumbs/images/g/a-4AAOSwfcNlIrRr/s-l140.jpg"],"viewItemURL":["https://www.ebay.com/itm/iPhone-14-15-Pro-Max-Magnetic-Leather-Wallet-Stand-Case-Screen-Protector-/404599761538?var=674591587231"],"autoPay":["false"],"postalCode":["900**"],"location":["Los Angeles,CA,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"0.0"}],"shippingType":["Free"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["3"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"11.04"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"11.04"}],"sellingState":["Active"],"timeLeft":["P14DT5H57M4S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2023-11-06T11:31:08.000Z"],"endTime":["2023-12-05T11:31:03.000Z"],"listingType":["FixedPrice"],"gift":["false"]}],"returnsAccepted":["true"],"distance":[{"@unit":"mi","__value__":"5.0"}],"condition":[{"conditionId":["1000"],"conditionDisplayName":["New"]}],"isMultiVariationListing":["true"],"topRatedListing":["false"]}]}],"paginationOutput":[{"pageNumber":["1"],"entriesPerPage":["50"],"totalPages":["1"],"totalEntries":["35"]}],"itemSearchURL":["https://www.ebay.com/sch/i.html?LH_Distance=90009..5&_nkw=iPhone15ProMax&_ddo=1&_fpos=90009&_fspt=1&_ipg=50&_pgn=1&_pos=90009&_sadis=5&_stpos=90009"]}]}
//""".data(using: .utf8)!
//    static var previews: some View {
//            do {
//                let result = try JSONDecoder().decode(SearchResultResponse.self, from: fixeddata)
//                let item = result.findItemsAdvancedResponse.first?.searchResult.first?.item.last
//                return AnyView(searchDetailView(item: item, isFavorite: false))
//            } catch {
//                // Handle the decoding error
//                return AnyView(Text("Error decoding JSON: \(error.localizedDescription)"))
//            }
//        }
//
//}


