import { Component, Input } from '@angular/core';
import { EbaySimilarItemsService } from '../ebay-similar-items.service';
@Component({
  selector: 'app-similar-tag',
  templateUrl: './similar-tag.component.html',
  styleUrls: ['./similar-tag.component.css']
})
export class SimilarTagComponent {
  @Input() itemId: any;
  similarItems: any = [];
  hasSimilarItems: boolean = false;
  itemsToShow: number = 5;
  isLoading: boolean = true;
  constructor(private ebaySimilarItemsService: EbaySimilarItemsService) {}
  ngOnInit(): void {
    this.ebaySimilarItemsService.getSimilarItems(this.itemId).subscribe((data: any) => {
      console.log(data);
      if(data.getSimilarItemsResponse && data.getSimilarItemsResponse.itemRecommendations && data.getSimilarItemsResponse.itemRecommendations.item){
        this.hasSimilarItems = true;
        this.similarItems = data.getSimilarItemsResponse.itemRecommendations.item;
        this.itemsToShow = this.similarItems.length < 5 ? this.similarItems.length : 5;
        this.isLoading = false;
      }else{
        this.hasSimilarItems = false;               
        this.similarItems = [];
        this.isLoading = false;
      }
    });
  }
  sortingOptions: string = 'Default';
  setSorting(str: string){
    this.sortingOptions = str;
    this.sortItems();
  }
  ascendingOptions: string = 'Ascending';
  setAscending(str: string){  
    this.ascendingOptions = str;
    this.sortItems();
  }
  daysTrans(str: string){
    return str.match(/\d+/)?.[0] ?? 'N/A';
  }
  sortItems(): any{
    if(this.sortingOptions === 'Default'){
      return this.similarItems;
    }
    else{
      let sortedItems = [...this.similarItems];
      if(this.sortingOptions === 'Product Name'){
        sortedItems.sort(function(a: any, b: any) {
          return a.title.localeCompare(b.title);
        });
      }else if(this.sortingOptions === 'Days Left'){
        sortedItems.sort(function(a: any, b: any) {
          return parseInt(a.timeLeft.match(/\d+/)[0]) - parseInt(b.timeLeft.match(/\d+/)[0]);
        });
      }else if(this.sortingOptions === 'Price'){
        sortedItems.sort(function(a: any, b: any) {
          return parseFloat(a.buyItNowPrice.__value__) - parseFloat(b.buyItNowPrice.__value__);
        });
      }else if(this.sortingOptions === 'Shipping Cost'){
        sortedItems.sort(function(a: any, b: any) {
          return parseFloat(a.shippingCost.__value__) - parseFloat(b.shippingCost.__value__);
        });
      }
      if(this.ascendingOptions === 'Descending'){
        sortedItems.reverse();
      }
      return sortedItems;
    }
  }
  showMore = false;
  changeButton(){
    this.showMore = !this.showMore;
    if(this.showMore){
      this.itemsToShow = this.similarItems.length;
    }else{
      this.itemsToShow = this.similarItems.length < 5 ? this.similarItems.length : 5;
    }
  }
}
