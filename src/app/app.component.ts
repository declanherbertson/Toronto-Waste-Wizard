import {Component} from '@angular/core';
import {SearchService} from './search.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    title = 'Waste-Wizard';

    constructor(private _searchService: SearchService) {
    }
}
