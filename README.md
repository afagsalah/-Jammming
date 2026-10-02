# Jammming – Music Playlist Web Application

Jammming is a React-based web application that allows users to search for music, create custom playlists, and save their playlists to Audius.

## Purpose

The purpose of this project is to build an interactive music playlist application while practising front-end web development and API integration.

The project demonstrates how React can be used to manage application state, create reusable components, handle user interactions, communicate with an external API, and implement user authentication.

Users can search for music through Audius, select tracks, create and rename playlists, sign in to their Audius account, and save their playlists.

## Technologies Used

The project was developed using:

- **React** – for building reusable user interface components.
- **JavaScript** – for application logic and event handling.
- **Vite** – for creating and running the React development environment.
- **HTML** – for the structure of the application.
- **CSS** – for styling and responsive layout.
- **Audius API** – for searching music and creating playlists.
- **Audius SDK** – for interacting with Audius services.
- **OAuth** – for secure Audius user authentication.
- **Vitest** – for automated testing.
- **React Testing Library** – for testing React components and user interactions.
- **Git** – for version control.
- **GitHub** – for storing and managing the project repository.
- **Visual Studio Code** – as the development environment.
- **Chrome Developer Tools** – for debugging and testing the application.

## Features

### Music Search

Users can search for songs and artists using the Audius music service. Search results are displayed dynamically within the application.

### Add Tracks to a Playlist

Users can add tracks from the search results to their playlist by clicking the `+` button.

The application prevents the same track from being added to the playlist more than once.

### Remove Tracks

Tracks can be removed from the playlist using the `−` button.

### Custom Playlist Name

The default playlist name is:

`My Playlist`

Users can change this to their preferred playlist name before saving it.

### Audius Authentication

Users can securely sign in using Audius OAuth authentication.

After successful authentication, the application displays the logged-in user's name and provides a Logout option.

### Save Playlist

Authenticated users can save their selected tracks as a playlist to their Audius account.

After a successful save, the application:

- Displays a success notification.
- Clears the search field.
- Clears the search results.
- Clears the selected playlist tracks.
- Resets the playlist name to `My Playlist`.

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

## Future Work

Possible future improvements include:

- Add track previews so users can listen to songs before adding them.
- Display album artwork for search results and playlist tracks.
- Add loading indicators while searching, signing in, or saving.
- Improve error messages when API requests fail.
- Add more detailed playlist information.
- Allow users to view their previously saved Audius playlists.
- Add playlist editing and deletion functionality.
- Improve mobile and tablet responsiveness.
- Add more automated tests for API errors and edge cases.
- Improve accessibility, including keyboard navigation and ARIA labels.
- Deploy the application online so that it can be accessed without running a local development server.

## Running the Project

Install the required dependencies:

```bash
npm install
## Author

**Afag Mohamed**
```
