import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [FontAwesomeModule, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isCartOpen = false;
  cartItems: any[] = [];

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  checkout() {
    alert("Compra finalizada 🚀");
    this.cartItems = [];
    this.isCartOpen = false;
  }

  faSearch = faSearch;

  userId = Number(sessionStorage.getItem('idUsuario'));
  userRole = sessionStorage.getItem('userRole');

  
}