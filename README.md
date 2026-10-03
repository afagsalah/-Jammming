# Jammming – Music Playlist Web Application

Jammming is a React-based web application that allows users to search for music, create custom playlists, and save their playlists to Audius.

## Purpose

The purpose of this project is to build an interactive music playlist application while practising front-end web development and API integration.

The project demonstrates how React can be used to manage application state, create reusable components, handle user interactions, communicate with an external API, implement user authentication, and provide responsive feedback during asynchronous operations.

Users can search for music through Audius, select tracks, create and rename playlists, sign in to their Audius account, and save their playlists.

## Technologies Used

The project was developed using:

- **React** – for building reusable user interface components.
- **JavaScript** – for application logic and event handling.
- **Vite** – for creating, running, and building the React application.
- **HTML** – for the structure of the application.
- **CSS** – for styling and responsive layout.
- **Audius API** – for searching music and creating playlists.
- **Audius SDK** – for interacting with Audius services.
- **OAuth** – for secure Audius user authentication.
- **Vitest** – for automated testing.
- **React Testing Library** – for testing React components and user interactions.
- **Git** – for version control.
- **GitHub** – for storing and managing the project repository.
- **GitHub Pages** – for deploying the application online.
- **GitHub Actions** – for automatically building and deploying the application.
- **Visual Studio Code** – as the development environment.
- **Chrome Developer Tools** – for debugging and testing the application.

## Features

### Music Search

Users can search for songs and artists using the Audius music service. Search results are displayed dynamically within the application.

### Add Tracks to a Playlist

Users can add tracks from the search results to their playlist by clicking the `+` button.

The application prevents the same track from being added to the playlist more than once.

Once a track has been added to the playlist, it is automatically removed from the displayed search results. This ensures that the search results only display tracks that are not currently present in the playlist.

### Remove Tracks

Tracks can be removed from the playlist using the `−` button.

When a track is removed from the playlist, it can automatically appear again in the current search results if it was part of the original search.

### Custom Playlist Name

The default playlist name is:

`My Playlist`

Users can change this to their preferred playlist name before saving it.

### Audius Authentication

Users can securely sign in using Audius OAuth authentication.

After successful authentication, the application displays the logged-in user's name and provides a Logout option.

The application can also restore an existing Audius login session when the user returns to the application.

### Preserve Search Term During Login

The application preserves the user's current search term when the user signs in through Audius.

If the authentication process redirects or reloads the application, the previous search term can be restored so that the user does not have to type it again.

### Save Playlist

Authenticated users can save their selected tracks as a playlist to their Audius account.

After a successful save, the application:

- Displays a success notification.
- Clears the search field.
- Clears the search results.
- Clears the selected playlist tracks.
- Resets the playlist name to `My Playlist`.

### Playlist Saving Loading Screen

While a playlist is being saved to Audius, the application displays a loading screen with a spinner and a saving message.

The loading screen informs the user that the save operation is in progress and disappears when the operation has completed or failed.

### Success Notifications

The application displays attractive temporary notifications after operations such as successful login and playlist saving.

These messages automatically disappear after a short period.

### Logout

Authenticated users can log out of Audius. After logout, the interface returns to the signed-out state and provides a Sign In option.

### Automated Testing

Automated tests are included for the main components and application functionality.

The tests cover functionality such as:

- Searching for tracks.
- Displaying search results.
- Adding tracks.
- Preventing duplicate tracks.
- Removing tracks.
- Changing the playlist name.
- Signing in and logging out.
- Saving playlists.
- Restoring an existing login session.
- Resetting the application after a successful save.

Audius API functionality is mocked during automated testing so that tests do not create real playlists or require real authentication.

### Online Deployment

The application is deployed online using GitHub Pages.

GitHub Actions is used to automatically build and deploy the latest version of the application when changes are pushed to the repository.

## Future Work

Possible future improvements include:

- Add track previews so users can listen to songs before adding them.
- Display album artwork for search results and playlist tracks.
- Add a loading indicator while searching for music.
- Add a loading indicator during the sign-in process.
- Improve error messages when API requests fail.
- Add more detailed playlist information.
- Allow users to view their previously saved Audius playlists.
- Add playlist editing and deletion functionality.
- Improve mobile and tablet responsiveness.
- Add more automated tests for API errors and edge cases.
- Improve accessibility, including keyboard navigation and ARIA labels.

## Running the Project

Install the required dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Running the Tests

Run the automated tests with:

```bash
npm test
```

## Author

**Afag Mohamed**
