import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EbaySearchDetailsService {
  private url = 'https://jliu2620.wl.r.appspot.com/searchDetail?';
  private results: any;
  constructor(private http: HttpClient){};
  getDetails(itemId: string){
    let url = this.url + 'itemId=' + itemId;
    return new Observable ((observer) => {
      this.http.get(url).subscribe((response: any) => {
        this.results = response;
        observer.next(response);
      });
    });
  }
  getResults(){
    return this.results;
  }
}
