# ShareMat Recruitment Test

## Project Overview

This project is part of the ShareMat recruitment process. It's a web application built with React, TypeScript, and CSS, using Vite as the build tool. The app fetches and displays character data from the Rick and Morty public API.

## Technologies Used

- React
- TypeScript
- CSS
- Vite
- React Testing Library
- Rick and Morty API (https://rickandmortyapi.com/api)

## Getting Started

### Installation

1. Clone the repository: git clone https://github.com/loogark/sharemat-react-test.git
2. Navigate to the project directory: cd ./sharemat-react-test
3. Install dependencies: pnpm i

### Running the Application

To start the development server: pnpm run dev
The application will be available at `http://localhost:5173`.

### Building for Production
To create a production build: pnpm run build
The built files will be in the `dist` directory.

## Project Structure
src/
├── components/
├── hooks/
├── types/
├── utils/
├── assets/
├── layout/
├── App.tsx
└── main.tsx
└── router.tsx
└── setupTests.ts

## Features

- Display a list of Rick and Morty characters
- Search functionality for characters
- Pagination for character list
- Detailed view for each character

## API Usage

This project uses the [Rick and Morty API](https://rickandmortyapi.com/api). Please refer to their documentation for more details on available endpoints and rate limits.

## Justification for technology
-  React - React offers a component-based architecture for building interactive user interfaces efficiently. It uses a virtual DOM for optimized rendering, supports reusable UI components, and has a large ecosystem of libraries and tools.
-  Vite - Vite is a fast build tool for React projects, offering quick startup and hot module replacement.
-  React Router v6 - React Router v6 introduced simplified APIs and improved performance over previous versions.
- Rick and Morty - The [Rick and Morty API](https://rickandmortyapi.com/api) is a free, public API based on the popular animated TV show Rick and Morty. It provides developers with access to data about characters, locations, and episodes from the show

## What could have been done better
 - Given the time constraint, Could have made a custom dropdown or even styled the pagination much better.
 - Have a better unit test coverage as of now only tested bare minimum
 - add a more filter options then search to make the list interactive.
 - Could have added more endpoints in details page to give more info.

 # Live Link
  [https://sharemat-react-test.vercel.app/](https://sharemat-react-test.vercel.app/)

## License

This project is licensed under the MIT License.