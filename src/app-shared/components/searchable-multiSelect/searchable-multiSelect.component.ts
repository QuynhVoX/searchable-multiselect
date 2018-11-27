import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { MatAutocompleteTrigger,  MatSelectionList } from '@angular/material';
import { UtilService } from '../../services/util.service';
import { SelectionModel } from '@angular/cdk/collections';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'searchable-multiSelect',
  templateUrl: './searchable-multiSelect.component.html',
  styleUrls: ['./searchable-multiSelect.component.scss'],
  //encapsulation: ViewEncapsulation.None,
})
export class SearchableMultiSelectComponent implements OnInit {
  @Input()
  inputFormControl: FormControl;

  @Input()
  placeHolder: string;

  @Input()
  displayMax: number;

  @Input()
  data: any[];

  @Input()
  sortBy: any[];
  @Input()
  defaultSelectAll: boolean = false;
  @Input()
  showValue: boolean;

  @Input()
  showClear: boolean;

  @Input()
  class: string;

  @Input()
  required: boolean;

  @Input()
  extended: boolean;

  @Output()
  optionSelected = new EventEmitter<any[]>();

  constructor(private util: UtilService ) {}
  formControl : FormControl =  new FormControl('');
  filteredOptions: Observable<any[]>;
  //selectedOptions:  any[] = [];
  selection = new SelectionModel<string>(true, []);
  subscription: any;
  
  searching: boolean = false;
  selectedLabel: any;
  dataLength: number;
  @ViewChild('input', {read: MatAutocompleteTrigger}) autoComplete;
  @ViewChild('selectionList') selectionList: MatSelectionList;
  @ViewChild('input') input: ElementRef;
  ngOnInit() {
    //if there is no input control create a one
    if (!this.inputFormControl) {
      if (this.required)
        this.inputFormControl = new FormControl('', Validators.required);
      else this.inputFormControl = new FormControl('');
    }
    //use another form control so it doesn't interfere with the mat-auto-complete's input 
    this.filteredOptions = this.formControl.valueChanges
      
      .pipe(
        debounceTime(300),
        startWith(''),
        map(val => this.filter(val))
      );
  }
  ngOnChanges(changes: SimpleChanges) {
   
    for (let propName in changes) {
      //only if the data changed for now
      if (propName === "data") {
        this.formControl.setValue('');
        
        if (this.defaultSelectAll) {          
          this.toggleSelectAll(true);
        }
        else {
          this.selection.clear();
          if (this.inputFormControl.value.length && this.data) {
            //check if the pre-selected options are in the input data array  
            this.inputFormControl.value.forEach(x => {
              let option  = this.data.filter(item => item.value == x);
              if (option.length) this.selection.select(x);
            });
           
          }
        }  
        if (this.selection.selected.length) {
          //setTimeout to prevent overrideen by the Displaywith function
          setTimeout(() => {
            this.setDisplaySelectedText();
            //place any value here for the mat placeholder to work
            this.input.nativeElement.value = 'Search here...';
          });
        }
      }
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngAfterViewInit() {
    this.subscription = this.autoComplete.panelClosingActions
      .subscribe(e => {
        this.formControl.setValue('');
        this.searching = false;
        this.inputFormControl.setValue(this.selection.selected)
        setTimeout(() => {
          this.setDisplaySelectedText();
          //place any value here for the mat placeholder to work
          if (this.selection.selected.length)
            this.input.nativeElement.value = 'Search here...';
          else this.input.nativeElement.value = '';
          this.optionSelected.emit(this.selection.selected);
        });

      });
  }                        
  filter(val: string): any[] {
    if (!this.data) return [];
    if (!val || typeof val === 'object') return this.data;
    return this.data.filter(
      option => option.text.toLowerCase().indexOf(val.toLowerCase()) >= 0
    );
  }
  itemSelected(event: any): void {
    let option = event.option.value.value;
    if (this.selection.isSelected(option)) {
      this.selection.deselect(option) ;
    } else {
      this.selection.select(option) ;
    }
    //this.updateControlValue(event.option.value.value);
    //keep the pannel open
    setTimeout(() => {
     this.autoComplete.openPanel();
     this.setDisplaySelectedText();
    });   
  }
  
  toggleSelectAll(select: boolean) {
    
    if (!this.data) return;
    if (!select) {
      this.selection.clear();
    } else {
      this.data.forEach(x => this.selection.select(x.value));
    }
    setTimeout(() => {
      this.setDisplaySelectedText();
    });
  }
  searchChange(input: string): void {
    //use another form control so it doesn't interfere with the mat-auto-complete's input 
    this.formControl.setValue(input);
  }
  displayWith(item?: any): string {
    return '';
  }
  toggleSearch(){ 
    this.input.nativeElement.value = '';
    this.searching = true; 
  }
  //manage the display label of the control
  setDisplaySelectedText() {
    if (!this.selection.selected.length) {
      this.selectedLabel = '';
      return;
    }
    if (this.selection.selected.length == this.data.length) {
      this.selectedLabel = 'All Selected';
      return;
    }
    if (!this.displayMax) this.displayMax = 1;
    if (this.selection.selected.length > this.displayMax) {
      this.selectedLabel = this.selection.selected.length + ' Selected';
      return;
    }
    let text = '';

    this.selection.selected.forEach((x) => {
      let option = this.data.filter(o => o.value == x)[0];
      if (option)
        text += option.text + ", ";
    });
    this.selectedLabel = text.slice(0, -2);

  }
  sortList(sortBy:string): any{
    this.data.sort(
      this.util.dynamicSort(sortBy,1 )
    );
    this.formControl.setValue('');
  }
}
