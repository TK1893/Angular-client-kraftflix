// src\app\info-director\info-director.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
/**
 * Imports the necessary modules and decorators from Angular and Angular Material.
 * - `Component` is used to declare the class as an Angular component.
 * - `OnInit` is an interface that defines a method for component initialization.
 * - `Inject` and `MAT_DIALOG_DATA` are used to inject data into the component, specifically for dialog components.
 * - `MatDialogRef` provides a reference to the currently opened dialog instance, allowing control over the dialog
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
/**
 * The `InfoDirectorComponent` displays director information in a dialog.
 */
@Component({
  selector: 'app-info-director',
  templateUrl: './info-director.component.html',
  styleUrl: './info-director.component.scss',
})

// COMPONENT  (InfoDirectorComponent)
// ----------------------------------------------------------------------------------------------------------
export class InfoDirectorComponent implements OnInit {
  //
  //  CONSTRUCTOR /////////////////////////////
  /**
   * The constructor is used to inject dependencies into a class and initialize it:
   * - It initializes an instance of `InfoDirectorComponent`.
   * - It injects the data passed to the dialog.
   * - `@Inject` - is a decorator that tells Angular this is a dependency that needs to be injected
   * - `MAT_DIALOG_DATA` - is used pass data into a dialog that is opened using MatDialog
   * @param data - An object containing information about the director.
   * @param data.Name - The director's name.
   * @param data.Bio - A short biography of the director.
   * @param dialogRef - A reference to the dialog box, allowing it to be closed programmatically.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { Name: string; Bio: string },
    public dialogRef: MatDialogRef<InfoDirectorComponent>
  ) {}

  //  NG-ON-INIT /////////////////////////////
  /**
   * The `ngOnInit` method is part of the Angular `OnInit` lifecycle hook and is called once when the component is initialized.
   * It is used to perform any initialization logic when the component is loaded.
   * In this case, `ngOnInit` is implemented without any content as no additional initialization is required.
   * @returns void
   */
  ngOnInit(): void {}

  //  CLOSE-DIALOG-BOX /////////////////////////////
  /**
   * Closes the dialog box.
   * This method can be triggered by user interactions (like clicking a close button)
   * to dismiss the dialog box.
   *
   * @returns void
   */
  closeDialogBox(): void {
    this.dialogRef.close();
  }
}
