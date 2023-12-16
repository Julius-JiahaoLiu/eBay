import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { PostalcodeAutocompleteService } from '../postalcode-autocomplete.service';
import { EbaySearchResultService } from '../ebay-search-result.service';
import { SearchResultComponent } from '../search-result/search-result.component';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  public searchResults: any;
  public showResult: boolean = false;

  searchForm: FormGroup;
  zipCodeSuggestions: string[] = [];
  keywordError: string = '';
  zipCodeError: string = '';
  constructor(private postalcodeService: PostalcodeAutocompleteService, 
              private formBuilder: FormBuilder,
              private ebaySearchResultService: EbaySearchResultService) {
    this.searchForm = this.formBuilder.group({
      keyword: new FormControl({value:'', disabled:false}, [Validators.required, Validators.pattern(/^(?!\s*$).+/)]), 
      selectedCategory: new FormControl({value:'All', disabled:false}),
      condition: this.formBuilder.group({
        new: [false],
        used: [false],
        unspecified: [false],
      }),
      shippingOptions: this.formBuilder.group({
        localPickup: [false],
        freeShipping: [false],
      }),
      distance: new FormControl(10),
      locationOption: new FormControl('currentLocation'),
      zipCode: new FormControl({value: '', disabled: true}, Validators.pattern('\\d{5}')),
    });
  }
  disableZipCode() {
    const locationOption = this.searchForm.get('locationOption');
    const zipCodeControl = this.searchForm.get('zipCode');
    if (locationOption?.value === 'currentLocation') {
      zipCodeControl?.disable();
    } else {
      zipCodeControl?.enable();
    }
  }
  isSearchBtnDisabled(){
    const keywordControl = this.searchForm.get('keyword');
    const locationOption = this.searchForm.get('locationOption');
    const zipCodeControl = this.searchForm.get('zipCode');
    if(locationOption?.value === 'currentLocation') {
      return keywordControl?.invalid;
    }else{
      return keywordControl?.invalid || zipCodeControl?.invalid || !zipCodeControl?.value;;
    }
  }

  zipCodeAutoComplete(input: string) {
    this.zipCodeSuggestions = this.postalcodeService.getPostalcodeList(input);
  }
  @ViewChild(SearchResultComponent) searchResultComponent!: SearchResultComponent;
  onSubmit() {
    this.showResult = true;
    this.searchResultComponent.showResults();
    const locationOption = this.searchForm.get('locationOption');
    if(locationOption?.value === 'currentLocation') {
      this.ebaySearchResultService.searchOnCurrentLocation(
        this.searchForm.get('keyword')?.value,
        this.searchForm.get('selectedCategory')?.value,
        this.searchForm.get('condition')?.get('new')?.value,
        this.searchForm.get('condition')?.get('used')?.value,
        this.searchForm.get('shippingOptions')?.get('localPickup')?.value,
        this.searchForm.get('shippingOptions')?.get('freeShipping')?.value,
        this.searchForm.get('distance')?.value,
      ).subscribe((response: any) => {
        console.log(response);
        this.searchResults = response;
      });
    } else {
      this.ebaySearchResultService.searchOnPostalcode(
        this.searchForm.get('keyword')?.value,
        this.searchForm.get('selectedCategory')?.value,
        this.searchForm.get('condition')?.get('new')?.value,
        this.searchForm.get('condition')?.get('used')?.value,
        this.searchForm.get('shippingOptions')?.get('localPickup')?.value,
        this.searchForm.get('shippingOptions')?.get('freeShipping')?.value,
        this.searchForm.get('distance')?.value,
        this.searchForm.get('zipCode')?.value,
      ).subscribe((response: any) => {
        console.log(response);
        this.searchResults = response;
      });
    }
  }
  
  clearForm() {
    this.showResult = false;
    this.searchResults = undefined;
    this.searchResultComponent.clearDetails();
    this.searchForm.reset({
      keyword: '',
      selectedCategory: 'All',
      condition: {
        new: false,
        used: false,
        unspecified: false,
      },
      shippingOptions: {
        localPickup: false,
        freeShipping: false,
      },
      distance: 10,
      locationOption: 'currentLocation',
      zipCode: {value: '', disabled: true}
    });
  }
}
