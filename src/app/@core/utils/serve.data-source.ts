import {Injectable, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import { map } from 'rxjs/operators';
import {AppHttpService} from "./http.service";

@Injectable()
export class CustomServerDataSource extends ServerDataSource {

    lastRequestCount: number = 0;
    _config;

    constructor(protected http: HttpClient, config, private appHttpService: AppHttpService = null) {
        super(http, config);
        this._config = config;
    }

    count(): number {
        return this.lastRequestCount;
    }

    getElements(): Promise<any> {
        let url = this._config.endPoint;

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
                    this.lastRequestCount = +res.document.total_count;
                    return res.document.records;
                })
            ).toPromise();
    }

    public onSaveConfirm(event: any): void {
        const item = event.newData;

    }
}