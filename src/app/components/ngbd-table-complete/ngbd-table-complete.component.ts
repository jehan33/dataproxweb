import { AsyncPipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from '../../services/utils.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SortColumn, SortDirection } from '../../services/interface.share';

@Component({
  selector: 'app-ngbd-table-complete',
  standalone: true,
  imports:[
    HttpClientModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    NgClass,
    AsyncPipe,
    FormsModule,
    NgbPaginationModule,
    NgbHighlight,
  ],
  templateUrl: './ngbd-table-complete.component.html',
  styleUrl: './ngbd-table-complete.component.css',
  providers: [UtilsService, DecimalPipe]
})
export class NgbdTableCompleteComponent implements OnInit {
  tabledata$: Observable<any[]>;
  total$: Observable<number>;
  tableHeaders: string[] = [];
  direction: boolean = true;

  @Input() tableDataList: any;
  @ViewChild('headers', { read: ElementRef, static: false })
  headers!: ElementRef;

  constructor(public service: UtilsService) {
    this.tabledata$ = service.tablesdata$;
    this.total$ = service.total$;
    
  }

  ngOnInit() {
    this.tableHeaders = Object.keys(this.tableDataList[0]);
  }

  resetSearch(form: any){
    form.form.patchValue({
        "searchTerm": '',
        "pageSize": this.service.pageSize
    })
  }
  
  onSort(column: string, direction: boolean) {
    // resetting other headers
    let headersList = document.querySelectorAll('#heading_area th');
    let currentHead = document.querySelector(`#${column}`);
    headersList.forEach((h: any) => {
        h.classList.remove("asc");
        h.classList.remove("desc");
    });
    if(currentHead){
      currentHead.classList.add(direction ? 'asc' : 'desc');
    }
    this.service.sortColumn = column as SortColumn;
    this.service.sortDirection = direction ? 'asc' : 'desc';
  }

}
