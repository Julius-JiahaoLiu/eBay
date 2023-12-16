import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class WishlistSearchDetailsService {
  itemResults: any;
  itemDetails: any;
  constructor(private http: HttpClient) { }
  searchDetails(itemId: string){
    let url1 = 'https://jliu2620.wl.r.appspot.com/searchResult/OnItemID?' + 'itemId=' + itemId;
    let url2 = 'https://jliu2620.wl.r.appspot.com/searchDetail?' + 'itemId=' + itemId;
    const itemResultsObservable = this.http.get(url1);
    const itemDetailsObservable = this.http.get(url2);
    // Combine both observables and return the result as an object
    return forkJoin([itemResultsObservable, itemDetailsObservable]).pipe(map((responses: any) => {
      let itemResults = null;
      let itemDetails = null;
      if(responses[0].findItemsAdvancedResponse && responses[0].findItemsAdvancedResponse[0].searchResult[0].item){
        itemResults = responses[0].findItemsAdvancedResponse[0].searchResult[0].item[0];
        this.itemResults = itemResults;
      }
      itemDetails = responses[1];
      this.itemDetails = itemDetails;
      return { itemResults, itemDetails };
      })
    );
  }
}
