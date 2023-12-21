//
//  zipcodeSearchModel.swift
//  HW4
//
//  Created by 刘珈豪 on 2023/11/18.
//

import Foundation

@MainActor
class zipcodeSearchModel: ObservableObject{
    @Published var zipcodes = [String]()
    func search(text: String){
        guard let url = URL(string: "https://jliu2620.wl.r.appspot.com/autoComplete?input=\(text)") else {
           print("Invalid URL")
           return
        }
        // Create a URL session
        let task: URLSessionDataTask = URLSession.shared.dataTask(with: url) { (data, response, error) in
            // Check for errors
            if let error = error {
                print("Error: \(error)")
                return
            }
            // Check if data is available
            guard let data = data else {
                print("No data received")
                return
            }
            do {
                // Decode the JSON response
                let result = try JSONDecoder().decode(ZipcodeResponse.self, from: data)
                // Switch to the main actor to update the @Published property
                Task { // for asynchronous execution
                    await MainActor.run { // UI updates must happen on the main thread
                        // Extracting the postalCode property from each PostalCode object in the array.
                        self.zipcodes = result.postalCodes.map { $0.postalCode }
                    }
                }
            } catch {
                print("Error decoding JSON: \(error)")
            }
        }
        task.resume()
    }
}

struct ZipcodeResponse: Decodable {
    let postalCodes: [PostalCode]

    struct PostalCode: Decodable {
        let postalCode: String
        // Add other properties if needed
    }
}
