// src\app\app.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

// COMPONENT
// ----------------------------------------------------------------------------------------------------------
export class AppComponent {
  title = 'KRAFTFLIX';

  // INITIALIZATION-OF-MAT-DIALOG-OBJECT
  constructor(public dialog: MatDialog) {}

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
