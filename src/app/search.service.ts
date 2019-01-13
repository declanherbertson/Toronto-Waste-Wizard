import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const WASTE_DATA_URL = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(private _http: HttpClient) {
        this._http.get(WASTE_DATA_URL).subscribe(console.log);
    }
}
