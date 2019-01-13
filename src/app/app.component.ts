import {Component} from '@angular/core';
import {SearchService} from './search.service';
import {WasteCategory} from './models/wasteCategory';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    public searchResults: WasteCategory[] = [];
    public favourites: WasteCategory[] = [];
    constructor(private _searchService: SearchService) {
    }

    public searchItems(keyword: string): void {
        this.searchResults = this._searchService.search(keyword.toLowerCase());
        console.log(this.searchResults);
    }
}
