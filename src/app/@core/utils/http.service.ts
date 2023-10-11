import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Injectable()
export class AppHttpService  {

  private baseUrl = '/API';
  private token = '';
  private headers;

  constructor(private httpClient: HttpClient, private authService: NbAuthService){
    this.token = '';

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

  post(url, body){
    let compinedUrl = `${this.baseUrl}/${url}`;
    const requestOptions = { headers: this.headers };
    return this.httpClient.post<any>(compinedUrl, body, requestOptions);
  }
}
