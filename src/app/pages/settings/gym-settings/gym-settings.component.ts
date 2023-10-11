import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/@core/utils/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import * as moment from 'moment';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { TranslateService } from "@ngx-translate/core";

interface GymSettings {
  id : number;
  gymName: string;
  gymAddress: string;
  telMobile: string;
  emailAddress: string;
  urlAddress: string;
  currencySymbol: string;
  openTime: any;
  closeTime: any;
}

interface GymSettingsDB {
  club_id : number;
  name: string;
  address: string;
  club_phone: string;
  club_email: string;
  club_site: string;
  currency_symbol: string;
  start_time: any;
  end_time: any;
}

@Component({
  selector: 'ngx-gym-settings-component',
  styleUrls: ['./gym-settings.component.scss'],
  templateUrl: './gym-settings.component.html',
})

export class GymSettingsComponent implements OnInit{
  settingForm: FormGroup;
  newGymSettingsData: GymSettingsDB;
  disabledSubmit = false;
  positions = NbGlobalPhysicalPosition;

  gymSettings: GymSettings = {
    id: 0,
    gymName: '',
    gymAddress: '',
    telMobile: '',
    emailAddress: '',
    urlAddress: '',
    currencySymbol: '',
    openTime: new Date(),
    closeTime: new Date()
  }

  constructor(private userService: UserService, private toastrService: NbToastrService, private translate: TranslateService){
    /**
     * Create From for Gym Settings
     * */
    this.createSettingForm();

    /**
     * Get Data from DB
     * */
    userService.getGymSettings().subscribe((data)=> {
      data = data['document'];
      this.gymSettings.id = data['club_id'];
      this.gymSettings.gymName = data['name'];
      this.gymSettings.gymAddress = data['address'];
      this.gymSettings.telMobile = data['club_phone'];
      this.gymSettings.emailAddress = data['club_email'];
      this.gymSettings.urlAddress = data['club_site'];
      this.gymSettings.currencySymbol = data['currency_symbol'];
      this.gymSettings.openTime =  new Date("Fri, 26 Sep 2021 " + data['start_time']);
      this.gymSettings.closeTime = new Date("Fri, 26 Sep 2021 " + data['end_time']);

      /**
       * Fill Data into Form
       * */
      this.setSettingFormData(this.gymSettings);

    });
  }

  ngOnInit(){
    this.settingForm.valueChanges.subscribe((result: any) =>{
        console.log('values changes here');
        this.disabledSubmit = false;

    });
  }

  createSettingForm(){
    this.settingForm =  new FormGroup({
      gymName: new FormControl('', [Validators.required,Validators.minLength(4)]),
      gymAddress: new FormControl('', [Validators.required,Validators.minLength(4)]),
      telMobile:  new FormControl('', [Validators.required,Validators.minLength(4)]),
      emailAddress: new FormControl('', [Validators.email,Validators.required]),
      urlAddress: new FormControl('', [Validators.required,Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      currencySymbol: new FormControl('', [Validators.required]),
      openTime: new FormControl(),
      closeTime: new FormControl(),
    });
  }

  setSettingFormData(gymSettings){
    this.settingForm.controls['gymName'].setValue(gymSettings.gymName);
    this.settingForm.controls['gymAddress'].setValue(gymSettings.gymAddress);
    this.settingForm.controls['telMobile'].setValue(gymSettings.telMobile);
    this.settingForm.controls['emailAddress'].setValue(gymSettings.emailAddress);
    this.settingForm.controls['urlAddress'].setValue(gymSettings.urlAddress);
    this.settingForm.controls['openTime'].setValue(gymSettings.openTime);
    this.settingForm.controls['closeTime'].setValue(gymSettings.closeTime);
    this.settingForm.controls['currencySymbol'].setValue(gymSettings.currencySymbol);
    this.disabledSubmit = true;
  }


  onSubmit(){
    this.disabledSubmit = true;

    let fromData:GymSettings = this.settingForm.value;

    this.newGymSettingsData = {
      club_id : this.gymSettings.id,
      name: fromData.gymName,
      address: fromData.gymAddress,
      club_phone: fromData.telMobile,
      club_email: fromData.emailAddress,
      club_site: fromData.urlAddress,
      currency_symbol: fromData.currencySymbol,
      start_time: moment(this.gymSettings.openTime).format('HH:mm:ss'),
      end_time: moment(this.gymSettings.closeTime).format('HH:mm:ss')
    }

    this.userService.updateGymSettings(this.newGymSettingsData).subscribe((data)=> {
      this.showToast(this.positions.BOTTOM_LEFT, 'success', this.translate.instant('general.Success'));
      this.disabledSubmit = false;
    },(error) => {
      this.showToast(this.positions.BOTTOM_LEFT, 'success', this.translate.instant('general.Success'));
      this.disabledSubmit = false;
    });

  }

  showToast(position, status, statusText) {
    let toastClass  = 'saveToast';
    let preventDuplicates = true;
    let duration  = 3000;
    this.toastrService.show(statusText, this.translate.instant('general.successfully'), {duration , position, status ,toastClass, preventDuplicates});
  }

  get gymName(){
    return this.settingForm.get('gymName');
  }

  get gymAddress(){
    return this.settingForm.get('gymAddress');
  }

  get telMobile(){
    return this.settingForm.get('telMobile');
  }

  get emailAddress(){
    return this.settingForm.get('emailAddress');
  }

  get urlAddress(){
    return this.settingForm.get('urlAddress');
  }

  get openTime(){
    return this.settingForm.get('openTime');
  }

  get closeTime(){
    return this.settingForm.get('closeTime');
  }
  get currencySymbol(){
    return this.settingForm.get('currencySymbol');
  }
}
