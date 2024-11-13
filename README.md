# Kraftflix Angular App

**Kraftflix** is a single-page application (SPA) developed in Angular, designed to allow movie enthusiasts to explore films, learn about directors and genres, and create a personal profile to save their favorite movies. The app is connected to an existing RESTful API developed in a previous project ([**Kraftflix-API**](https://github.com/TK1893/kraftFlix.git)). The user and movie data are stored in a personally created MongoDB database.

This project covers the development of the front end using Angular, alongside creating comprehensive documentation and using Agile methodologies (Kanban, user stories, and story points).

---

## Live App

[**Check the Kraftflix Live App**](https://tk1893.github.io/Angular-client-kraftflix/)

---

## Table of Contents

- [Project Description](#project-description)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [App Components](#app-components)
- [Documentation and Commenting](#documentation-and-commenting)
- [Kanban Board and Agile Methods](#kanban-board-and-agile-methods)
- [Contributing](#contributing)
- [License](#license)

---

## Project Description

The **Kraftflix Angular App** is a user-friendly and responsive application for film lovers. Users can log in, browse movies, view detailed information about a single movie, directors and genres, and create a user profile to save their favorite films.

The app interacts with an existing server-side RESTful API to retrieve data and presents it in an Angular-based interface. This SPA ensures accessibility and a consistent experience across all devices.

---

## Key Features

### 1. **Welcome View**

- Users can either log in or register a new account.

### 2. **Movie List View**

- Displays all movies available in the MongoDB database retrieved from the API.
- Each movie is displayed on a separate Angular Material Card.

### 3. **Single Movie Information**

- The user can use buttons on the single movie cards to display detailed views with additional information about the desired movie.
- Each card contains three buttons:
  - **`Director`** - Provides information about the director of the selected movie.
  - **`Genre`** - Shows details about the genre of the selected movie.
  - **`Synopsis`** - Displays the plot of the selected movie.

### 4. **User Profile**

- Users can create a profile with personal details and save their favorite movies.
- After registering, users can edit their profile information and delete their profile.

### 5. **Routing**

- The app utilizes Angular Routing to navigate between the different views.

---

## Technologies Used

### `Core Technologies`

#### 1. **Angular (Version 18.2.9)**

- The frontend framework for building the SPA.

#### 2. **Angular Material**

- Used to create a responsive and attractive UI. Angular Material provides pre-built UI components that enhance the user experience.

#### 3. **TypeScript**

- Used as the primary language for Angular development.

#### 4. **RxJS**

- For managing asynchronous data streams and handling errors in API calls.

#### 5. **Angular Router**

- used for in-app navigation with URL paths between the different Views

### `Development Tools`

#### 1. **Node.js and npm**

- For environment setup and dependency management.

#### 2. **Angular CLI**

- Facilitates project setup and management.

#### 3. **GitHub Pages**

- For App hosting.

### `Project Management Tool`

#### **Trello**

- for Agile project management
- Kanban Board used to organize tasks with user stories and track progress using story points.

### `Documentation and Commenting`

#### **TypeDoc**

- For generating inline code documentation.
- For environment setup and dependency management.

---

## Installation and Setup

### 1. **`Clone the Repository`**

- To run the project locally, clone the repository:
  ```bash
  git clone https://github.com/TK1893/Angular-client-kraftflix.git
  cd Angular-client-kraftflix
  ```

### 2. **`Install Dependencies`**

- Make sure you have Node.js and npm installed, then install the necessary dependencies:
  ```bash
  npm install
  ```

### 3. **`Start the Development Server`**

- Start the Angular development server:
  ```bash
  ng serve
  ```
- The application should now be available at `http://localhost:4200`.

### 4. **`Build for Production`**

- To build the application for production, use:
  ```bash
  ng build --prod
  ```
- The build artifacts will be stored in the `dist/` directory.

---

## Usage

1. **Welcome View**:

- Users can register or log in to access the main movie library.

2. **Browse Movies**:

- After logging in, users can explore a list of available movies and view details for each one.

3. **Movie Details**:

- On the single movie cards, users can click buttons to learn more about the movie’s plot, director and genre.

4. **User Profile**:

- Users can view and edit their profile information and manage a list of favorite movies.

---

## Folder Structure

```plaintext
Kraftflix-angular-app/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── fetch-api-data.service.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.module.ts
│   │   └── app.component.ts
│   │
│   └── main.ts
│
├── angular.json
├── package.json
└── README.md

```

---

## App Components

- **`AppComponent`** - Root component of the app.

- **`WelcomePageComponent`** - App welcome page.
- **`UserRegistrationFormComponent`** - User registration form.
- **`UserLoginFormComponent`** - User login form.
- **`MovieCardComponent`** - Displays movie info cards.
- **`InfoDirectorComponent`** - Shows director info.
- **`InfoGenreComponent`** - Shows genre info.
- **`InfoMovieComponent`** - Shows movie plot.
- **`NavbarComponent`** - Navigation bar.
- **`UserProfileComponent`** - User profile page.
- **`UserUpdateFormComponent`** - User info update form.

---

## Documentation and Commenting

The project includes **`TypeDoc`** for code documentation. All documentation files are available in the [**docs**](https://github.com/TK1893/Angular-client-kraftflix/tree/main/docs) folder

---

## Kanban Board and Agile Methods

For project management, a **Kanban Board** was used in **Trello**.  
Tasks were organized as **User Stories** and estimated with **Story Points**.  
Tasks were categorized as follows:

- **`To Do`** - Tasks pending completion.
- **`In Progress`** - Tasks currently being worked on.
- **`Done `** - Completed tasks.

---

## Contributing

Contributions are welcome! To contribute:
Fork the repository.
Create a new branch (feature/NewFeature).
Make your changes and ensure they are well-documented.
Submit a pull request for review.

---

## License

This project is open-source under the MIT License.

---

## Author

Developed by Tobias Kraft.
