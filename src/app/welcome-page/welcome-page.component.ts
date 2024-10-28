// src\app\welcome-page\welcome-page.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})

// COMPONENT
// ----------------------------------------------------------------------------------------------------------
export class WelcomePageComponent implements OnInit {
  //
  // INITIALIZATION-OF-MAT-DIALOG-OBJECT
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  // OPEN-USER-REGISTRATION-DIALOG
  openUserRegistrationDialog(): void {
    // open-Method of MatDialog to open Component as a Modal
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px',
    });
  }

  // OPEN-USER-LOGIN-DIALOG
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
