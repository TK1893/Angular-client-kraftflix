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
import { UserProfileComponent } from '../user-profile/user-profile.component';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrl: './user-update-form.component.scss',
})

// COMPONENT
// ----------------------------------------------------------------------------------------------------------
export class UserUpdateFormComponent implements OnInit {
  //
  // INPUT-DECORATOR
  @Input() userData = { Username: '', Password: '', Email: '' };
  // @Input: Decorator for passing this data from a higher-level component.
  // userData: empty initialization of the user-Data object.

  // CONSTRUCTOR (The constructor injects dependencies)
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserUpdateFormComponent>,
    //Reference to the dialog that opened this component, so that the dialog can be closed after
    // successful registration.
    public snackBar: MatSnackBar,
    public userProfile: UserProfileComponent
  ) {}

  // NG-ON-INIT
  ngOnInit(): void {}

  updaterUser(): void {
    // calls the userRegistration method of the fetchApiData service and passes the userData object.
    this.fetchApiData.editUser(this.userData).subscribe({
      // Success Callback
      next: (result) => {
        this.dialogRef.close(); // This will close the modal on success!
        console.log('result: ', result);
        this.snackBar.open('You have successfully updated.', 'OK', {
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
