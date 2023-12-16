import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetLocationService {
  
  constructor( private http: HttpClient) {}
  getLocalPostal() {
    let url = 'https://ipinfo.io/json?token=504adc0440f374';
    return new Observable ((observer) => {
      this.http.get(url).subscribe((response: any) => {
        observer.next(response);
      });
    });
  }
}