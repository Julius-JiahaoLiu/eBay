import { Component, Input } from '@angular/core';
import { GoogleSearchEngineService } from '../google-search-engine.service';

@Component({
  selector: 'app-photos-tag',
  templateUrl: './photos-tag.component.html',
  styleUrls: ['./photos-tag.component.css']
})
export class PhotosTagComponent {
  @Input() itemTitle: any;
  constructor(private googleSearchEngine: GoogleSearchEngineService) {}
  links: any[] = [];
  ngOnInit(): void {
    this.googleSearchEngine.getGoogleSearchResult(this.itemTitle).subscribe((data: any) => {
      this.links = data.items;
    });
  }
}
