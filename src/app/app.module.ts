// src\app\app.module.ts
// Angular Core & Base Modules
import { NgModule } from '@angular/core'; // for definining an Angular module
import { BrowserModule } from '@angular/platform-browser'; //  required to run Angular applications in the browser
import { HttpClient, HttpClientModule } from '@angular/common/http'; // enables the HttpClientservice used for HTTP requests
// Routing
import { AppRoutingModule } from './app-routing.module';
// App Components
import { AppComponent } from './app.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

// Animationen?
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
// Routing
import { RouterModule, Routes } from '@angular/router';
import { InfoDirectorComponent } from './info-director/info-director.component';
import { InfoGenreComponent } from './info-genre/info-genre.component';
import { InfoMovieComponent } from './info-movie/info-movie.component';
// COMPONENTS

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

// @NgModule defines a module in Angular that groups and configures a set of related components,
// directives, pipes, and services.
@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    InfoDirectorComponent,
    InfoGenreComponent,
    InfoMovieComponent,
  ],
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
  ],
  // Definition of the required global services or providers
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent], // Defines the root component that is loaded at application startup.
})
export class AppModule {}
