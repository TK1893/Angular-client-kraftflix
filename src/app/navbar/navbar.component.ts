import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
@Injectable({
  providedIn: 'root', // makes cervice be available throughout the app without declaring it in a module.
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
