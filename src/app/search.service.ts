import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WasteItem} from './models/wasteItem';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

// Search Implementation should be handled by server -- done here since this is single page coding challenge
const WASTE_DATA_URL = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(private _http: HttpClient) {
    }
    // returns an Observable of an Array of WasteItems that each items keywords contains the supplied keyword
    public search(keyword: string): Observable<WasteItem[]> {
        return this.fetchItems().pipe(map((items: WasteItem[]) => {
            console.log(items);
            return this.filterByKeyWord(keyword, items);
        }));
    }
    private fetchItems(): Observable<WasteItem[]> {
        return this._http.get<WasteItem[]>(WASTE_DATA_URL);
    }
    private filterByKeyWord(keyword: string, allItems: WasteItem[]): WasteItem[] {
        return allItems.filter((item: WasteItem) => {
           const itemKeywords: Array<string> = item.keywords.split(', ');
           // return true if either the keyword matches the supplied word, or the keyword contains the supplied word
           return itemKeywords.some(itemKey => itemKey === keyword || itemKey.includes(keyword));
        });
    }
}
