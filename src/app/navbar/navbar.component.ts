// src\app\navbar\navbar.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
//
/** INJECTABLE-DECORATOR /////////////////////////////
 * Allows the service to be available throughout the app
 * marks this class as a service   */
@Injectable({
  providedIn: 'root', // makes cervice be available throughout the app without declaring it in a module.
})

// COMPONENT
// ----------------------------------------------------------------------------------------------------------
export class NavbarComponent implements OnInit {
  //
  //  CONSTRUCTOR /////////////////////////////
  constructor(public router: Router) {}

  //  NG-ON-INIT  /////////////////////////////
  ngOnInit(): void {}

  // NAVIGATION-TO-MOVIES-VIEW /////////////////////////////
  public openMovies(): void {
    this.router.navigate(['movies']);
  }

  //  NAVIGATION-TO-PROFILE-VIEW /////////////////////////////
  public openProfile(): void {
    this.router.navigate(['profile']);
  }

  //  LOGOUT-USER /////////////////////////////
  public logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
