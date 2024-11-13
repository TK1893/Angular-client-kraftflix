// src\app\user-update-form\user-update-form.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
import { Component, OnInit, Input } from '@angular/core';
// OnInit:  Lifecycle hook that is called after component initialization.
// Input:   Decorator that allows the component to receive data from a parent component.
import { MatDialogRef } from '@angular/material/dialog';
// MatDialogRef: Used to control a dialog opened via Angular Material (allows closing the dialog)
import { MatSnackBar } from '@angular/material/snack-bar';
// MatSnackBar: Service for displaying short messages to users (e.g. notifications).

// Components
import { FetchApiDataService } from '../fetch-api-data.service';
// FetchApiDataService: Service that provides methods to interact with the API for user data updates.
import { UserProfileComponent } from '../user-profile/user-profile.component';
// UserProfileComponent: Used to refresh user profile data in the parent component after an update.

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
/**
 * Component that displays a form for updating user profile information.
 * Allows users to edit their details, which are then sent to the backend for updating the user profile.
 * @returns The component renders an update form for user profile information.
 */
@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrl: './user-update-form.component.scss',
})

// COMPONENT
// ----------------------------------------------------------------------------------------------------------
export class UserUpdateFormComponent implements OnInit {
  /**
   * `@Input`decorator allows the parent component to pass user data to this component for updating profile details.
   * This object contains initial form fields for user input.
   */
  @Input() userData = { Username: '', Password: '', Email: '' };

  // CONSTRUCTOR /////////////////////////////
  /**
   * Creates an instance of the UserUpdateFormComponent and injects dependencies.
   * @param fetchApiData - Service to handle API requests, including editing user information.
   * @param dialogRef - Reference to the opened dialog containing this component. Used to close the dialog on successful update.
   * @param snackBar - Service used to display a brief message when the update is successful or fails.
   * @param userProfile - Instance of the UserProfileComponent to update profile data in the parent component.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserUpdateFormComponent>,
    //Reference to the dialog that opened this component, so that the dialog can be closed after
    // successful registration.
    public snackBar: MatSnackBar,
    public userProfile: UserProfileComponent
  ) {}

  //  NG-ON-INIT  /////////////////////////////
  ngOnInit(): void {}

  // METHODS
  // ----------------------------------------------------------------------------------------------------------

  // UPDATE-USER-PROFILE /////////////////////////////
  /**
   * Sends the user’s updated profile data to the API to save changes to their account.
   *
   * This method calls the `editUser` method of the `FetchApiDataService` and passes `userData`.
   *
   * Closes the dialog and displays a message upon successful update, or shows an error message if the update fails.
   * @returns void
   */
  updaterUser(): void {
    // calls the userRegistration method of the fetchApiData service and passes the userData object.
    this.fetchApiData.editUser(this.userData).subscribe({
      // SUCCES CALLBACK ----
      /**
       * Callback function for handling the API response after a successful update.
       * @param result - The response data returned from the API if the profile update is successful.
       */
      next: (result) => {
        this.dialogRef.close(); // This will close the modal on success!
        console.log('result: ', result);
        this.snackBar.open('You have successfully updated.', 'OK', {
          duration: 3000,
        });
      },
      // ERROR CALLBACK ----
      /**
       * Callback function for handling any errors that occur during the update.
       * Displays an error message if the update fails.
       * @param error - Error object containing details of the update failure.
       */
      error: (error) => {
        this.snackBar.open(error, 'OK', {
          duration: 3000,
        });
      },
    });
  }
}
