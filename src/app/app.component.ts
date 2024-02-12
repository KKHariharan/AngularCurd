import { Component, OnInit } from '@angular/core';
import { ListServices } from './services/list.services';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // modelType ='Add';
  title = 'task_2';
  GetId:string ='';
  formData: any = {
    name: '',
    age: '',
    desigination: '',
    manager_id: '',
  };
  ListEmployee: any = [];
  MangerList: any = [];
  deleteId!: string
  edit_id: any
  constructor(private services: ListServices) { this.GetId='';}

  ngOnInit(): void {
    this.ListApi();
    this.ManagerList()
    
  }
  AddButton(event: Event){
    // const actionType = (event.target as HTMLButtonElement).getAttribute('data-action-type');
    // this.GetId = actionType??'';
  //  this.formData = {
  //     name: '',
  //     age: '',
  //     desigination: '',
  //     manager_id: '',
  //   };
  this.formData();
  }
  FormSubmit(form: any) {
    if(this.GetId == 'Add'){
    if (this.formData.desigination == 'Employee') {
      this.services.AddEmployee(this.formData).subscribe(result => {
        console.log('formData result AddManager', result);
        this.ListApi();
      })
    } else {
      this.services.AddManager(this.formData).subscribe(result => {
        console.log('formData result AddManager', result);
        this.ListApi();
      })
    }
  }
    if(this.GetId == 'Edit'){
      this.services.EditList(this.formData).subscribe(result => {
        console.log('edit formData ', result);
        this.ListApi();
      })
    }

  }
  ListApi() {
    this.services.ListApi().subscribe((parmeter: any) => {
      console.log('LIst Api', parmeter)
      this.ListEmployee = parmeter.data;
    })
  }
  ManagerList() {
    this.services.ManagerList().subscribe((parmeter: any) => {
      console.log('manager LIst Api', parmeter)
      this.MangerList = parmeter.data;
    })
  }
  DeleteApi(id: any) {
    this.services.DeltByid(id).subscribe((result: any) => {
      console.log('formData result AddManager', id);
      this.ListApi();

    })
  }
EditById(event: Event,id:any): void {
  const actionType = (event.target as HTMLButtonElement).getAttribute('data-action-type');
  this.GetId = actionType??'';
  // binding id
  this.services.ViewList(id).subscribe((apiResponse: any) => {
    if (apiResponse && apiResponse.data) {
      this.formData.id = apiResponse.data._id ? apiResponse.data._id : 'not available';
      this.formData.name = apiResponse.data.name ;
      this.formData.age = apiResponse.data.age ? apiResponse.data.age : 'not available';
      this.formData.desigination = apiResponse.data.desigination;
      this.formData.manager_id = apiResponse.data.manager_id? apiResponse.data.manager_id._id:'dhy';
      console.log('viewManager', apiResponse);
    }
  });
}

}
