// src\app\info-genre\info-genre.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
/**
 * Imports the necessary modules and decorators from Angular and Angular Material.
 * - `Component` is used to declare the class as an Angular component.
 * - `OnInit` is an interface that defines a method for component initialization.
 * - `Inject` and `MAT_DIALOG_DATA` are used to inject data into the component, specifically for dialog components.
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
/**
 * The `InfoGenreComponent` displays genre information in a dialog.
 */
@Component({
  selector: 'app-info-genre',
  templateUrl: './info-genre.component.html',
  styleUrl: './info-genre.component.scss',
})

// COMPONENT
// ----------------------------------------------------------------------------------------------------------
export class InfoGenreComponent implements OnInit {
  //
  //  CONSTRUCTOR /////////////////////////////
  /**
   * The constructor is used to inject dependencies into a class and initialize it:
   * - It initializes an instance of `InfoGenreComponent`.
   * - It injects the data passed to the dialog.
   * - `@Inject` - is a decorator that tells Angular this is a dependency that needs to be injected
   * - `MAT_DIALOG_DATA` - is used pass data into a dialog that is opened using MatDialog
   * @param data - An object containing information about the genre.
   * @param data.Name - The name of the movie genre.
   * @param data.Description - The description of the movie genre.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    }
  ) {}

  //  NG-ON-INIT /////////////////////////////
  /**
   * The `ngOnInit` method is part of the Angular `OnInit` lifecycle hook and is called once when the component is initialized.
   * It is used to perform any initialization logic when the component is loaded.
   * In this case, `ngOnInit` is implemented without any content as no additional initialization is required.
   * @returns void
   */
  ngOnInit(): void {}
}
