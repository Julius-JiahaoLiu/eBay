//
//  zipcodeSelectionView.swift
//  HW4
//
//  Created by 刘珈豪 on 2023/11/18.
//

import SwiftUI

struct zipcodeSelectionView: View {
    let zipcodes: [String]
    let didSelectZipcode: (String) -> Void
    var body: some View {
        VStack {
            // Center-aligned title
            Text("Pincode suggestions")
                .font(.largeTitle)
                .fontWeight(.bold)
                .padding()
            // List of zipcodes
            List(zipcodes, id: \.self) { zipcode in
                Button(action: {
                    didSelectZipcode(zipcode)
                }) {
                    Text(zipcode)
                        .foregroundColor(.black)
                        .frame(maxWidth: .infinity, alignment: .leading) // Align text to leading
                        .padding(.horizontal)
                }
            }
        }
    }
}

