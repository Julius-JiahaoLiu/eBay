import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostalcodeAutocompleteService {
  private postalcodeList: Array<string> = [];
  private autoCompleteUrl = 'https://jliu2620.wl.r.appspot.com/autoComplete?input=';
  constructor(private http: HttpClient) {
  }
  getPostalcodeList(input: string) {
    this.postalcodeList = [];
    if (input === "") {
      return this.postalcodeList;
    }
    else{
      this.http.get(this.autoCompleteUrl + input).subscribe((response: any) => {
        if (response && response.postalCodes) {
          for (let code of response.postalCodes) {
            this.postalcodeList.push(code.postalCode);
          }
        }
      });
      return this.postalcodeList;
    }
  }
}
