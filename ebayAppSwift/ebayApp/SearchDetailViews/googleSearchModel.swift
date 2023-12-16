//
//  googleSearchModel.swift
//  HW4
//
//  Created by 刘珈豪 on 2023/11/25.
//

import Foundation

@MainActor
class googleSearchModel: NSObject, ObservableObject {
    @Published var photoLinks: [googleSearchResponse.Photolink]? // optional
    func removeSymbolsAndEmojis(from input: String) -> String {
        // Define a regular expression pattern to match symbols and emojis
        let pattern = #"[^a-zA-Z0-9 ]"#
        do {
            let regex = try NSRegularExpression(pattern: pattern, options: .caseInsensitive)
            let range = NSRange(location: 0, length: input.utf16.count)
            let filteredString = regex.stringByReplacingMatches(in: input, options: [], range: range, withTemplate: "")
            return filteredString
        } catch {
            print("Error creating regular expression: \(error)")
            return input
        }
    }
    func search(keyword: String) async {
        let resultString = removeSymbolsAndEmojis(from: keyword)
        guard let url = URL(string: "https://jliu2620.wl.r.appspot.com/googleSearchEngine?keyword=" + resultString) else {
            print("Invalid URL")
            return
        }
        do{
            let (data, _) = try await URLSession.shared.data(from: url)
            let result = try JSONDecoder().decode(googleSearchResponse.self, from: data)
            photoLinks = result.items
        }catch {
            print("Error decoding JSON: \(error)")
        }

    }
}

struct googleSearchResponse: Decodable{
    let items: [Photolink]?
    struct Photolink: Decodable, Hashable{
        let kind: String
        let title: String
        let link: String
        func hash(into hasher: inout Hasher) {
            hasher.combine(kind)
            hasher.combine(title)
            hasher.combine(link)
        }
        static func == (lhs: Photolink, rhs: Photolink) -> Bool {
            return lhs.kind == rhs.kind && lhs.title == rhs.title && lhs.link == rhs.link
        }
    }
}
