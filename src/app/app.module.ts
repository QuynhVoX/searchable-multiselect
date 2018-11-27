import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule,
    MatSelectModule,
    MatRadioModule,
    
} from '@angular/material';
import { AppComponent } from './app.component';
import { SearchableSelectComponent } from '../app-shared/components/searchable-select/searchable-select.component';
import { SearchableMultiSelectComponent } from '../app-shared/components/searchable-multiSelect/searchable-multiSelect.component';
import { UtilService } from '../app-shared/services/util.service';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule,
    MatSelectModule,
    MatRadioModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    AppComponent,
    SearchableSelectComponent,
    SearchableMultiSelectComponent,
  ],
  providers: [UtilService],
  exports: [
    SearchableSelectComponent,
    SearchableMultiSelectComponent,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
