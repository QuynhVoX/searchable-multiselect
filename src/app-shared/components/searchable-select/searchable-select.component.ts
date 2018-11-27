import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { MatAutocompleteTrigger } from '@angular/material';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.scss']
})
export class SearchableSelectComponent implements OnInit {
  @Input()
  inputFormControl: FormControl;

  @Input()
  placeHolder: string;

  @Input()
  data: any[];

  @Input()
  defaultValue: any;

  @Input()
  showValue: boolean;

  @Input()
  showClear: boolean;

  @Input()
  class: string;

  @Input()
  required: boolean;

  @Output()
  optionSelected = new EventEmitter<any[]>();
  searching: boolean = false;
  subscription: any;
  @ViewChild('input', {read: MatAutocompleteTrigger}) autoComplete;
  constructor() {}
  filteredOptions: Observable<any[]>;

  ngOnInit() {
    if (!this.inputFormControl) {
      if (this.required)
        this.inputFormControl = new FormControl('', Validators.required);
      else this.inputFormControl = new FormControl('');
    }
  
    if ( this.data && this.defaultValue) {    
      let item = this.data.filter(x => x.value == this.defaultValue)[0];
      if (!item) {
        this.inputFormControl.setValue(item);
      }     
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngAfterViewInit() {
    this.subscription = this.autoComplete.panelClosingActions
      .subscribe(e => {
        this.searching = false;
      });
  }
  ngOnChanges(changes: SimpleChanges) {   
    if ( this.data && this.defaultValue) {    
      let item = this.data.filter(x => x.value == this.defaultValue)[0];
      if (!item) {
        this.inputFormControl.setValue(item);
      }     
    }   
  }
  displayWith(item?: any): string {
    return item ? item.text : '';
  }
  displayWithValue(item?: any): string {
    return item ? item.value : '';
  }
  filter(val: string): any[] {
    if (!this.data) return this.data;
    if (!val || typeof val === 'object') {
      return this.data;
    } else {
      return this.data.filter(
        option => option.text.toLowerCase().indexOf(val.toLowerCase()) >= 0
      );
    }
  }

  onFocus() {
    this.searching = true;
    this.filteredOptions = this.inputFormControl.valueChanges
      .pipe(
        debounceTime(300),
        startWith(''),
        map(val => this.filter(val))
      );
  }

  itemSelected(input: any): void {
    this.optionSelected.emit(input.option ? input.option.value : input);
    this.searching = false;
  }
  itemChange(input: string): void {
    if (!input) {
      this.inputFormControl.setValue('');
      this.itemSelected('');
    }
  }
  clearValue(event: any) {
    // avoids focusing the input after clicking on the close button
    event.stopPropagation();
    this.inputFormControl.setValue('');
    this.itemSelected('');
  }
}
