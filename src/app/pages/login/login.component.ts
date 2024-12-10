import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {
  }

  goto(){
    this.router.navigateByUrl('home');
  }
  ngOnInit(): void {}

}
