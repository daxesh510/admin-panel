# Admin Panel powered by Software Co

This project is an admin panel built using React, TypeScript, and Vite. It includes a mock API for testing purposes and follows best practices for project structure and design.

## Project Setup and Installation Instructions

To get started with the project, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/admin-panel.git
   cd admin-panel-software
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Build the project for production:
   ```sh
   npm run build
   ```

5. Preview the production build:
   ```sh
   npm run preview
   ```

## Project Structure

The project structure is organized as follows:

```
admin-panel-software/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # Reusable components
│   ├── hooks/              # custom hooks
│   ├── languages/          # i18n supported language
│   ├── services/           # services
│   ├── store/              # redux store
│   ├── types/              # all types
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Entry point
│   └── ...                 # Other files
├── .eslintrc.js            # ESLint configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Project metadata and scripts
```

## Implemented Features

- **User Authentication**: Secure login and registration functionality with redux/toolkit.
- **Dashboard**: Overview of key metrics and data visualizations.
- **Project Management**: CRUD operations for managing Project. sorting with date and status.
- **Estimate management**: Configuration estimate for the project with different categories with CRUD operation.

## Running the Mock API

To run the mock API, follow these steps:

1. Start the mock API server:
   ```sh
   npm run mock-api
   ```

The mock API will be available at `http://localhost:5001`.

## Design Choices

- **React with TypeScript**: Ensures type safety and better developer experience.
- **Vite**: Provides fast build times and a smooth development experience.
- **ESLint**: Enforces code quality and consistency.
- **Modular Structure**: Promotes reusability and maintainability of code.
- **Responsive Design**: Ensures the application is accessible on various devices with use of AntD design.

## Additional Information

- **Version Control**: The project uses Git for version control. Make sure to commit changes regularly and use meaningful commit messages.
- **Contributing**: Contributions are welcome. Please follow the code of conduct and submit pull requests for review.
- **License**: This project is licensed under the MIT License.

For any questions or support, please open an issue on the GitHub repository.
