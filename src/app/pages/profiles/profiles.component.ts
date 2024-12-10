import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormArray, FormControl} from '@angular/forms';
import { ProfilesService } from '../../services/profiles.service';
import { actions, profile, rule, successMessage } from '../../services/interface.share';
import { RulesService } from '../../services/rules.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, AsyncPipe],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.css'
})
export class ProfilesComponent implements OnInit {
  profileForm: FormGroup;
  rulesSelected:any = [];
  actions =  actions;
  profilesList: profile[] = [];
  rules: rule[] = [];
  displayAddProfile: string = actions.INITIAL;

  constructor(
    private formBuilder: FormBuilder,
    private profilesService: ProfilesService,
    private rulesService: RulesService,
    public loginService : LoginService,
    
  ) {
    this.profileForm = this.formBuilder.group({
      ProfileId: '',
      ProfileName: ['', Validators.required],
      RuleNames: new FormArray([]),
    });
  }

  ngOnInit() {
    this.rulesService.getRules().subscribe(data => {
      this.rules = data.map((v: any) => ({
        ...v, 
        ischecked: false
      }));
    });
    this.profilesService.getProfiles().subscribe(data => this.profilesList = data);
  }


  onCheckChange(event:any) {
    const formArray: FormArray = this.profileForm.get('RuleNames') as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      formArray.controls.forEach((ctrl: any) => {
        if(ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  markIsChecked(RuleName: any){
    RuleName.map((rule: any) => {
      this.rules.map((item : any)=>{
        if(item.RuleName == rule){
          item.ischecked = true
        }
      })
    });
  }

  showAddProfile() {
    this.displayAddProfile = actions.ADD;
    this.profileForm.reset();
  }

  updateUser(profile: profile) {
    this.displayAddProfile = actions.UPDATE;
    this.profileForm.patchValue({
      ProfileId: profile?.ProfileId,
      ProfileName: profile?.ProfileName,
      RuleNames: this.markIsChecked(profile?.RuleName)
    });
  }

  deleteUser(id: any) {
    this.profilesService.deleteProfile(id).subscribe(data => {
      if(data?.message.toLowerCase() === successMessage.PROFILE_DELETED){
        this.loginService.message.next(data?.message);
        let newUsersList = this.profilesList.filter(profile => profile?.ProfileId !== id);
        this.profilesList = newUsersList;
        this.loginService.resetMessage();
        }
    });
  }

  onSubmit(profileForm: any, action: actions) {
    if(action === actions.UPDATE) {
      this.profilesService.updateProfile(
        profileForm.ProfileId, { ProfileName: profileForm.ProfileName, RuleNames:  profileForm.RuleNames})
        .subscribe(data => {
        if(data?.message.toLowerCase() === successMessage.PROFILE_UPDATED) {
          this.loginService.message.next(data?.message);
          let index = this.profilesList.findIndex(x => x.ProfileId == profileForm.ProfileId); 
          this.profilesList[index].ProfileName = profileForm?.ProfileName;
          this.profilesList[index].RuleName = profileForm?.RuleNames;
          this.loginService.resetMessage();
        }
       });
    } else {
      this.profilesService.addProfile({ ProfileName: profileForm.ProfileName, RuleNames:  profileForm.RuleNames})
      .subscribe(data => {
        if(data?.message.toLowerCase() === successMessage.PROFILE_ADDED) {
          this.loginService.message.next(data?.message);
          this.profilesList.push({
            ProfileName: profileForm?.ProfileName,
            RuleName: profileForm?.RuleNames
          });
          this.loginService.resetMessage();
        }
      });
    }
    this.displayAddProfile = actions.INITIAL;
  }

}
