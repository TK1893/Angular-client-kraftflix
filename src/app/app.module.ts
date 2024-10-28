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
// Animationen?
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// Template-driven Forms
import { FormsModule } from '@angular/forms';

// @NgModule defines a module in Angular that groups and configures a set of related components,
// directives, pipes, and services.
@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
  ],
  imports: [
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
  ],
  // Definition of the required global services or providers
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent], // Defines the root component that is loaded at application startup.
})
export class AppModule {}
