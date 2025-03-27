import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      emailFormControl: ['', [Validators.required, Validators.email]],
      textViewContrasenya: ['', [Validators.required]]
    })
  }

  async onSubmit(){

    const loginObject = {
      email: this.loginForm.value.emailFormControl,
      password: this.loginForm.value.textViewContrasenya,
    }

    console.log(loginObject);

    const response = await fetch('http://127.0.0.1:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginObject),
      
    });

    const data = await response.json();

    console.log(data);

    sessionStorage.setItem('userRole', data.usuario.userrole);
    sessionStorage.setItem('user', data.usuario);
    sessionStorage.setItem('idUsuario', data.usuario.idUsuario);
    
    if (response.status === 200) {
      console.log('Login correcto');

      this.router.navigate(['/initial']);
    }

  }
}
