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

    private inFavourites(category: WasteCategory): boolean {
        // todo check if body is unique -- make better check
        return this.favourites.some((favourite: WasteCategory) => wasteCategoryComparator(favourite, category));
    }
}
