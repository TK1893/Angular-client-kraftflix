// src\app\app-routing.module.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
/**
 * - NgModule: Angular decorator that marks a class as an Angular module, used for organizing imports, declarations, and providers within an app.
 * - RouterModule: Angular service for configuring and managing app navigation routes.
 * - Routes: Type used for configuring route paths, components, and associated settings.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ROUTE CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
/**
 * Defines the application's routing configuration.
 * Currently, the `routes` array is empty and can be populated with route definitions
 * to handle navigation between components.
 *
 * routes -  An array to store route definitions, where each route object can specify
 * a path, component, and optional configuration settings.
 */
const routes: Routes = [];

// MODULE DEFINITION
// ----------------------------------------------------------------------------------------------------------
/**
 * The AppRoutingModule configures and provides the routing mechanism for the application.
 * It sets up the application's routes and enables Angular's RouterModule for navigation.
 *
 * @returns The configured routing module for the application, allowing routes to be added
 * and navigation functionality to be set up.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // @param {Routes} routes - The route configuration array to be used for setting up the application's routing structure.
  // The forRoot method configures the router based on the provided routes and returns a module.
  exports: [RouterModule],
})
export class AppRoutingModule {}
