import {Component, OnInit, AfterViewInit, TemplateRef, ViewChild} from '@angular/core';
import { ServerDataSource} from 'ng2-smart-table';
import { HttpHeaders} from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
import { CustomServerDataSource } from "../../../@core/utils/serve.data-source";
import { AppHttpService } from "../../../@core/utils/http.service";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import * as moment from 'moment';
import { MemebersService } from "../../../@core/utils/members.service";
import {NbDialogService} from "@nebular/theme";
import {CustomCheckboxADComponent} from "../../../@theme/components/custom-checkbox/custom-checkbox-ad.component";
declare var Pace:any;

@Component({
  selector: 'ngx-all-all-members-component',
  styleUrls: ['./all-members.component.scss'],
  templateUrl: './all-members.component.html',
})

export class AllMembersComponent implements AfterViewInit{

  totalMemebrs = 0;
  @ViewChild('editDialog', { static: true }) editDialog: TemplateRef<any>;
  @ViewChild('deleteDialog', { static: true }) deleteDialog: TemplateRef<any>;

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
              private memebersService: MemebersService, private dialogService: NbDialogService){
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


    this.fillTableSetting(this);

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        let parent = this;
        this.fillTableSetting(parent);

      this.totalMemebrs = this.source.count();
    });

    this.source = new CustomServerDataSource(httpClient, {
      endPoint: 'members/read.php?date=' + this.selectedDate + '&',
    }, appHttpService);


    this.source.onChanged().subscribe(()=>{
      this.totalMemebrs = this.source.count();

    });

  }

  fillTableSetting(parent){
      this.settings = {
          mode: 'external',
          actions:{
            columnTitle: "",
          },
          edit: {
              editButtonContent: '<i class="nb-edit"></i>',
              saveButtonContent: '<i class="nb-checkmark"></i>',
              cancelButtonContent: '<i class="nb-close"></i>',
          },
          delete: {
              deleteButtonContent: '<i class="nb-trash"></i>',
              confirmDelete: true,
          },
          noDataMessage: this.translate.instant('Nodatafound'),
          pager:{
              perPage: 20
          },
          columns: {
              member_id: {
                  title: this.translate.instant('Members.id'),
                  type: 'number',
              },
              name: {
                  title: this.translate.instant('Members.name'),
                  type: 'string',
              },
              phone: {
                  title: this.translate.instant('Members.phone'),
                  type: 'string',
              },
              gender: {
                  title: this.translate.instant('Members.gender'),
                  type: 'string',
                  filter: {
                      type: 'list',
                      config: {
                          selectText: this.translate.instant('Select'),
                          list: [
                              {value: 'ذكر', title:this.translate.instant('Male')},
                              {value: 'انثى', title:this.translate.instant('Female')},
                          ],
                      },
                  },
                  valuePrepareFunction: ((cell, row)=> {
                      if(cell == 'ذكر'){
                          return this.translate.instant('Male');
                      }else{
                          return this.translate.instant('Female');
                      }
                  }),

              },
              age: {
                  title: this.translate.instant('Members.age'),
                  type: 'string',
              },
              emplyee: {
                  title: this.translate.instant('Members.employee'),
                  type: 'string',
              },
              session_id: {
                  title: this.translate.instant('Members.session_id'),
                  type: 'string',
                  filter: {
                      type: 'list',
                      config: {
                          selectText: this.translate.instant('Select'),
                          list: [
                              {value: '8', title:this.translate.instant('Evening')},
                              {value: '6', title:this.translate.instant('Morning')},
                          ],
                      },
                  },
                  valuePrepareFunction: ((cell, row)=> {
                      if(cell == '8'){
                          return this.translate.instant('Evening');
                      }else{
                          return this.translate.instant('Morning');
                      }
                  }),

              },
              account_type: {
                  title: this.translate.instant('Members.account_type'),
                  type: 'string',
                  filter: {
                      type: 'list',
                      config: {
                          selectText: this.translate.instant('Select'),
                          list: [
                              {value: 'جزئي', title:this.translate.instant('Partial')},
                              {value: 'كامل', title:this.translate.instant('Full')},
                          ],
                      },
                  },
                  valuePrepareFunction: ((cell, row)=> {
                      if(cell == 'جزئي'){
                          return this.translate.instant('Partial');
                      }else{
                          return this.translate.instant('Full');
                      }
                  }),
              },
              type_of_membership: {
                  title: this.translate.instant('Members.membership'),
                  type: 'string',
              },
              status: {
                  title: this.translate.instant('Members.status'),
                  type: 'custom',
                  valuePrepareFunction: ((cell, row)=> {
                      if(cell == 'Enable'){
                          return true;
                      }else{
                          return false;
                      }
                  }),
                  renderComponent: CustomCheckboxADComponent,
                  onComponentInitFunction(instance) {
                      instance.save.subscribe(row => {
                          parent.changeMemberAttendedStatus(row);
                      });
                  },
                  filter: {
                      type: 'list',
                      config: {
                          selectText: this.translate.instant('Select'),
                          list: [
                              {value: 'Enable', title:this.translate.instant('Enable')},
                              {value: 'Disable', title:this.translate.instant('Disable')},
                          ],
                      },
                  },
              },
              freez_status: {
                  title: this.translate.instant('Members.freez_status'),
                  type: 'custom',
                  valuePrepareFunction: ((cell, row)=> {
                      if(cell == 'yes'){
                          return true;
                      }else{
                          return false;
                      }
                  }),
                  renderComponent: CustomCheckboxADComponent,
                  onComponentInitFunction(instance) {
                      instance.save.subscribe(row => {
                          parent.changeMemberAttendedStatus(row);
                      });
                  },
                  filter: {
                      type: 'list',
                      config: {
                          selectText: this.translate.instant('Select'),
                          list: [
                              {value: 'yes', title:this.translate.instant('Froze')},
                              {value: 'no', title:this.translate.instant('Notfroze')},
                          ],
                      },
                  },
              },

          },
      };
  }


  dateChange(event){
    Pace.restart();
    this.selectedDate = moment(event).format('YYYY-MM-DD');
      this.source = new CustomServerDataSource(this._httpClient, {
          endPoint: 'members/read.php?date=' + this.selectedDate + '&',
      }, this._appHttpService);
  }

  changeMemberAttendedStatus(row){
    Pace.restart();
    this.memebersService.changeMemberAttendedStatus(this.selectedDate, row.member_id).subscribe((data)=>{
        console.log(data);
    });
  }

  onDeleteConfirm(event): void {
      if (window.confirm('Are you sure you want to delete?')) {
          event.confirm.resolve();
      } else {
          event.confirm.reject();
      }
  }

  editRow(event) {
      console.log('event: ', event);
      this.openEditDialog(this.editDialog);
  }

  deleteRow(event) {
      console.log('event: ', event);
      this.openDeleteDialog(this.deleteDialog);
  }

  openEditDialog(dialog: TemplateRef<any>) {
        this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }

  openDeleteDialog(dialog: TemplateRef<any>) {
      const text = "Are you sure you want to delete?";
      this.dialogService.open(dialog, {context: text});
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.totalMemebrs = this.source.count();
    },500);
  }

}
