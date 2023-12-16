import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetLocationService } from './get-location.service';

@Injectable({
  providedIn: 'root'
})
export class EbaySearchResultService {
  private url = 'https://jliu2620.wl.r.appspot.com/searchResult?';
  private results: any;
  constructor(private http: HttpClient, private getLocalPostal: GetLocationService){ }
  searchOnCurrentLocation(keyword: string, category: string, newCond: string, usedCond: string, localPickup: string, freeShipping: string, distance: number){
    return new Observable ((observer) => {
      this.getLocalPostal.getLocalPostal().subscribe((response: any) => {
        let zipCode = response.postal;
        console.log(zipCode);
        let url = this.url + 'keyword=' + keyword + '&category=' + category + '&newCond=' + newCond + '&usedCond=' + usedCond + '&localPickup=' + localPickup + '&freeShipping=' + freeShipping + '&distance=' + distance + '&zipCode=' + zipCode;
        this.http.get(url).subscribe((response: any) => {
          this.results = response;
          observer.next(response);
        });
      });
    });
  }
  searchOnPostalcode(keyword: string, category: string, newCond: string, usedCond: string, localPickup: string, freeShipping: string, distance: number, zipCode: string){
    let url = this.url + 'keyword=' + keyword + '&category=' + category + '&newCond=' + newCond + '&usedCond=' + usedCond + '&localPickup=' + localPickup + '&freeShipping=' + freeShipping + '&distance=' + distance + '&zipCode=' + zipCode;
    return new Observable ((observer) => {
      this.http.get(url).subscribe((response: any) => {
        this.results = response;
        observer.next(response);
      });
    });
  }
  getResults() {
    return this.results;
  }
  // private searchOnItemIdResult: any;
  searchOnItemId(itemId: string){
    let url = 'https://jliu2620.wl.r.appspot.com/searchResult/OnItemID?' + 'itemId=' + itemId;
    return new Observable ((observer) => {
      this.http.get(url).subscribe((response: any) => {
        // this.searchOnItemIdResult = response;
        observer.next(response);
      });
    });
  }
  // getSearchOnItemIdResult() {
  //   return this.searchOnItemIdResult;
  // }

}


