# 🎉 Event Management System

A full-stack Event Management web application built using **Django (Backend)** and **React (Frontend)**. The system allows users to register as organizers, attendees, or vendors, create or join events, and manage event-related activities efficiently.

---

## 🎯 Purpose and Goals

The primary purpose of this Event Management System is to provide a centralized platform for planning, organizing, and attending various types of events. Our goals are to:

- **Simplify Event Creation**: Enable organizers to easily create and customize events with all necessary details.
- **Streamline Registration**: Offer a smooth registration process for attendees.
- **Facilitate Vendor Coordination**: Allow vendors to connect with event organizers and manage their services.
- **Enhance Communication**: Keep all stakeholders informed with timely updates and notifications.
- **Provide Insights**: Offer organizers and vendors useful analytics and feedback to improve future events.

---

## 🔧 Technologies Used

- **Backend**: Django, Django REST Framework (DRF), JWT Authentication  
- **Frontend**: React, Axios, React Router  
- **Database**: SQLite (dev), PostgreSQL (prod recommended)  
- **Styling**: Tailwind CSS, Custom CSS  

---

## 🚀 Features

### 🔐 Authentication
- **User Registration**: Users can sign up by choosing a role:
    - **Organizer**: Individuals or organizations planning and hosting events.
    - **Attendee**: Individuals looking to participate in events.
    - **Vendor**: Service providers (e.g., caterers, decorators, photographers) offering services for events.
- **JWT-based Login/Logout**: Secure authentication using JSON Web Tokens, ensuring that user sessions are managed safely.
- **Role-Based Access Control (RBAC)**: The system restricts access to certain features and data based on the user's assigned role. For example, only organizers can create events, and vendors can only view events they are associated with.

### 🗓️ Event Management
- **Create, Edit, and Delete Events (Organizers)**: Organizers have full control over their events. They can:
    - Define event details such as title, description, date, time, virtual or physical location, and category (e.g., conference, workshop, concert, webinar, private party).
    - Set event capacity, ticket prices (if applicable), and registration deadlines.
    - Upload event banners or images.
    - Manage event status (e.g., upcoming, ongoing, completed, canceled).
- **Event Discovery and Registration (Attendees)**: Attendees can:
    - Browse or search for public events based on various criteria (e.g., category, date, location).
    - View detailed event information.
    - Register for events they wish to attend, potentially making payments if the event is ticketed.
    - View their registered events.
- **Vendor Event Association and Management (Vendors)**: Vendors can:
    - Be invited by organizers to provide services for specific events.
    - View details of events they are assigned to.
    - Manage their service offerings and availability.

### 📩 Communication
- **Event Notifications**: Users will receive important updates regarding events they are associated with (e.g., registration confirmation, event reminders, changes in schedule, cancellations). *(Real-time messaging with WebSockets is planned for future implementation).*

### 📊 Dashboard *(In Progress)*
- **Organizer Dashboard**:
    - Overview of created events (upcoming, past, drafts).
    - Statistics on event attendance, revenue generated (if applicable).
    - Management of attendee lists and vendor assignments.
- **Attendee Dashboard**:
    - List of registered events.
    - Personal calendar view of upcoming events.
- **Vendor Dashboard**:
    - Overview of assigned events and services.
    - Communication channel with organizers.
- **Admin Dashboard**:
    - Overall system statistics, user management, and content moderation capabilities.

---

## 🎯 Target Audience

This Event Management System is designed for:

- **Event Organizers**: Individuals, businesses, or organizations looking to plan, promote, and manage events of any scale, from small meetups to large conferences.
- **Event Attendees**: People searching for events to attend, whether for networking, learning, entertainment, or social purposes.
- **Vendors and Service Providers**: Businesses or freelancers (caterers, photographers, A/V technicians, etc.) who offer services for events and want a platform to connect with organizers.
- **Community Leaders**: Those who organize community gatherings, workshops, or local activities.

---

## 📁 Project Structure

```bash

event-management/
│
├── eventx/ # Django project
│ ├── manage.py
│ ├── event_app/ # App with models, views, serializers
│ └── ...
│
├── frontend/ # React project
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── features/
│ ├── public/
│ └── package.json
│
├── requirements.txt
└── README.md



## 🛠️ Setup Instructions

### 🔙 Backend (Django)

```bash
cd eventx
python -m venv env
# Activate the virtual environment
# On Windows:
env\Scripts\activate
# On Unix/macOS:
source env/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

🔜 Frontend (React)

cd frontend
rm package-lock.json       # Optional, to avoid dependency conflicts
npm install
npm run dev                # Or use: npm start
🌐 API Endpoints (Examples)
Method	Endpoint	Description
POST	/api/register/	Register a new user
POST	/api/token/	Login to get JWT token
GET	/api/events/	List all events
POST	/api/events/create/	Create a new event (organizer)

📷 Screenshots (Add Yours)
✅ Login Page

✅ Registration Form

✅ Event Dashboard

You can add screenshots by uploading images and referencing them like:

markdown
Copy
Edit
![Login](screenshots/login.png)
🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

📄 License
This project is open source and available under the MIT License.

👨‍💻 Author
Vijay Gholve

GitHub

LinkedIn

---

### ✅ What You Need to Do Next

1. Create a folder called `screenshots/` and add your images (`login.png`, `dashboard.png`, etc.).
2. If you don’t have a `LICENSE` file yet, add one (MIT recommended).
3. Copy this markdown into your `README.md` file in the root directory.

Let me know if you want to include deployment instructions (e.g., using Vercel or Heroku).







