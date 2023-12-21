//
//  infoTabView.swift
//  HW4
//
//  Created by 刘珈豪 on 2023/11/24.
//

import SwiftUI

struct infoTabView: View {
    var searchDetails: SearchDetailResponse.Item?
    var getDetail: Bool = false
    var body: some View {
        if getDetail{
                VStack(alignment: .leading, spacing: 10){
                    TabView {
                        ForEach(searchDetails?.PictureURL ?? [], id: \.self) { url in
                            AsyncImage(url: URL(string: url),content:{ returnedImage in
                                returnedImage
                                    .resizable()
                                    .scaledToFit()
                                    .frame(height: 250)
                            }, placeholder: {ProgressView()})
                        }
                    }
                    .tabViewStyle(PageTabViewStyle())
                    //                .indexViewStyle(PageIndexViewStyle(backgroundDisplayMode: PageIndexViewStyle.BackgroundDisplayMode.never))
                    Text(searchDetails?.Title ?? "").padding(.horizontal)
                    Text("$\(String(format: "%.2f", searchDetails?.CurrentPrice.Value ?? 0.0))").foregroundColor(/*@START_MENU_TOKEN@*/.blue/*@END_MENU_TOKEN@*/).padding(.horizontal)
                    HStack{
                        Image(systemName: "magnifyingglass")
                        Text("Description")
                    }.padding(.horizontal)
                }
                .frame(maxHeight: 400)
                ScrollView {
                    VStack{
                        ForEach(searchDetails?.ItemSpecifics?.NameValueList ?? [], id: \.self){ list in
                            Divider().overlay(Color.gray)
                            HStack{
                                VStack{
                                    Text(list.Name)
                                }.frame(maxWidth: .infinity, alignment: .leading)
                                VStack{
                                    Text(list.Value.first ?? "")
                                }.frame(maxWidth: .infinity, alignment: .leading)
                            }
                        }.frame(maxWidth: .infinity)
                    }.padding(.horizontal)
                }.frame(maxHeight: 300)
        }else{
            ProgressView()
        }
    }
}

#Preview {
    infoTabView()
}
