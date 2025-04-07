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

  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      emailFormControl: ['', [Validators.required, Validators.email]],
      textViewContrasenya: ['', [Validators.required]]
    })
  }

  async onSubmit() {
    const loginObject = {
      email: this.loginForm.value.emailFormControl,
      password: this.loginForm.value.textViewContrasenya,
    };

    try {
      const response = await fetch('http://127.0.0.1:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginObject),
      });

      const data = await response.json();

      if (response.status === 200) {
        sessionStorage.setItem('userRole', data.usuario.userrole);
        sessionStorage.setItem('user', data.usuario);
        sessionStorage.setItem('idUsuario', data.usuario.userid);
        this.router.navigate(['/initial']);
      } else {
        this.errorMessage = data.message || 'Error al iniciar sesión';
      }
    } catch (err) {
      this.errorMessage = 'No se pudo conectar con el servidor';
    }
  }
}
