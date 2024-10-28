// src\app\movie-card\movie-card.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})

// COMPONENT
// ----------------------------------------------------------------------------------------------------------
export class MovieCardComponent {
  movies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}