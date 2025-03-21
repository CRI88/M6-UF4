import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
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

  onSubmit() {
    if (this.registerForm.valid) {
      const registerObject = {
        name: this.registerForm.value.name,
        apellido: this.registerForm.value.apellido,
        email: this.registerForm.value.email,
        password: this.registerForm.value.contrasenya,
        postalCode: this.registerForm.value.postalCode
      };

      // Llamada a la API para registrar al usuario
      console.log(registerObject);
      // Aquí puedes realizar la llamada a la API con los datos de `registerObject`
    } else {
      console.log('Formulario inválido');
    }
  }
}
