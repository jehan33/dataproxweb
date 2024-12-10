import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { actions, successMessage, user } from '../../services/interface.share';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-user-management',
  standalone:true,
  imports:[HttpClientModule, ReactiveFormsModule, NgFor, NgIf, AsyncPipe],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})

export class UserManagementComponent implements OnInit {

  userList: user[] = [];
  actions =  actions;
  successMessage = successMessage;
  displayAddUser: string = actions.INITIAL;
  message: string = '';
  userForm = this.formBuilder.group({
    id: '',
    name: ['', Validators.required],
    email: ['', Validators.required]
  });
  
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public loginService : LoginService,
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(data => this.userList = data);
  }

  updateUser(user: user) {
    this.displayAddUser = actions.UPDATE;
    this.userForm.patchValue(user);
  }

  deleteUser(id: any) {
    this.userService.deleteUserDetails(id).subscribe(data => {
      if(data?.message.toLowerCase() === successMessage.USER_DELETED){
        this.loginService.message.next(data?.message);
        let newUsersList = this.userList.filter(user => user?.id !== id);
         this.userList = newUsersList;
         this.loginService.resetMessage();
        }
    });
  }

  onSubmit(userForm: any, action: actions) {
    if(action === actions.UPDATE) {
      this.userService.updateUserDetails(userForm.id, {
        name: userForm.name,
        email: userForm.email
      }).subscribe(data => {
        if(data?.message.toLowerCase() === successMessage.USER_UPDATED) {
          this.loginService.message.next(data?.message);
          let index = this.userList.findIndex(x => x.id == userForm.id); 
          this.userList[index].name = userForm?.name;
          this.userList[index].email = userForm?.email;
          this.loginService.resetMessage();
        }
       });
    } else {
      this.userService.addUserDetails(userForm).subscribe(data => {
        if(data?.message.toLowerCase() === successMessage.USER_ADDED) {
          this.loginService.message.next(data?.message);
          this.userList.push({
            name: userForm?.name,
            email: userForm?.email
          });
        this.loginService.resetMessage();
        }
      });
    }
    this.displayAddUser = actions.INITIAL;
  }

  showAddUser() {
    this.displayAddUser = actions.ADD;
    this.userForm.reset();
  }

}
