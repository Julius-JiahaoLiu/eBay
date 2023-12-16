//
//  shippingTabView.swift
//  HW4
//
//  Created by 刘珈豪 on 2023/11/25.
//

import SwiftUI

struct shippingTabView: View {
    var searchDetails: SearchDetailResponse.Item?
    var shippingCost: String?
    var getDetail: Bool = false
    var body: some View {
        if getDetail{
            VStack(alignment: .leading, spacing: 10){
                if((searchDetails?.Storefront) != nil || (searchDetails?.Seller?.FeedbackScore) != nil ||
                   (searchDetails?.Seller?.PositiveFeedbackPercent) != nil){
                    Divider().overlay(Color.gray)
                    HStack{
                        Image(systemName: "storefront")
                        Text("Seller")
                    }.frame(alignment: .leading).padding(.horizontal)
                    Divider().overlay(Color.gray)
                    if ((searchDetails?.Storefront) != nil ){
                        HStack{
                            VStack{
                                Text("Store Name")
                            }.frame(maxWidth: .infinity)
                            VStack{
                                Link(destination: URL(string: searchDetails?.Storefront?.StoreURL ?? "") ?? URL(string: "https://www.example.com")!) {
                                    Text(searchDetails?.Storefront?.StoreName ?? "")
                                        .multilineTextAlignment(.center)
                                }
                            }.frame(maxWidth: .infinity)
                        }
                    }
                    if((searchDetails?.Seller?.FeedbackScore) != nil){
                        HStack{
                            VStack{
                                Text("Feedback Score")
                            }.frame(maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/)
                            VStack{
                                Text(String(format: "%d", searchDetails?.Seller?.FeedbackScore ?? 0))
                                    .multilineTextAlignment(.center)
                            }.frame(maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/)
                        }
                    }
                    if((searchDetails?.Seller?.PositiveFeedbackPercent) != nil){
                        HStack{
                            VStack{
                                Text("Popularity")
                            }.frame(maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/)
                            VStack{
                                Text(String(format: "%.2f", searchDetails?.Seller?.PositiveFeedbackPercent ?? 0.00)).multilineTextAlignment(.center)
                            }.frame(maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/)
                        }
                    }
                }
                if((searchDetails?.HandlingTime) != nil || (searchDetails?.GlobalShipping) != nil ||
                   (shippingCost) != nil){
                    Divider().overlay(Color.gray)
                    HStack{
                        Image(systemName: "sailboat")
                        Text("Shipping Info")
                    }.frame(alignment: .leading).padding(.horizontal)
                    Divider().overlay(Color.gray)
                    if ((shippingCost) != nil ){
                        HStack{
                            VStack{
                                Text("Shipping Cost")
                            }.frame(maxWidth: .infinity)
                            VStack{
                                Text(shippingCost ?? "FREE")
                                    .multilineTextAlignment(.center)
                            }.frame(maxWidth: .infinity)
                        }
                    }
                    if((searchDetails?.GlobalShipping) != nil){
                        HStack{
                            VStack{
                                Text("Global Shipping")
                            }.frame(maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/)
                            VStack{
                                Text(searchDetails?.GlobalShipping == true ? "YES" : "NO").multilineTextAlignment(.center)
                            }.frame(maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/)
                        }
                    }
                    if((searchDetails?.Seller?.PositiveFeedbackPercent) != nil){
                        HStack{
                            VStack{
                                Text("Handling Time")
                            }.frame(maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/)
                            VStack{
                                Text(String(format: "%d", searchDetails?.HandlingTime ?? 0) + " day").multilineTextAlignment(.center)
                            }.frame(maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/)
                        }
                    }
                }
                if((searchDetails?.ReturnPolicy) != nil){
                    Divider().overlay(Color.gray)
                    HStack{
                        Image(systemName: "return")
                        Text("Return policy")
                    }.frame(alignment: .leading).padding(.horizontal)
                    Divider().overlay(Color.gray)
                    if ((searchDetails?.ReturnPolicy?.ReturnsAccepted) != nil ){
                        HStack{
                            VStack{
                                Text("Policy")
                            }.frame(maxWidth: .infinity)
                            VStack{
                                Text(searchDetails?.ReturnPolicy?.ReturnsAccepted ?? "").multilineTextAlignment(.center)
                            }.frame(maxWidth: .infinity)
                        }
                    }
                    if((searchDetails?.ReturnPolicy?.Refund) != nil){
                        HStack{
                            VStack{
                                Text("Refund Mode")
                            }.frame(maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/)
                            VStack{
                                Text(searchDetails?.ReturnPolicy?.Refund ?? "")
                                    .multilineTextAlignment(.center)
                            }.frame(maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/)
                        }
                    }
                    if((searchDetails?.ReturnPolicy?.ReturnsWithin) != nil){
                        HStack{
                            VStack{
                                Text("Return Within")
                            }.frame(maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/)
                            VStack{
                                Text(searchDetails?.ReturnPolicy?.ReturnsWithin ?? "")
                                    .multilineTextAlignment(.center)
                            }.frame(maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/)
                        }
                    }
                    if((searchDetails?.ReturnPolicy?.ShippingCostPaidBy) != nil){
                        HStack{
                            VStack{
                                Text("Shipping Cost Paid By")
                            }.frame(maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/)
                            VStack{
                                Text(searchDetails?.ReturnPolicy?.ShippingCostPaidBy ?? "").multilineTextAlignment(.center)
                            }.frame(maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/)
                        }
                    }
                }
                
            }.frame(maxHeight: 600)
        }
        else{
            ProgressView()
        }
    }
}

#Preview {
    shippingTabView()
}
