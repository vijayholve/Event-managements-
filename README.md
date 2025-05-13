# Event Management System 🎉

A full-stack Event Management web application built using **Django (Backend)** and **React (Frontend)**. The system allows users to register as organizers, attendees, or vendors, create or join events, and manage event-related activities efficiently.

---

## 🔧 Technologies Used

- **Backend**: Django, Django REST Framework (DRF), JWT Authentication
- **Frontend**: React, Axios, React Router
- **Database**: SQLite (development), PostgreSQL (recommended for production)
- **Styling**: Tailwind CSS, Custom CSS

---

## 🚀 Features

### 🔐 Authentication
- User registration with role selection (Organizer, Attendee, Vendor)
- JWT-based login/logout
- Role-based access control

### 🗓️ Event Management
- Organizers can create, edit, and delete events
- Attendees can register for events
- Vendors can view and manage assigned events

### 📩 Communication
- Users receive real-time messages for event updates (coming soon with WebSocket)

### 📊 Dashboard (In Progress)
- Overview of upcoming and past events
- Stats and activity logs

---

## 📁 Project Structure

event-management/
│
├── eventx/ # Django project
│ ├── manage.py
│ ├── event_app/ # Main app with models, views, serializers
│ ├── ...
└─ requirements.txt
│
├── frontend/ # React project
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── features/
│ ├── public/
│ └── package.json
│
├── README.md



---

## 🛠️ Setup Instructions

### Backend (Django)

```bash
cd backend
python -m venv env
source env/bin/activate   # On Windows use `env\Scripts\activate`
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Frontend (React)

cd frontend
rm package-lock.json
npm install
npm run dev               # o




🌐 API Endpoints (Example)
POST /api/register/ – Register a new user

POST /api/token/ – Login to get JWT token

GET /api/events/ – List all events

POST /api/events/create/ – Create a new event (organizer only)

📷 Screenshots
Add screenshots here if available:

Login page

Registration form

Event dashboard

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

📄 License
This project is open source and available under the MIT License.

👨‍💻 Author
Vijay Gholve
GitHub
LinkedIn

