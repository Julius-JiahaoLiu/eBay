import { Component, Input, SimpleChanges } from '@angular/core';
import { MongoDBService } from '../mongo-db.service';
import { WishlistSearchDetailsService } from '../wishlist-search-details.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent {
  @Input() isFavoritesChosen: boolean = true;
  wishListItems: any[] = [];
  itemResults: any;
  itemDetails: any;
  hasDetails: boolean = false;
  showDetails: boolean = false;
  hasRecords: boolean = false;
  loading: boolean = false;

  constructor(private mongoDB: MongoDBService,
              private wishlistSearch: WishlistSearchDetailsService) { }
  ngOnChanges(changes: SimpleChanges) {
    if ((changes['isFavoritesChosen'] && changes['isFavoritesChosen'].currentValue)){
      this.getWishListItems();
      if(this.wishlistSearch.itemDetails){
        this.itemResults = this.wishlistSearch.itemResults;
        this.itemDetails = this.wishlistSearch.itemDetails;
        this.hasDetails = true;
      }
    }
  }
  getWishListItems(){
    this.mongoDB.getAllWishListItems().subscribe((data: any) => {
      this.wishListItems = data;
      if(data.length > 0){
        this.hasRecords = true;
      }else{
        this.hasRecords = false;
      }
      console.log(this.wishListItems);
    });
  }
  inWishList(itemId: string){
    for(let i = 0; i < this.wishListItems.length; i++){
      if(this.wishListItems[i].ItemID === itemId){
        return true;
      }
    }
    return false;
  }
  backupOneItem: any;
  removeWishList(ItemId: string){
    this.mongoDB.getOneItem(ItemId).subscribe((data: any) => {
      this.backupOneItem = data[0];
    });
    this.mongoDB.removeWishList(ItemId).subscribe((data: any) => {});
    this.getWishListItems();
  }
  addWishList(){
    this.mongoDB.addWishList(this.backupOneItem.ItemID, this.backupOneItem.Image, this.backupOneItem.Title, this.backupOneItem.Price, this.backupOneItem.Shipping, this.backupOneItem.Zipcode, this.backupOneItem.ConditionID).subscribe((data: any) => {
      this.getWishListItems();
    });
  }
  sumitems(){
    let sum = 0;
    for(let i = 0; i < this.wishListItems.length; i++){
      var priceString = this.wishListItems[i].Price.replace('$', '');
      sum += parseFloat(priceString);
    }
    const formattedTotalPrice = sum.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  });
    return formattedTotalPrice;
  }
  truncateTitle(title: string, maxLength: number): string {
    if (title.length <= maxLength) {return title;}
    const truncated = title.substring(0, title.lastIndexOf(' ', maxLength));
    return truncated + '...';
  }
  toPreDetails(){
    this.showDetails = true;
  }
  showResults(){
    this.showDetails = false;
    this.getWishListItems();
  }
  searchDetails(itemId: string){
    this.showDetails = true;
    this.loading = true;
    this.loadingResults();
    this.wishlistSearch.searchDetails(itemId).subscribe((results: any) => {
      this.itemResults = results.itemResults;
      this.itemDetails = results.itemDetails;
      this.hasDetails = true;
    });
  }
  loadingResults() {
    setTimeout(() => {this.loading = false;}, 1000);
  }
  // clearDetails(){
  //   this.hasRecords = false;
  //   this.itemResults = undefined;
  //   this.itemDetails = undefined;
  //   this.hasDetails = false;
  //   this.showDetails = false;
  // }
  facebookShare(){
    let url = "https://www.facebook.com/sharer/sharer.php?";
    url += "u=" + this.itemDetails.Item.ViewItemURLForNaturalSearch;
    window.open(url, '_blank');
  }
}
