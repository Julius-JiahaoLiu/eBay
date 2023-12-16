//
//  searchFormView.swift
//  HW4
//
//  Created by 刘珈豪 on 2023/11/15.
//

import SwiftUI

struct searchFormView: View {
    @State private var keyword: String = ""
    @State private var selectedCategory: String = "All"
    @State private var isNew: Bool = false
    @State private var isUsed: Bool = false
    @State private var isUnspecified: Bool = false
    @State private var isPickup: Bool = false
    @State private var isFreeShipping: Bool = false
    @State private var distance: String = ""
    @State private var isZipcode: Bool = false
    @State private var zipcode: String = ""
    @StateObject private var zipcodeSearch = zipcodeSearchModel()
    @State private var isPopoverPresented = false
    @State private var selectedZipcode: String?
    
    @State private var showAlert = false
    @State private var errorMessage = ""

    @StateObject private var searchForm = searchFormModel()
    @State private var showSearchResult = false
    @State private var getSearchResult = false
    @StateObject private var db = mongodbModel()
    
    var body: some View {
        NavigationView{
            List{
                Section{
                    HStack {
                        Text("Keyword:")
                        TextField("Required", text: $keyword)
                    }
                    
                    HStack {
                        Text("Category:")
                        Picker("", selection: $selectedCategory) {
                            Text("All").tag("All")
                            Text("Art").tag("Art")
                            Text("Baby").tag("Baby")
                            Text("Books").tag("Books")
                            Text("Clothing, Shoes & Accesories").tag("Clothing")
                            Text("Computers/Tablets & Networking").tag("Computers")
                            Text("Health & Beauty").tag("Health")
                            Text("Music").tag("Music")
                            Text("Video Games & Consoles").tag("Video")
                        }
                        .pickerStyle(MenuPickerStyle())
                    }
                    
                    HStack {
                        VStack(alignment: .leading) {
                            Text("Condition:")
                            HStack{
                                Spacer()
                                CustomCheckmark(isChecked: $isUsed).onTapGesture {
                                    isUsed.toggle()
                                }
                                Text("Used")
                                CustomCheckmark(isChecked: $isNew).onTapGesture {
                                    isNew.toggle()
                                }
                                Text("New")
                                CustomCheckmark(isChecked: $isUnspecified).onTapGesture {
                                    isUnspecified.toggle()
                                }
                                Text("Unspecified")
                                Spacer()
                            }
                            .padding(.vertical, 3.0)
                        }
                    }
                    
                    HStack {
                        VStack(alignment: .leading){
                            Text("Shipping:")
                            HStack{
                                Spacer()
                                CustomCheckmark(isChecked: $isPickup).onTapGesture {
                                    isPickup.toggle()
                                }
                                Text("Pickup")
                                CustomCheckmark(isChecked: $isFreeShipping).onTapGesture {
                                    isFreeShipping.toggle()
                                }
                                Text("Free Shipping")
                                Spacer()
                            }.padding(.vertical, 3.0)
                        }
                    }
                    
                    HStack {
                        Text("Distance:")
                        TextField("10", text: $distance)
                            .keyboardType(.numberPad)
                    }
                    
                    HStack {
                        VStack{
                            Toggle("Custom Location", isOn: $isZipcode)
                            if isZipcode {
                                HStack {
                                    Text("Zipcode:")
                                    TextField("Required", text: $zipcode)
                                        .keyboardType(.numberPad)
                                        .onChange(of: zipcode){
                                            if zipcode.count < 5{
                                                DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                                                    zipcodeSearch.search(text: zipcode)
                                                }
                                            }
                                        }.onReceive(zipcodeSearch.$zipcodes) { updatedZipcodes in // represents the unwrapped or copied value of zipcodeSearch.$zipcodes
                                            if !updatedZipcodes.isEmpty && zipcode.count < 5 {
                                                isPopoverPresented = true
                                            }
                                        }.popover(isPresented: $isPopoverPresented, arrowEdge: .bottom) {
                                            zipcodeSelectionView(zipcodes: zipcodeSearch.zipcodes, didSelectZipcode: { selectedZipcode in
                                                // Handle the selected zipcode
                                                self.zipcode = selectedZipcode
                                                isPopoverPresented = false
                                            })
                                        }
                                }
                            }
                        }
                    }
                    
                    HStack {
                        Spacer()
                        Button(action:{submitForm()}) {
                            Text("Submit")
                                .foregroundColor(Color.white)
                                .padding()
                                .background(Color.blue)
                                .cornerRadius(8)
                        }.buttonStyle(.plain) // in case two buttons would be invoked simultaneously
                        Spacer()
                        Button(action: {clearForm()}) {
                            Text("Clear")
                                .foregroundColor(Color.white)
                                .padding()
                                .background(Color.blue)
                                .cornerRadius(8)
                        }.buttonStyle(.plain)
                        Spacer()
                    }
                }
                Section{
                    if showSearchResult {
                        searchResultView(getSearchResult: $getSearchResult, result: searchForm.searchResults, showAlert: $showAlert, errorMessage: $errorMessage)
                    }
                }
            }
            .font(.body)
            .navigationTitle("Product Search")
            .navigationBarItems( // this already in an NavigationView so do NOT add NavigationStack of NavigationView in favoritesView()
                trailing: NavigationLink(destination: favoritesView()) {
                    Image(systemName: "heart.circle")
                        .font(.title2)
                        .foregroundColor(.blue)
                }
            )
            .overlay(
                keywordAlertView(errorMessage: errorMessage)
                    .offset(y: showAlert ? 250 : UIScreen.main.bounds.height)
            )
        }
    }
    
    private func submitForm(){
        if keyword.isEmpty {
            // Show error message and automatically dismiss after 2 seconds
            errorMessage = "Keyword is mandatory"
            showAlert = true
            Timer.scheduledTimer(withTimeInterval: 1.0, repeats: false) { _ in
                showAlert = false
            }
        }else{
            Task{
                searchForm.searchResults = []
                showSearchResult = true
                getSearchResult = false
                await searchForm.search(keyword: keyword, category: selectedCategory, isNew: String(describing:isNew), isUsed: String(describing:isUsed), isPickup: String(describing:isPickup), isFreeShipping: String(describing:isFreeShipping), distance: distance.isEmpty ? "10" : distance, isZipcode: isZipcode, zipcode: zipcode)
                getSearchResult = true
            }
        }
    }
    private func clearForm() {
        keyword = ""
        selectedCategory = "All"
        isNew = false
        isUsed = false
        isUnspecified = false
        isPickup = false
        isFreeShipping = false
        distance = ""
        isZipcode = false
        zipcode = ""
        showSearchResult = false
        getSearchResult = false
        searchForm.searchResults = []
    }
}
struct CustomCheckmark: View {
    @Binding var isChecked: Bool
    var body: some View {
        Image(systemName: isChecked ? "checkmark.square.fill" : "square")
            .foregroundColor(isChecked ? Color.blue : Color.gray)
    }
}
struct CheckboxToggleStyle: ToggleStyle {
    func makeBody(configuration: Configuration) -> some View {
        HStack {
            RoundedRectangle(cornerRadius: 5.0)
                .stroke(lineWidth: 2)
                .frame(width: 18, height: 18)
                .cornerRadius(5.0)
                .overlay {
                    Image(systemName: configuration.isOn ? "checkmark.square.fill" : "")
                }
            configuration.label
        }
    }
}
#Preview {
    searchFormView()
}

