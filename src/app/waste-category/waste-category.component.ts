import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WasteCategory} from '../models/wasteCategory';

@Component({
    selector: 'app-waste-category',
    templateUrl: './waste-category.component.html',
    styleUrls: ['./waste-category.component.less']
})
export class WasteCategoryComponent implements OnInit {
    public description: any;
    @Input() public wasteCategory: WasteCategory;
    @Output() public addToFavourites: EventEmitter<WasteCategory> = new EventEmitter<WasteCategory>();
    @Output() public removeFromFavourites: EventEmitter<WasteCategory> = new EventEmitter<WasteCategory>();

    public ngOnInit(): void {
        // converts HTML as text form into HTML Element that can be rendered
        // todo sanitize for scripts
        this.description = new DOMParser().parseFromString(this.wasteCategory.body, 'text/html').documentElement.textContent;
    }
    public toggleFavourite(): void {
        this.wasteCategory.favourite = !this.wasteCategory.favourite;
        if (this.wasteCategory.favourite) {
            this.addToFavourites.emit(this.wasteCategory);
        } else {
            this.removeFromFavourites.emit(this.wasteCategory);
        }
    }
}
