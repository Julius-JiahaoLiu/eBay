import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MongoDBService {
  constructor(private http: HttpClient) { }
  checkWishList(): any{
    let url = 'https://jliu2620.wl.r.appspot.com/mongoDB/checkWishList';
    return new Observable ((observer) => {
      this.http.get(url).subscribe((response: any) => {
        observer.next(response);
      });
    });
  }
  addWishList(ItemID: string, Image: string, Title: string, Price: string, Shipping: string, Zipcode: string, ConditionID: string): any{
    let url = 'https://jliu2620.wl.r.appspot.com/mongoDB/addWishList'; 
    // + ItemID + '&Image=' + Image + '&Title=' + Title + '&Price=' + Price + '&Shipping=' + Shipping; 
    console.log(url);
    const params = {
      'ItemID': ItemID,
      'Image': Image,
      'Title': Title,
      'Price': Price,
      'Shipping': Shipping,
      'Zipcode': Zipcode,
      'ConditionID': ConditionID,
    }
    return new Observable ((observer) => {
      this.http.get(url, {params: params}).subscribe((response: any) => {
        observer.next(response);
      });
    });
  }
  removeWishList(ItemID: string): any{
    let url = 'https://jliu2620.wl.r.appspot.com/mongoDB/removeWishList?ItemID=' + ItemID;
    return new Observable ((observer) => {
      this.http.get(url).subscribe((response: any) => {
        observer.next(response);
      });
    });
  }
  getOneItem(ItemID: string): any{
    let url = 'https://jliu2620.wl.r.appspot.com/mongoDB/getOneItem?ItemID=' + ItemID;
    return new Observable ((observer) => {
      this.http.get(url).subscribe((response: any) => {
        observer.next(response);
      });
    });
  }
  getAllWishListItems(): any{
    let url = 'https://jliu2620.wl.r.appspot.com/mongoDB/getAllWishListItems';
    return new Observable ((observer) => {
      this.http.get(url).subscribe((response: any) => {
        observer.next(response);
      });
    });
  }
}
