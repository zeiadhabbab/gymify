import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    private currentUser:any;

    constructor() { }

    public setCurrentUser(user){
        this.currentUser = user;
    }
}