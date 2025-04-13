import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   
    loginForm !:FormGroup;

    constructor(private fb:FormBuilder, private router : Router)
    {
      this.loginForm = this.fb.group({
         email:['',[Validators.required, Validators.email]],
         password:['',[Validators.required]]
      });
    }

    onLogin()
    {
      const userData = JSON.parse(localStorage.getItem('user')|| '{}');
      if(
        userData.email === this.loginForm.value.email &&
        userData.password === this.loginForm.value.password
      )
      {
        localStorage.setItem("isLoggdIn",'true');
        alert("Login Successfull");
        this.router.navigate(['/dashboard']);
      }
      else 
      {
        alert("Invaid Email And Password");
      }
    }

}
