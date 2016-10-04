import { Component, AfterViewInit, ElementRef, Input } from '@angular/core';
import { MasterData} from '../../model/common.model';
import {MastersService } from '../../services/masters.service';

@Component({
    moduleId: module.id,
    selector: 'multiselect-dropdown',
    templateUrl: 'dropdownMultiSelect.component.html',
//    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['dropdownMultiSelect.component.css'],
    providers: [MastersService]
})

export class DropdownMultiSelectComponent implements AfterViewInit {
    @Input() placeholder: string = ''; //Place holder
    @Input() dataToBind: MasterData[] = []; //Data to bind to dropdown
    @Input() selected: MasterData[] = [];  //List of selected value
    @Input() isAddButtonVisible: boolean = false;  //Set visibility of Add button
    @Input() isReadOnly: boolean = false;
    public query = '';

    public filteredList: any[] = [];
    public elementRef: any;
    // public selected: any[] = [];
    public dropDownValue: number = 0;
    public isAddButtunDisable: boolean = true;
    public errorMessage: string = '';

    constructor(myElement: ElementRef,
        private _mastersService: MastersService) {
        this.elementRef = myElement;
    }

    ngAfterViewInit() {
        //
    }

    filter() {
        if (this.query !== '') {
            this.filteredList = this.dataToBind.filter(function(el: any) {
                return el.Value.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));

            if (this.filteredList.length > 0) {
                this.isAddButtunDisable = true;
            } else {
                this.isAddButtunDisable = false;
            }
        } else {
            this.filteredList = [];
            this.isAddButtunDisable = true;
        }
    }

    select(item: MasterData) {
        var isPresent: boolean = false;
        for (var index = 0; index < this.selected.length; index++) {
            if (+this.selected[index].Id === +item.Id) {
                isPresent = true;
            }
        }

        if (!isPresent) {
            this.selected.push(item);
        }
        this.query = '';
        this.filteredList = [];
    }

    handleClick(event: any) {
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.filteredList = [];
        }
    }

    remove(item: any) {
        this.selected.splice(this.selected.indexOf(item), 1);
    }


    AddValue() {
        this._mastersService.addSkillToMaster(this.query)
            .subscribe(
            results => {
                this.selected.push(<MasterData>results);
                this.dataToBind.push(<MasterData>results);
                this.query = '';
                this.filteredList = [];
                this.isAddButtunDisable = true;
            },
            error => this.errorMessage = <any>error);
        this.isAddButtunDisable = true;
    }

}
