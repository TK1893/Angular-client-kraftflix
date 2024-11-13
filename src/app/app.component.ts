// src\app\app.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
import { Component } from '@angular/core';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
/**
 * Root application component, `AppComponent`, which serves as the main entry point for the Angular application.
 *
 * This component includes the selector, template, and style configurations and manages the `title` property
 * which displays the application’s name.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

// COMPONENT
// ----------------------------------------------------------------------------------------------------------
export class AppComponent {
  title = 'KRAFTFLIX';
}
