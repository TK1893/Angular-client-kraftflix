// src\app\navbar\navbar.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
/**
 * The `Router` service is used to navigate to different routes in the application.
 * It is used to change the view when a user clicks on a navigation item in the navbar.
 */
import { Router } from '@angular/router';
/**
 * The `Injectable` decorator is used to mark the `NavbarComponent` as injectable.
 * This allows the component to be available throughout the application without needing to declare it in a module.
 */
import { Injectable } from '@angular/core';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
/**
 * The `NavbarComponent` is responsible for managing the navigation bar in the application.
 * It provides methods for navigating to different views like "Movies", "Profile", and "Welcome",
 * and handles the user logout process.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
//
/** INJECTABLE-DECORATOR /////////////////////////////
/**
 * The `NavbarComponent` class is decorated with `@Injectable`, making it available (injectable)
 * throughout the app. This means, it can be used across the application if needed (in any module)
 */
@Injectable({
  providedIn: 'root',
})

// COMPONENT
// ----------------------------------------------------------------------------------------------------------
export class NavbarComponent implements OnInit {
  //
  //  CONSTRUCTOR /////////////////////////////
  /**
   * The constructor injects the `Router` service which is used to navigate between the different routes (views) in the application.
   * @param {Router} router
   */
  constructor(public router: Router) {}

  //  NG-ON-INIT  /////////////////////////////
  ngOnInit(): void {}

  // NAVIGATION-TO-MOVIES-VIEW /////////////////////////////
  /**
   * This method navigates to the "Movies" view when called. It uses the `Router` service to
   * navigate to the `'movies'` route.
   * @returns {void}
   */
  public openMovies(): void {
    this.router.navigate(['movies']);
  }

  //  NAVIGATION-TO-PROFILE-VIEW /////////////////////////////
  /**
   * This method navigates to the "Profile" view when called. It uses the `Router` service to
   * navigate to the `'profile'` route.
   */
  public openProfile(): void {
    this.router.navigate(['profile']);
  }

  //  LOGOUT-USER /////////////////////////////
  /**
   * This method clears the user's data from `localStorage` and navigates to the "Welcome" view.
   * It is used to log out the user from the application.
   */
  public logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
