// src\app\app.module.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
// ANGULAR CORE & BASE MODULES  /////////////////////////////
import { NgModule } from '@angular/core'; // for definining an Angular module
import { BrowserModule } from '@angular/platform-browser'; //  required to run Angular applications in the browser
import { HttpClient, HttpClientModule } from '@angular/common/http'; // enables the HttpClientservice used for HTTP requests
// ROUTING  /////////////////////////////
import { AppRoutingModule } from './app-routing.module';
// Animationen?  /////////////////////////////
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// ANGULAR MATERIAL  /////////////////////////////
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
// ROUTING  /////////////////////////////
import { RouterModule, Routes } from '@angular/router';
// APP COMPONENTS  /////////////////////////////
import { AppComponent } from './app.component';
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

// ROUTING
// ----------------------------------------------------------------------------------------------------------
const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

// @-NG-MODULE
// ----------------------------------------------------------------------------------------------------------
/** defines a module in Angular that groups and configures a set of
 * related components,
 * directives,
 * pipes,
 * services.
 */
@NgModule({
  // DECLARATIONS  /////////////////////////////
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
  // PROVIDERS  /////////////////////////////  (Definition of the required global services or providers)
  providers: [provideAnimationsAsync()],
  // BOOTSTRAP  ///////////////////////////// (Defines the root component that is loaded at application startup.)
  bootstrap: [AppComponent],
})
export class AppModule {}
