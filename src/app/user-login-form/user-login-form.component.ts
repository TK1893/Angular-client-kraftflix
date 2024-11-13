// src\app\user-login-form\user-login-form.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
import { Component, OnInit, Input } from '@angular/core';
/**
 * The `MatDialogRef` service allows you to control the dialog box that is opened.
 * It can be used to close the dialog once the login is successful.
 */
import { MatDialogRef } from '@angular/material/dialog';
/**
 * The `FetchApiDataService` is a service that contains API calls to communicate with the backend.
 * It is used to perform the login request for the user.
 */
import { FetchApiDataService } from '../fetch-api-data.service';
/**
 * The `MatSnackBar` is a service used to display brief notifications to the user, typically at the bottom of the screen.
 * It is used to show login success or failure messages.
 */
import { MatSnackBar } from '@angular/material/snack-bar';
/**
 * The `Router` service is used to navigate to different routes in the application after successful login.
 */
import { Router } from '@angular/router';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
/**
 * The `UserLoginFormComponent` is responsible for displaying the login form, capturing the user's input
 * (username, password, and email), making the API call to authenticate the user and showing appropriate messages based on success or failure.
 */

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss',
})

// COMPONENT
// ----------------------------------------------------------------------------------------------------------
export class UserLoginFormComponent implements OnInit {
  //
  // @-INPUT-DECORATOR /////////////////////////////

  /**
   * The `@Input` decorator allows the parent component to pass data (userData) to this component.
   * The data is expected to contain the username, password, and email.
   * The userData object holds the login credentials: `Username`, `Password`, and `Email`.
   */
  @Input() userData = { Username: '', Password: '', Email: '' };

  //  CONSTRUCTOR /////////////////////////////
  /**
   * The constructor is used to inject the services required by the component and initialize it.
   * @param {FetchApiDataService} fetchApiData - Service for making API calls, including user login.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Service for controlling the dialog box.
   * @param {MatSnackBar} snackBar - Service for showing snack bar notifications to the user.
   * @param {Router} router - Service for navigating to different routes after login.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  //  NG-ON-INIT  /////////////////////////////
  ngOnInit(): void {}

  // LOGIN-USER-() /////////////////////////////
  /**
   * The `loginUser` method is called when the user submits the login form.
   * It sends the `userData` (username, password, and email) to the backend API to authenticate the user.
   *
   * If the login is successful, it
   * - stores the user and token information in `localStorage`,
   * - closes the login dialog
   * - displays a success message,
   * - and navigates to the "movies" route.
   *
   * If the login fails, it shows an error message to the user.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      // SUCCESS
      next: (result) => {
        console.log(result);

        // Close the login dialog on success
        this.dialogRef.close();

        // Store the user and token in localStorage for future requests
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);

        // Log the stored token and user for debugging purposes
        console.log('Token: ' + localStorage.getItem('token'));
        console.log('User: ' + localStorage.getItem('user'));

        // Show a success message in a snackbar
        this.snackBar.open('You have successfully logged in.', 'OK', {
          duration: 3000,
        });

        // Navigate to the "movies" route after successful login
        this.router.navigate(['movies']);
      },
      // ERROR
      error: (error) => {
        // If an error occurs during the login request, show an error message
        this.snackBar.open(
          'Login failed - Please try again ' + `(${error})`,
          'OK',
          {
            duration: 3000,
          }
        );
      },
    });
  }
}
