//
//  photosTabView.swift
//  HW4
//
//  Created by 刘珈豪 on 2023/11/25.
//

import SwiftUI

struct photosTabView: View {
    @State var title : String = ""
    @StateObject var googleSearch = googleSearchModel()
    @State var getPhotoLinks = false
    var body: some View {
        Group{
            if getPhotoLinks {
                VStack {
                    HStack{
                        Text("Powered by")
                        Image("google").resizable().frame(width: 90, height: 30)
                    }
                    ScrollView {
                        ForEach(googleSearch.photoLinks ?? [], id: \.link) { link in
                            AsyncImage(url: URL(string: link.link),content:{ returnedImage in
                                returnedImage
                                    .resizable()
                                    .scaledToFit()
                                    .aspectRatio(contentMode: .fit)
                                    .frame(height: 200)
                            }, placeholder: {ProgressView()})
//                            ImageView(urlString: link.link)
//                                .aspectRatio(contentMode: .fit)
//                                .frame(height: 200)
                        }.frame(maxWidth: .infinity) // locate the scroll bar at the right edge of the screen
                    }
                    .padding(.vertical)
                }
            }else{
                ProgressView()
            }
        }.onAppear{
            Task{
                getPhotoLinks = false
                await googleSearch.search(keyword: title)
                getPhotoLinks = true
            }
        }
    }
}

#Preview {
    photosTabView()
}
