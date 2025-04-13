import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
   signupForm! :FormGroup;
  constructor(private router:Router , private fb:FormBuilder)
  {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  onSignup() {
    if (this.signupForm.valid) {
      const { name, email, password, confirmPassword } = this.signupForm.value;

      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      localStorage.setItem('user', JSON.stringify({ name, email, password }));
      alert('Signup successful!');
      this.router.navigate(['/login']);
    }
  }


}
