// src\app\app.module.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
// ANGULAR CORE & BASE MODULES  /////////////////////////////
import { NgModule } from '@angular/core'; // for definining an Angular module
import { BrowserModule } from '@angular/platform-browser'; //  required to run Angular applications in the browser
import { HttpClient, HttpClientModule } from '@angular/common/http'; // enables the HttpClientservice used for HTTP requests
// ROUTING  /////////////////////////////
import { AppRoutingModule } from './app-routing.module';
// ANIMATIONS  /////////////////////////////
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Provides animations asynchronously
// ANGULAR MATERIAL  /////////////////////////////
import { MatInputModule } from '@angular/material/input'; // Provides input form field functionality
import { MatButtonModule } from '@angular/material/button'; // Provides button components
import { MatCardModule } from '@angular/material/card'; // Provides card layout components
import { MatFormFieldModule } from '@angular/material/form-field'; // Provides form field elements
import { MatDialogModule } from '@angular/material/dialog'; // Provides dialog component for modal overlays
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Provides snack-bar notifications
import { MatIconModule } from '@angular/material/icon'; // Provides icon components
import { MatToolbarModule } from '@angular/material/toolbar'; // Provides toolbar components
import { MatTableModule } from '@angular/material/table'; // Provides table display components
import { FormsModule } from '@angular/forms'; // Provides forms functionality

// ROUTER MODULES  /////////////////////////////
import { RouterModule, Routes } from '@angular/router'; // Enables Angular routing with specified paths
// APP COMPONENTS  /////////////////////////////
import { AppComponent } from './app.component'; // The root component of the application
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { InfoDirectorComponent } from './info-director/info-director.component';
import { InfoGenreComponent } from './info-genre/info-genre.component';
import { InfoMovieComponent } from './info-movie/info-movie.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserUpdateFormComponent } from './user-update-form/user-update-form.component';

// ROUTING CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
/**
 * Array defining the application's routes and the components associated with each route.
 *
 * - The default route redirects to 'welcome'.
 * - 'welcome' route loads the `WelcomePageComponent`.
 * - 'movies' route loads the `MovieCardComponent`.
 * - 'profile' route loads the `UserProfileComponent`.
 */
const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

// @-NG-MODULE
// ----------------------------------------------------------------------------------------------------------
/**
 * Root Angular module that organizes and bootstraps the application.
 *
 * - Declares the components and modules used in the application.
 * - Imports necessary Angular and third-party modules.
 * - Configures routing, providers, and the root component.
 */
@NgModule({
  // DECLARATIONS  /////////////////////////////
  /**
   * Declares all components used within this module.
   */
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    InfoDirectorComponent,
    InfoGenreComponent,
    InfoMovieComponent,
    NavbarComponent,
    UserProfileComponent,
    UserUpdateFormComponent,
  ],

  // IMPORTS  /////////////////////////////
  /**
   * Imports essential Angular modules and custom modules for the application.
   */
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
  ],

  // PROVIDERS  /////////////////////////////
  /**
   * Specifies required services and providers available globally.
   * Adds asynchronous animations.
   */
  providers: [provideAnimationsAsync()],

  // BOOTSTRAP  /////////////////////////////
  /**
   * Specifies the root component to bootstrap(load) at application startup.
   */
  bootstrap: [AppComponent],
})
export class AppModule {}
