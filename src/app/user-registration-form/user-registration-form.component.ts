// src\app\user-registration-form\user-registration-form.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
import { Component, OnInit, Input } from '@angular/core';
// OnInit:  Lifecycle hook that is called after component initialization.
// Input:   Decorator that allows the component to receive data from a parent component.
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// MatDialogRef: Used to control a dialog opened via Angular Material (allows closing the dialog)
import { MatSnackBar } from '@angular/material/snack-bar';
// MatSnackBar: Service for displaying short messages to users (e.g. notifications).

// Components
import { FetchApiDataService } from '../fetch-api-data.service';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: '../user-login-form/user-login-form.component.scss',
})

// COMPONENT
// ----------------------------------------------------------------------------------------------------------
export class UserRegistrationFormComponent implements OnInit {
  // OnInt: The OnInit-Interface is implemented in the component to manage its initialization logic.

  // INPUT-DECORATOR
  @Input() userData = { Username: '', Password: '', Email: '', Birthdate: '' };
  // @Input: Decorator for passing this data from a higher-level component.
  // userData: empty initialization of the user-Data object.

  // CONSTRUCTOR (The constructor injects dependencies)
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    //Reference to the dialog that opened this component, so that the dialog can be closed after
    // successful registration.
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  // Lifecycle-Hook = special methods that Angular calls at certain points in the life cycle of a component or directive.
  // is called once after the component's input has been initialized (via the @Input decorator).

  // SENDING-SIGNIN-FORM-INPUTS-TO-BACKEND
  // registerUser(): void {
  //   //
  //   // calls the userRegistration method of the fetchApiData service and passes the userData object.
  //   this.fetchApiData.userRegistration(this.userData).subscribe(
  //     // Success Callback
  //     (result) => {
  //       this.dialogRef.close(); // This will close the modal on success!
  //       console.log(result);
  //       this.snackBar.open('You have successfully registered.', 'OK', {
  //         duration: 3000,
  //       });
  //     },
  //     // Error Callback
  //     (result) => {
  //       this.snackBar.open(result, 'OK', {
  //         duration: 3000,
  //       });
  //     }
  //   );
  // }

  registerUser(): void {
    // calls the userRegistration method of the fetchApiData service and passes the userData object.
    this.fetchApiData.userRegistration(this.userData).subscribe({
      // Success Callback
      next: (result) => {
        this.dialogRef.close(); // This will close the modal on success!
        console.log(result);
        this.snackBar.open('You have successfully registered.', 'OK', {
          duration: 3000,
        });
      },
      // Error Callback
      error: (error) => {
        this.snackBar.open(error, 'OK', {
          duration: 3000,
        });
      },
    });
  }
}
