import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';
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
  styleUrls: ['./members-attendance.component.scss'],
  templateUrl: './members-attendance.component.html',
})

export class MembersAttendanceComponent implements AfterViewInit{
  totalMemebrs = 0;

  selectedDate = moment(new Date()).format('YYYY-MM-DD');
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

    this.settings = {
        actions: false,
        noDataMessage: this.translate.instant('Nodatafound'),
        pager:{
            perPage: 20
        },
        columns: {
            member_id: {
                title: this.translate.instant('MembersAttendancePage.id'),
                type: 'number',
            },
            name: {
                title: this.translate.instant('MembersAttendancePage.name'),
                type: 'string',
            },
            phone: {
                title: this.translate.instant('MembersAttendancePage.phone'),
                type: 'string',
            },
            attended: {
                title: this.translate.instant('MembersAttendancePage.attended'),
                type: 'custom',
                filter: false,
                renderComponent: CustomCheckboxComponent,
                onComponentInitFunction(instance) {
                    instance.save.subscribe(row => {
                        parent.changeMemberAttendedStatus(row);
                    });
                }
            },
        },
    };

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        let parent = this;
        this.settings = {
            actions: false,
            noDataMessage: this.translate.instant('Nodatafound'),
            pager:{
                perPage: 20
            },
            columns: {
                member_id: {
                    title: this.translate.instant('MembersAttendancePage.id'),
                    type: 'number',
                },
                name: {
                    title: this.translate.instant('MembersAttendancePage.name'),
                    type: 'string',
                },
                phone: {
                    title: this.translate.instant('MembersAttendancePage.phone'),
                    type: 'string',
                },
                attended: {
                    title: this.translate.instant('MembersAttendancePage.attended'),
                    type: 'custom',
                    filter: false,
                    renderComponent: CustomCheckboxComponent,
                    onComponentInitFunction(instance) {
                        instance.save.subscribe(row => {
                            parent.changeMemberAttendedStatus(row);
                        });
                    }
                },
            },
        };

      this.totalMemebrs = this.source.count();
    });

    this.source = new CustomServerDataSource(httpClient, {
      endPoint: 'members_attandance/members_attendece_by_date.php?date=' + this.selectedDate + '&',
    }, appHttpService);


    this.source.onChanged().subscribe(()=>{
      this.totalMemebrs = this.source.count();

    });

  }

  dateChange(event){
    Pace.restart();
    this.selectedDate = moment(event).format('YYYY-MM-DD');
      this.source = new CustomServerDataSource(this._httpClient, {
          endPoint: 'members_attandance/members_attendece_by_date.php?date=' + this.selectedDate + '&',
      }, this._appHttpService);
  }

  changeMemberAttendedStatus(row){
    Pace.restart();
    this.memebersService.changeMemberAttendedStatus(this.selectedDate, row.member_id).subscribe((data)=>{
        console.log(data);
    });
  }



    ngAfterViewInit(){
    setTimeout(()=>{
      this.totalMemebrs = this.source.count();
    },500);
  }

}
