import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading: boolean = false;
  title = 'Searchable Multiselect Example';
  
  data :any[] = [];
  sortBy: any[] = [{ value: "firstName", text: "First Name"},{ value: "lastName", text: "Last Name"}];
  ngOnInit() {
   
  

    this.data = [
      {
        text: 'Isidro Jen', value: '487', firstName: 'Isidro', lastName: 'Jen'
      },
      {
        text: 'Florencio Mullin', value: '9080', firstName: 'Florencio', lastName: 'Mullin'
      },
      {
        text: 'Ahmed Taveras', value: '7930', firstName: 'Ahmed', lastName: 'Taveras'
      },
      {
        text: 'Jenni Whiteley', value: '42', firstName: 'Jenni', lastName: 'Whiteley'
      },
      {
        text: 'Rashad Tidd', value: '829', firstName: 'Rashad', lastName: 'Tidd'
      },
      {
        text: 'Katrice Chrisman', value: '692', firstName: 'Katrice', lastName: 'Chrisman'
      },
      {
        text: 'Irving Maugeri', value: '96', firstName: 'Irving', lastName: 'Maugeri'
      },
      {
        text: 'Felisha Cashwell', value: '8', firstName: 'Felisha', lastName: 'Cashwell'
      },
      {
        text: 'Viola Rubalcaba', value: '8298', firstName: 'Viola', lastName: 'Rubalcaba'
      },
      {
        text: 'Reena Harjo', value: '672', firstName: 'Reena', lastName: 'Harjo'
      },
      {
        text: 'Walker Thode', value: '9582', firstName: 'Walker', lastName: 'Thode'
      },
      {
        text: 'Kristy Vanwinkle', value: '19', firstName: 'Kristy', lastName: 'Vanwinkle'
      },
      {
        text: 'Wendell Kiernan', value: '194', firstName: 'Wendell', lastName: 'Kiernan'
      },
      {
        text: 'Gladis Arocho', value: '999', firstName: 'Gladis', lastName: 'Arocho'
      },
      {
        text: 'Vito Trostle', value: '310', firstName: 'Vito', lastName: 'Trostle'
      },
      {
        text: 'Stephaine William', value: '26', firstName: 'Stephaine', lastName: 'William'
      },
      {
        text: 'Ethelene Krishnan', value: '99', firstName: 'Ethelene', lastName: 'Krishnan'
      },
      {
        text: 'Domonique Stjames', value: '820', firstName: 'Domonique', lastName: 'Stjames'
      },
      {
        text: 'Cythia Whipple', value: '82', firstName: 'Cythia', lastName: 'Whipple'
      },
    ];
  }
  selectionChanged(item){
    console.log(item);
  }
}

