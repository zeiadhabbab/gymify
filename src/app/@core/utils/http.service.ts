import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Injectable()
export class AppHttpService {

  private baseUrl = '/API';
  private token = '';
  private headers;

  constructor(private httpClient: HttpClient, private authService: NbAuthService){
    this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9leGFtcGxlLm9yZyIsImF1ZCI6Imh0dHA6XC9cL2V4YW1wbGUuY29tIiwiZXhwIjoxNjk2Nzg4MDM2LCJkYXRhIjp7InBhZ2VObyI6MSwibm9fb2ZfcmVjb3Jkc19wZXJfcGFnZSI6MzAsImlkIjoiMSIsImlwX2FkZHJlc3MiOiIxMjcuMC4wLjEiLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJlMTRjMDVmMGRjMjdlNmJlMWZjMTI3YWJhZjQ3NGE1OSIsInNhbHQiOiIiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImFjdGl2YXRpb25fY29kZSI6bnVsbCwiZm9yZ290dGVuX3Bhc3N3b3JkX2NvZGUiOiJmMzllODE2NDlmYzFlNjUzODFkZGFiNTk5OTliMThhYiIsImZvcmdvdHRlbl9wYXNzd29yZF90aW1lIjoiMTQ3NzkyMDEwOSIsInJlbWVtYmVyX2NvZGUiOiJ3cHZEbDRjVEJDZFI1anpzeDF0b3BPIiwiY3JlYXRlZF9vbiI6IjEyNjg4ODk4MjMiLCJsYXN0X2xvZ2luIjoiMTY5NjY4MTkzMyIsImFjdGl2ZSI6IjEiLCJmaXJzdF9uYW1lIjoiXHUwNjIzXHUwNjJkXHUwNjQ1XHUwNjJmIiwibGFzdF9uYW1lIjoiXHUwNjM1XHUwNjI3XHUwNjRhXHUwNjQ1XHUwNjQ3IiwiY29tcGFueSI6Ilx1MDY0Nlx1MDYyN1x1MDYyZlx1MDY0YSBcdTA2MmRcdTA2NGFcdTA2MjdcdTA2MjkgXHUwNjQ2XHUwNjI3XHUwNjI4XHUwNjQ0XHUwNjMzIiwicGhvbmUiOiIwIiwiY2x1Yl9pZCI6IjYifX0.AMvmjxYlOwtdnIJ-353lydEbWuTX_xUIPTsVEc36VzE';

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
  }

  get(url){
    let compinedUrl = `${this.baseUrl}/${url}`;
    const requestOptions = { headers: this.headers };
    return this.httpClient.get<any>(compinedUrl , requestOptions);
  }

}
