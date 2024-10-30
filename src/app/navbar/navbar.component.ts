import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  // CONSTRUCTOR
  constructor(public router: Router) {}

  ngOnInit(): void {}

  // OPEN-MOVIES-VIEW
  public openMovies(): void {
    this.router.navigate(['movies']);
  }

  // OPEN-PROFILE-VIEW
  public openProfile(): void {
    this.router.navigate(['profile']);
  }

  // LOGOUT-USER
  public logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
