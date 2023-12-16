import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';

import { PostalcodeAutocompleteService } from './postalcode-autocomplete.service';
import { GetLocationService } from './get-location.service';
import { EbaySearchResultService } from './ebay-search-result.service';
import { EbaySearchDetailsService } from './ebay-search-details.service';
import { GoogleSearchEngineService } from './google-search-engine.service';
import { EbaySimilarItemsService } from './ebay-similar-items.service';
import { MongoDBService } from './mongo-db.service';
import { WishlistSearchDetailsService } from './wishlist-search-details.service';
import { SearchResultComponent } from './search-result/search-result.component';
import { NgbModule, NgbNavModule, NgbAlertModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchDetailComponent } from './search-detail/search-detail.component';
import { ProductTagComponent } from './product-tag/product-tag.component';
import { PhotosTagComponent } from './photos-tag/photos-tag.component';
import { ShippingTagComponent } from './shipping-tag/shipping-tag.component';
import { SellerTagComponent } from './seller-tag/seller-tag.component';
import { SimilarTagComponent } from './similar-tag/similar-tag.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { WishListDetailComponent } from './wish-list-detail/wish-list-detail.component';
import { ProductTagImageModalComponent } from './product-tag-image-modal/product-tag-image-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    SearchResultComponent,
    SearchDetailComponent,
    ProductTagComponent,
    PhotosTagComponent,
    ShippingTagComponent,
    SellerTagComponent,
    SimilarTagComponent,
    WishListComponent,
    WishListDetailComponent,
    ProductTagImageModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    NgbModule,
    NgbNavModule,
    NgbAlertModule ,
    NgbDropdownModule,
    RoundProgressModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    PostalcodeAutocompleteService, 
    GetLocationService,
    EbaySearchResultService,
    EbaySearchDetailsService,
    GoogleSearchEngineService,
    EbaySimilarItemsService,
    MongoDBService,
    WishlistSearchDetailsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
