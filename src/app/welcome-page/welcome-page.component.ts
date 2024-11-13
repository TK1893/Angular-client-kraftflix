// src\app\welcome-page\welcome-page.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
// OnInit: Lifecycle hook that is called after component initialization.
import { Component, OnInit } from '@angular/core';
// UserLoginFormComponent: Component for the login form, opened as a dialog.
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
// UserRegistrationFormComponent: Component for the registration form, opened as a dialog.
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
// MatDialog: Angular Material service to manage modal dialogs, allowing components to be loaded in dialog windows.
import { MatDialog } from '@angular/material/dialog';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
/**
 * The WelcomePageComponent serves as the landing page for the app.
 *
 * It displays welcome information & provides navigation to user registration and login dialogs.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})

// COMPONENT-DEFINITION
// ----------------------------------------------------------------------------------------------------------
export class WelcomePageComponent implements OnInit {
  //
  //  CONSTRUCTOR /////////////////////////////
  /**
   * Injects the MatDialog service for managing modal dialogs.
   * @param dialog - MatDialog service instance used to open dialogs for registration and login.
   */
  constructor(public dialog: MatDialog) {} // INITIALIZATION-OF-MAT-DIALOG-OBJECT

  //  NG-ON-INIT  /////////////////////////////
  ngOnInit(): void {} // is called once after the component's input has been initialized (via the @Input decorator).

  // OPEN-USER-REGISTRATION-DIALOG  /////////////////////////////
  /**
   * Opens a dialog containing the `UserRegistrationFormComponent`.
   * Utilizes the MatDialog `open` method to display a registration form for new users in a modal window.
   * The dialog is set to a fixed width for consistent display.
   * @returns void
   */
  openUserRegistrationDialog(): void {
    // open-Method of MatDialog to open Component as a Modal
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px',
    });
  }

  // OPEN-USER-LOGIN-DIALOG  /////////////////////////////
  /**
   * Opens a dialog containing the `UserLoginFormComponent`.
   * Uses the MatDialog `open` method to display a login form for returning users in a modal window.
   * The dialog width is set to 280px for a consistent look.
   * @returns void
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
