import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { actions, successMessage } from '../../services/interface.share';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  listOfDataSource: any = [];
  listDatabases: any = [];
  actions =  actions;
  dataSourceForm: FormGroup;
  displayAddDataSource: string = actions.INITIAL;
  
  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    public loginService : LoginService,
  ){
    this.dataSourceForm = this.formBuilder.group({
      DataTypeID: '',
      database_type: ['', Validators.required],
      Host: ['', Validators.required],
      Port: ['', Validators.required],
      Database: ['', Validators.required],
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.dashboardService.getDatabases().subscribe(data => this.listDatabases = data);
    this.dashboardService.getDatasoureList().subscribe(data => this.listOfDataSource = data);
  }

  backToDatabaseSource(){
    this.displayAddDataSource = actions.INITIAL;
  }

  showAddDataSource(database: any) {
    this.displayAddDataSource = actions.ADD;
    this.dataSourceForm.reset();
    this.dataSourceForm.controls['database_type'].setValue(database.DataTypeName);
  }

  onSubmit(dataSourceForm: any, action: actions) {
    if(action === actions.UPDATE) {
      this.dashboardService.editDatasourceParameter(
        dataSourceForm?.DataTypeID,
        { database_type: dataSourceForm?.database_type, connection: {
          Database: dataSourceForm?.Database,
          Host: dataSourceForm?.Host,
          Password: dataSourceForm?.Password,
          Port: dataSourceForm?.Port,
          Username: dataSourceForm?.Username
        }})
        .subscribe(data => {
          console.log(data);
        if(data?.message.toLowerCase() === successMessage.DATASOURCE_UPDATED) {
          this.loginService.message.next(data?.message);
          let index = this.listOfDataSource.findIndex((x: any) => x.id == dataSourceForm.DataTypeID); 
          this.listOfDataSource[index].id = dataSourceForm?.DataTypeID;
          this.listOfDataSource[index].database_type = dataSourceForm?.database_type;
          this.listOfDataSource[index].connection = { 
            Database: dataSourceForm?.Database,
            Host: dataSourceForm?.Host,
            Password: dataSourceForm?.Password,
            Port: dataSourceForm?.Port,
            Username: dataSourceForm?.Username
          };
          this.loginService.resetMessage();
        }
       });
    } else {
      this.dashboardService.createDataSource({ database_type: dataSourceForm?.database_type, connection: {
        Database: dataSourceForm?.Database,
        Host: dataSourceForm?.Host,
        Password: dataSourceForm?.Password,
        Port: dataSourceForm?.Port,
        Username: dataSourceForm?.Username
      }})
      .subscribe(data => {
        if(data?.message.toLowerCase() === successMessage.DATASOURCE_ADDED) {
          this.loginService.message.next(data?.message);
          this.listOfDataSource.push({
            database_type: dataSourceForm?.database_type,
            connection: {
              Database: dataSourceForm?.Database,
              Host: dataSourceForm?.Host,
              Password: dataSourceForm?.Password,
              Port: dataSourceForm?.Port,
              Username: dataSourceForm?.Username,
            }
          });
          this.loginService.resetMessage();
        }
      });
    }
    this.displayAddDataSource = actions.INITIAL;
  }

  updateDataSource(dataSourceForm: any) {
    this.displayAddDataSource = actions.UPDATE;
    this.dataSourceForm.patchValue({
      DataTypeID: dataSourceForm?.id,
      database_type: dataSourceForm?.database_type,
      Database: dataSourceForm?.connection?.Database,
      Host: dataSourceForm?.connection?.Host,
      Password: dataSourceForm?.connection?.Password,
      Port: dataSourceForm?.connection?.Port,
      Username: dataSourceForm?.connection?.Username
    });
  }

  deleteDataSource(id: any){
    this.dashboardService.deleteDatasourceParameter(id).subscribe(data => {
      if(data?.message.toLowerCase() === successMessage.DATASOURCE_DELETED){
        this.loginService.message.next(data?.message);
        let newUsersList = this.listOfDataSource.filter((dataSource: any) => dataSource?.id !== id);
        this.listOfDataSource = newUsersList;
        this.loginService.resetMessage();
        }
    });
  }

}
