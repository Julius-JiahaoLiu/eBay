import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EbaySimilarItemsService {

  constructor(private http: HttpClient) { }
  getSimilarItems(itemId: string){
    let url = 'https://jliu2620.wl.r.appspot.com/searchSimilar?itemId=' + itemId;
    return new Observable ((observer) => {
      this.http.get(url).subscribe((response: any) => {
        observer.next(response);
      });
    });
  }
}
