import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WasteCategory} from './models/wasteCategory';
import {Observable} from 'rxjs';

// Normally these processes would be handled by a server, and the search queries would be made by api calls.
// Using a server would allow more scalability if the json became larger, and reduces the amount of data and computation
// done on the client. The reason this logic is here is that the specific data set is relatively small (less than 200 entries)
// and so this project can be easily hosted on github pages. All the logic can be easily moved to a node server, and one of the only
// changes to be made would be to fetch the JSON every 24 hours as it is updated every day
const WASTE_DATA_URL = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    public allWasteCategories: WasteCategory[];

    constructor(private _http: HttpClient) {
        this.fetchItems().subscribe((items: WasteCategory[]) => {
            this.allWasteCategories = items.map(item => {
                item.favourite = false;
                return item;
            });
            console.log(this.allWasteCategories);
        });
    }

    // returns an Observable of an Array of WasteItems that each items keywords contains the supplied keyword
    public search(keyword: string): WasteCategory[] {
        return this.filterByKeyWord(keyword, this.allWasteCategories);
    }

    private fetchItems(): Observable<WasteCategory[]> {
        return this._http.get<WasteCategory[]>(WASTE_DATA_URL);
    }

    private filterByKeyWord(keyword: string, allItems: WasteCategory[]): WasteCategory[] {
        return allItems.filter((item: WasteCategory) => {
            const itemKeywords: Array<string> = item.keywords.split(', ');
            // return true if either the keyword matches the supplied word, or the keyword contains the supplied word
            // todo investigate if should only accept exact matches
            return itemKeywords.some(itemKey => itemKey === keyword || itemKey.includes(keyword));
        });
    }
}
