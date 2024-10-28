// src\app\user-login-form\user-login-form.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss',
})

// COMPONENT
// ----------------------------------------------------------------------------------------------------------
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '' };

  // CONSTRUCTOR (The constructor injects dependencies)
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    //Reference to the dialog that opened this component, so that the dialog can be closed after
    // successful registration.
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // SENDING-LOGIN-FORM-INPUTS-TO-BACKEND
  loginUser(): void {
    //
    // calls the userRegistration method of the fetchApiData service and passes the userData object.
    this.fetchApiData.userLogin(this.userData).subscribe(
      // Success Callback
      (result) => {
        this.dialogRef.close(); // This will close the modal on success!
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        console.log('Token: ' + localStorage.getItem('token'));
        console.log('User: ' + localStorage.getItem('user'));
        this.snackBar.open('You have successfully logged in.', 'OK', {
          duration: 3000,
        });
        this.router.navigate(['movies']);
      },
      // Error Callback
      (result) => {
        this.snackBar.open(
          'Login failed - Please try again ' + `( ${result} )`,
          'OK',
          {
            duration: 3000,
          }
        );
      }
    );
  }
}
