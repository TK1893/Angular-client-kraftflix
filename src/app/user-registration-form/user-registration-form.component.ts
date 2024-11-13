// src\app\user-registration-form\user-registration-form.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
import { Component, OnInit, Input } from '@angular/core';
// OnInit:  Lifecycle hook that is called after component initialization.
// Input:   Decorator that allows the component to receive data from a parent component.
import { MatDialogRef } from '@angular/material/dialog';
// MatDialogRef: Used to control a dialog opened via Angular Material (allows closing the dialog)
import { MatSnackBar } from '@angular/material/snack-bar';
// MatSnackBar: Service for displaying short messages to users (e.g. notifications).
import { FetchApiDataService } from '../fetch-api-data.service';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
/**
 * Component that displays a registration form for new users.
 *
 * Allows users to enter registration details, which are then sent to the backend for account creation.
 * @returns The component renders a registration form for user signup.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: '../user-registration-form/user-registration-form.component.scss',
})

// COMPONENT
// ----------------------------------------------------------------------------------------------------------
export class UserRegistrationFormComponent implements OnInit {
  /**
   * `@Input` decorator allows the parent component to pass user data to this component for registration purposes.
   * This object contains initial form fields for user input.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthdate: '' };

  //  CONSTRUCTOR /////////////////////////////
  /**
   * Creates an instance of the UserRegistrationFormComponent and injects dependencies.
   * @param fetchApiData - The service to handle API requests, including user registration.
   * @param dialogRef - Reference to the opened dialog containing this component. Used to close the dialog on successful registration.
   * @param snackBar - Service used to display a brief message when registration is successful or fails.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  //  NG-ON-INIT  /////////////////////////////
  ngOnInit(): void {}

  // REGISTER USER  /////////////////////////////
  /**
   * Sends the user’s registration data to the API to create a new account.
   * This method calls the `userRegistration` method of the `FetchApiDataService` and passes `userData`.
   * @returns void
   */
  registerUser(): void {
    // calls the userRegistration method of the fetchApiData service and passes the userData object.
    this.fetchApiData.userRegistration(this.userData).subscribe({
      // Success Callback
      /**
       * Success callback function for handling the API response.
       * @param result - The response data returned from the API if registration is successful.
       */
      next: (result) => {
        this.dialogRef.close(); // Closes the dialog on successful registration
        console.log(result);
        this.snackBar.open('You have successfully registered.', 'OK', {
          duration: 3000,
        });
      },
      // Error Callback
      error: (error) => {
        this.snackBar.open(
          'Signup failed - Please try again' + `(${error})`,
          'OK',
          {
            duration: 3000,
          }
        );
      },
    });
  }
}
