# Real-Time Chat Application

This project is a full-stack web application that enables users to send and accept interest requests and engage in real-time chat with other users. The backend is built using Django, and the frontend is developed with React. The application implements JWT-based authentication, allowing secure access to different features of the app.

## Design Choices

### Backend
- **Django**: Chosen for its robustness and scalability. It handles authentication, user management, and API endpoints.
- **Django REST Framework (DRF)**: Used for building the API, providing a simple way to serialize data and handle requests.
- **JWT Authentication**: Implemented to manage user sessions securely.

### Frontend
- **React**: Used for building the user interface, providing a responsive and dynamic experience.
- **Axios**: Chosen for handling HTTP requests from the frontend to the backend.
- **React Router**: Used for managing navigation between different components of the application.

### Real-Time Features
- **Polling Mechanism**: Implemented in the `UsersList` component and the `Chat` component to periodically check for updates in user interests, ensuring real-time updates.

### CSS
- Custom CSS is used to ensure a clean, mobile-friendly, and dark-themed user interface. The layout is responsive, ensuring a consistent experience across different devices.

## Assumptions

- Users are required to register and log in to interact with other users.
- Interest requests are sent with a custom message, and users can either accept or reject these requests.
- Only users who have accepted each other's requests can engage in a chat.

## Prerequisites and Dependencies

### Backend
- Python 3.x
- Django 3.x or above
- Django REST Framework
- Django Rest Framework-simplejwt
- Django CORS Headers

### Frontend
- Node.js (v14 or above)
- npm (v6 or above)
- React (v17 or above)
- Axios
- React Router

## Step-by-Step Installation and Setup Instructions

### Backend Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/krishna-teja18/real-time-chat-application.git
   cd backend
   cd backend

2. **Create and Activate a Virtual Environment:**
   ```bash
   python3 -m venv env
   env\Scripts\activate

3. **Install Backend Dependencies:**
   ```bash
   pip install -r requirements.txt

4. **Set Up Environment Variables:**
- Create a .env file in the root of backend directory.
- Add the following variables to your .env file:
   ```bash
   SECRET_KEY=your_secret_key
- Replace your_secret_key with a strong secret key for your Django application.

5. **Apply Migrations:**
   ```bash
   python manage.py migrate

6. **Create a Superuser:**
   ```bash
   python manage.py createsuperuser

7. **Run the Development Server:**
   ```bash
   python manage.py runserver

### Frontend Setup

1. **Navigate to the Frontend Directory:**
   ```bash
   cd frontend

2. **Install Frontend Dependencies:**
   ```bash
   npm install

3. **Start the React Development Server:**
   ```bash
   npm start

## Running the Application
- Backend: The Django server runs at http://127.0.0.1:8000/.
- Frontend: The React app runs at http://localhost:3000/.
Open your browser and navigate to http://localhost:3000/ to access the application.

## Additional Information
- **User Authentication:** Users need to register and log in to access the application. Upon logging in, a JWT token is stored in localStorage and used for authenticating requests.
- **Sending Interest Requests:** Users can view a list of other users and send an interest request along with a message. If the request is accepted, both users can engage in a real-time chat.
- **Real-Time Chat:** After an interest is accepted, users can chat with each other. The chat messages are fetched and displayed in real-time without needing to refresh the page.

## Contact
For any questions or support, feel free to reach out via email at annapareddykrishnateja@gmail.com.

## Conclusion
This project demonstrates the integration of Django and React to create a real-time chat application. By using JWT for secure authentication and implementing a robust backend with Django, the application provides a seamless experience for users. React's dynamic UI ensures that the user experience is smooth and responsive.
