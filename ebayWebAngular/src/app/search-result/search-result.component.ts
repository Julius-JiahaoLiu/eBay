import { Component, Input, SimpleChanges } from '@angular/core';
import { EbaySearchResultService } from '../ebay-search-result.service';
import { EbaySearchDetailsService } from '../ebay-search-details.service';
import { MongoDBService } from '../mongo-db.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  @Input() searchResults: any;
  @Input() showResult: boolean = false;

  public loading: boolean = false;
  isResultsChosen: boolean = true; // Set to true for the initially chosen button
  isFavoritesChosen: boolean = false; // Set to false for the initially chosen button
  items: any[] = []; 
  pageSize = 10; // Number of items per page
  currentPage = 1; // Current page
  public hasResults: boolean = false;
  public itemResults: any;
  public itemDetails: any;
  public hasDetails: boolean = false;
  public showDetails: boolean = false;
  wishListItemId: any[] = [];

  constructor(private ebaySearchService: EbaySearchResultService, 
              private ebaySearchDetail: EbaySearchDetailsService,
              private mongoDB: MongoDBService ) {} 
  ngOnChanges(changes: SimpleChanges) {
    if ((changes['showResult'] && changes['showResult'].currentValue) || changes['searchResults']){
      this.loading = true;
      this.checkWishList();
      this.loadingResults();
      if(this.searchResults && this.searchResults.findItemsAdvancedResponse[0].searchResult && this.searchResults.findItemsAdvancedResponse[0].searchResult[0].item){
        this.hasResults = true;
        this.items = this.searchResults.findItemsAdvancedResponse[0].searchResult[0].item;
      }
      else {
        this.hasResults = false;
        this.items = [];
      }
    }
  }
  checkWishList(){
    this.mongoDB.checkWishList().subscribe((data: any) => {
      this.wishListItemId = data;
    });
  }
  loadingResults() {
    setTimeout(() => {
      if ( this.ebaySearchService.getResults() !== undefined ) {
        this.loading = false;
      }
    }, 1000);
  }
  showResults(){
    this.isResultsChosen = true;
    this.isFavoritesChosen = false;
    if(this.hasResults){
      this.showResult = true;
      this.showDetails = false;
      this.checkWishList();
    }
  }
  showWishList(){
    this.isResultsChosen = false;
    this.isFavoritesChosen = true;
    this.showResult = false;
    this.showDetails = false;
  }
  toPreDetails(){
    this.showDetails = true;
  }
  searchDetails(itemId: string, itemIndex: number){
    this.loading = true;
    this.showDetails = true;
    this.itemResults = this.items[itemIndex];
    this.loadingResults();
    this.ebaySearchDetail.getDetails(itemId).subscribe((response: any) => {
      console.log(response);
      this.itemDetails = response;
      this.hasDetails = true;
    });
  }
  clearDetails(){
    this.hasResults = false;
    this.itemResults = undefined;
    this.itemDetails = undefined;
    this.hasDetails = false;
    this.showDetails = false;
    this.isResultsChosen = true;
    this.isFavoritesChosen = false;
  }
  inWishList(itemId: string): boolean {
    return this.wishListItemId.some(item => item.ItemID === itemId);
  }
  addWishList(itemId: string){
    this.items.forEach((item: any) => {
      if(item.itemId[0] === itemId){
        const title = item.title[0];
        const price = this.priceTrans(item.sellingStatus[0]);
        const shipping = this.shipCostTrans(item.shippingInfo[0]);
        const zipcode = this.postalCodeTrans(item.postalCode[0]);
        const conditionID = item.condition[0].conditionId[0];
        this.mongoDB.addWishList(itemId, item.galleryURL[0], title, price, shipping, zipcode, conditionID).subscribe((data: any) => {
          this.checkWishList();
        });
      }
    });
  }
  removeWishList(ItemId: string){
    this.mongoDB.removeWishList(ItemId).subscribe((data: any) => {
      this.checkWishList();
    });
  }
  facebookShare(){
    let url = "https://www.facebook.com/sharer/sharer.php?";
    url += "u=" + this.itemDetails.Item.ViewItemURLForNaturalSearch;
    window.open(url, '_blank');
  }
  get pagedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.items.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.items.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  truncateTitle(title: string, maxLength: number): string {
    if (title.length <= maxLength) {return title;}
    const truncated = title.substring(0, title.lastIndexOf(' ', maxLength));
    return truncated + '...';
  }
  priceTrans(status: any): string {
    if(status.currentPrice){
      if(status.currentPrice[0].__value__) {return '$' + status.currentPrice[0].__value__;}
    }
    return 'N/A';
  }
  shipCostTrans(info: any): string {
    if (info.shippingServiceCost[0]){
      if (info.shippingServiceCost[0].__value__ === '0.0') {return 'Free Shipping';}
      else {return '$' + info.shippingServiceCost[0].__value__;}
    } 
    else{return 'N/A'};
  }
  postalCodeTrans(postalCode: string): string {
    if (postalCode === undefined) {return 'N/A';}
    return postalCode;
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
  }
}

