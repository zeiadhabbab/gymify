import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServerDataSource} from 'ng2-smart-table';
import { HttpHeaders} from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
import { CustomServerDataSource } from "../../../@core/utils/serve.data-source";
import { AppHttpService } from "../../../@core/utils/http.service";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import * as moment from 'moment';
import { MemebersService } from "../../../@core/utils/members.service";
declare var Pace:any;

@Component({
  selector: 'ngx-members-attendance-component',
  styleUrls: ['./members-attendance-report.component.scss'],
  templateUrl: './members-attendance-report.component.html',
})

export class MembersAttendanceReportComponent implements AfterViewInit{
  totalMemebrs = 0;

  selectedFromDate = moment(new Date()).format('YYYY-MM-DD');
  selectedToDate = moment(new Date()).format('YYYY-MM-DD');
  today = moment(new Date()).format('YYYY-MM-DD');
  settings;



  source: ServerDataSource;
  token: string;
  headers;
  _httpClient;
  _appHttpService;

  constructor(private httpClient: HttpClient, private authService: NbAuthService,
              private appHttpService: AppHttpService, private translate: TranslateService,
              private memebersService: MemebersService){
    this.token = '';
    this._httpClient = httpClient;
    this._appHttpService = appHttpService;
    let parent = this;
    this.authService.onTokenChange()
        .subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
        this.token = token.getValue(); // here we receive a payload from the token and assigns it to our `user` variable
        this.headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        });
      }
    });

    this.setTableSettings();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {

      this.setTableSettings();
      this.totalMemebrs = this.source.count();
    });

    this.source = new CustomServerDataSource(httpClient, {
        endPoint: 'punch_time/report.php?fromDate=' + this.selectedFromDate + '&toDate=' + this.selectedToDate + '&'
    }, appHttpService);


    this.source.onChanged().subscribe(()=>{
      this.totalMemebrs = this.source.count();

    });

  }

  setTableSettings(){
      this.settings = {
          actions: false,
          noDataMessage: this.translate.instant('Nodatafound'),
          pager:{
              perPage: 20
          },
          columns: {
              member_id: {
                  title: this.translate.instant('MembersAttendanceReportPage.id'),
                  type: 'number',
              },
              name: {
                  title: this.translate.instant('MembersAttendanceReportPage.name'),
                  type: 'string',
              },
              phone: {
                  title: this.translate.instant('MembersAttendanceReportPage.phone'),
                  type: 'string',
              },
              date: {
                  title: this.translate.instant('MembersAttendanceReportPage.phone'),
                  type: 'string',
              },
              punch_time: {
                  title: this.translate.instant('MembersAttendanceReportPage.phone'),
                  type: 'string',
                  valuePrepareFunction: ((cell, row)=> {
                      return  moment( row.date + ' ' + cell ).format('hh:mm A');
                  }),

              }
          },
      };
  }

  dateChange(from, to){
    Pace.restart();
    this.selectedFromDate = moment(from).format('YYYY-MM-DD');
    this.selectedToDate = moment(to).format('YYYY-MM-DD');
      this.source = new CustomServerDataSource(this._httpClient, {
          endPoint: 'punch_time/report.php?fromDate=' + this.selectedFromDate + '&toDate=' + this.selectedToDate + '&'
      }, this._appHttpService);
  }


  ngAfterViewInit(){
    setTimeout(()=>{
      this.totalMemebrs = this.source.count();
    },500);
  }

}
