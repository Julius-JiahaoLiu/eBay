//
//  ipInfoModel.swift
//  HW4
//
//  Created by 刘珈豪 on 2023/11/19.
//

import Foundation

class ipInfoModel: ObservableObject{
    @Published var ipInfo = "";
    func getIpInfo() async{
        guard let url = URL(string: "https://ipinfo.io/json?token=504adc0440f374") else {
           print("Invalid URL")
           return
        }
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            let result = try JSONDecoder().decode(ipInfoResponse.self, from: data)
            self.ipInfo = result.postal
        } catch {
            print("Error fetching IP info: \(error)")
        }
    }
}
struct ipInfoResponse: Decodable{
    let postal: String
}
