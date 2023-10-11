import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import { map } from 'rxjs/operators';
import {AppHttpService} from "../../../@core/utils/http.service";

@Injectable()
export class CustomServerDataSource extends ServerDataSource {

    lastRequestCount: number = 0;

    constructor(protected http: HttpClient, comf, private appHttpService: AppHttpService = null) {
        super(http, comf);
    }

    count(): number {
        return this.lastRequestCount;
    }

    getElements(): Promise<any> {
        let url = 'members_attandance/members_attendece_by_date.php?date=2023-10-07&';

        if (this.sortConf) {
            this.sortConf.forEach((fieldConf) => {
                url += `sort=${fieldConf.field}&order=${fieldConf.direction.toUpperCase()}&`;
            });
        }

        if (this.pagingConf && this.pagingConf['page'] && this.pagingConf['perPage']) {
            url += `pageno=${this.pagingConf['page']}&pagesize=${this.pagingConf['perPage']}&`;
        }

        if (this.filterConf.filters) {
            this.filterConf.filters.forEach((fieldConf) => {
                if (fieldConf['search']) {
                    url += `${fieldConf['field']}_like=${fieldConf['search']}&`;
                }
            });
        }

        return this.appHttpService.get(url)
            .pipe(
                map(res => {
                    debugger;
                    this.lastRequestCount = +res.document.total_count;
                    return res.document.records;
                })
            ).toPromise();
    }
}