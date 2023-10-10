import { Injectable } from '@angular/core';
import { AppHttpService } from "./http.service";

@Injectable()
export class UserService {
    private currentUser:any;

    constructor(private httpService: AppHttpService) { }

    public setCurrentUser(user){
        this.currentUser = user;
    }

    public getGymSettings(){
        return this.httpService.get(`club_config/read_one.php?id=1`);
    }

    public updateGymSettings(data){
        return this.httpService.post(`club_config/update_patch.php`, data);
    }


}