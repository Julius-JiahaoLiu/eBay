//
//  keywordAlertView.swift
//  HW4
//
//  Created by 刘珈豪 on 2023/11/18.
//

import SwiftUI

struct keywordAlertView: View {
    var errorMessage: String
    var body: some View {
        VStack {
            Text(errorMessage)
                .font(.headline)
                .foregroundColor(Color.white)
                .padding()
                .background(Color.black)
                .cornerRadius(8)
        }
    }
}

#Preview {
    keywordAlertView(errorMessage: "Keyword is mandotary")
}
