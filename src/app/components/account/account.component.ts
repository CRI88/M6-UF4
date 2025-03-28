import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  idUsuario = Number(sessionStorage.getItem('idUsuario'));
  usuario = {
    username: '',
    surname: '',
    email: '',
    password: '',
    postal_code: 0
  }

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contrasenya: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]]
    });

  }

  async ngOnInit(): Promise<void> {
    const response = await fetch('http://127.0.0.1:3000/api/users/' + this.idUsuario, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.usuario = await response.json();
    console.log(this.usuario);

    this.registerForm.patchValue({ name: this.usuario.username });
    this.registerForm.patchValue({ apellido: this.usuario.surname });
    this.registerForm.patchValue({ email: this.usuario.email });
    this.registerForm.patchValue({ contrasenya: this.usuario.password });
    this.registerForm.patchValue({ postalCode: this.usuario.postal_code });


  }


  async onSubmit() {

    const registerObject = {
      username: this.registerForm.value.name,
      surname: this.registerForm.value.apellido,
      email: this.registerForm.value.email,
      password: this.registerForm.value.contrasenya,
      postal_code: this.registerForm.value.postalCode
    };

    console.log(registerObject);

    const response = await fetch('http://127.0.0.1:3000/api/users/' + this.idUsuario, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerObject)
    });
    console.log(response);
  }
}
