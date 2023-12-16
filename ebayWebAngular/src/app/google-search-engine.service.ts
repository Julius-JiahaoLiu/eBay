import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleSearchEngineService {

  constructor(private http: HttpClient) { }
  getGoogleSearchResult(keyword: string){
    let url = 'https://jliu2620.wl.r.appspot.com/googleSearchEngine?keyword=' + keyword;
    return new Observable ((observer) => {
      this.http.get(url).subscribe((response: any) => {
        observer.next(response);
      });
    });
  }
}
