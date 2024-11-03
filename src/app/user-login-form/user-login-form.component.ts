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
  /**
   * @-INPUT-DECORATOR /////////////////////////////
   * allows the parent component to pass data (userData) to the child component.
   */
  @Input() userData = { Username: '', Password: '', Email: '' };

  //  CONSTRUCTOR /////////////////////////////
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  //  NG-ON-INIT  /////////////////////////////
  ngOnInit(): void {}
  // The OnInit-Interface is implemented in the component to manage its initialization logic.

  // LOGIN-USER-() /////////////////////////////
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      // SUCCESS
      next: (result) => {
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
      // ERROR
      error: (error) => {
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
