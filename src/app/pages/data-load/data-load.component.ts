import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule} from '@angular/forms';
import { actions, profile, successMessage } from '../../services/interface.share';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { DashboardService } from '../../services/dashboard.service';
import { ProfilesService } from '../../services/profiles.service';
import { DataLoadService } from '../../services/data-load.service';
import { NgbdTableCompleteComponent } from '../../components/ngbd-table-complete/ngbd-table-complete.component';

@Component({
  selector: 'app-data-load',
  standalone: true,
  imports:[
    HttpClientModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    AsyncPipe,
    FormsModule,
    NgbdTableCompleteComponent
  ],
  templateUrl: './data-load.component.html',
  styleUrl: './data-load.component.css'
})
export class DataLoadComponent implements OnInit {

  actions =  actions;
  successMessage = successMessage;
  displayData: actions = actions.INITIAL;
  message: string = '';
  listOfDataSource: any = [];
  profilesList: profile[] = [];
  dataSetForm = this.formBuilder.group({
    datasource: [null, Validators.required],
    profile: [null , Validators.required],
    table: [null , Validators.required]
  });
  tablesList: string[] = [];
  tableData: any;

  constructor(
    private formBuilder: FormBuilder,
    public loginService : LoginService,
    private dashboardService: DashboardService,
    private profilesService: ProfilesService,
    private dataLoadService: DataLoadService
  ) {}

  ngOnInit() {
    this.dashboardService.getDatasoureList().subscribe(data => this.listOfDataSource = data);
    this.profilesService.getProfiles().subscribe(data => this.profilesList = data);
  }

  selectedDB(datasource: any) {
    const source = this.getSource(datasource);
    this.dataLoadService.getTables(source.connection).subscribe(data => this.tablesList = data?.tables);
  }

  getSource(datasource: string){
    return this.listOfDataSource.find((d: any) => d.id == datasource);
  }
  
  onSubmit(dataSetForm: any, action: actions) {
    const source = this.getSource(dataSetForm.datasource);
    this.dataLoadService.getTableData(dataSetForm.table, source.connection).subscribe(data => this.tableData = data);
  }

}
