import {Component} from '@angular/core';
import {SearchService} from './search.service';
import {WasteCategory, wasteCategoryComparator} from './models/wasteCategory';

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

    public addToFavourites(category: WasteCategory): void {
        if (!this.inFavourites(category)) {
            this.favourites.push(category);
        }
    }

    public removeFromFavourites(category: WasteCategory): void {
        this.favourites = this.favourites.filter((favourite: WasteCategory) => !wasteCategoryComparator(favourite, category));
    }

    public inputKeyEvent(event: any): void {
        const searchVal: string = event.target.value;
        console.log(searchVal);
        // clears search results if search field is cleared
        if (event.key === 'Backspace' && searchVal === '') {
            this.searchResults = [];
        // searches is Enter is pressed
        } else if (event.key === 'Enter') {
            this.searchResults = this._searchService.search(searchVal.toLowerCase());
        }
    }

    private inFavourites(category: WasteCategory): boolean {
        return this.favourites.some((favourite: WasteCategory) => wasteCategoryComparator(favourite, category));
    }
}
