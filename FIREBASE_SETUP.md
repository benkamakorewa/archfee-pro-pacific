
# Firebase Setup Instructions

To enable authentication and database features, you need to set up a Firebase project and add the configuration keys to your `.env.local` file.

1.  **Create a Firebase Project**: Go to [console.firebase.google.com](https://console.firebase.google.com/) and create a new project.
2.  **Enable Authentication**:
    *   Go to Build > Authentication.
    *   Enable **Email/Password** provider.
3.  **Enable Firestore**:
    *   Go to Build > Firestore Database.
    *   Create a database (start in **Test Mode** for development, or set up rules).
    *   **Rules**:
        ```
        rules_version = '2';
        service cloud.firestore {
          match /databases/{database}/documents {
            // Allow users to read/write their own estimates
            match /estimates/{estimateId} {
              allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
              allow create: if request.auth != null;
            }
            // Allow users to read their own profile
            match /users/{userId} {
               allow read, write: if request.auth != null && request.auth.uid == userId;
            }
          }
        }
        ```
4.  **Get Config**:
    *   Go to Project Settings > General.
    *   Scroll down to "Your apps" and add a Web app.
    *   Copy the config values.
5.  **Update .env.local**:
    Add the following keys to your `/Users/pkam669/Documents/Apps/archfee-pro/.env.local` file:

    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

6.  **Restart Server**: Run `npm run dev` again to load the new environment variables.
