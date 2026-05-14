# Student Task Tracker

A MERN stack application to manage daily internship and study tasks.

## Screenshots

### Task List
![Task List](screenshots/task-list.png)

### Add/Edit Form
![Add Form](screenshots/add-form.png)

### Edit Form
![Edit Form](screenshots/edit-form.png)

## Features
- Add, edit, delete tasks
- Search tasks by title or description
- Filter by status and priority
- Dashboard with total, pending, in-progress, completed and overdue counts
- Overdue task detection
- Frontend and backend validation
- Responsive beach-themed UI with smooth animations

## Tech Stack
- **Frontend:** React.js (Vite)
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas
- **HTTP Client:** Axios

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/vanshmaheshwari021/student-task-tracker.git
cd student-task-tracker
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

## Environment Variables
| Variable | Description |
|---|---|
| MONGO_URI | MongoDB Atlas connection string |
| PORT | Server port (default: 5000) |

## AI Usage
Used Claude AI (Anthropic) to help scaffold the project structure, generate boilerplate code, debug issues and design the UI color palette. All code was reviewed and understood before submission.

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |
