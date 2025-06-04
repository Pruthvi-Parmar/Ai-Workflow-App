# IntelliFlow - AI-Powered Ticketing System

IntelliFlow is an intelligent ticketing system that leverages AI to automate ticket processing, analysis, and assignment. Built with modern web technologies and AI integration, it streamlines support workflows and improves response times through smart automation.

## 🚀 Features

### Core Features
- **🤖 AI-Powered Ticket Analysis**: Automatically analyzes tickets using Google Gemini AI to determine priority, required skills, and helpful notes
- **🎯 Smart Assignment**: Intelligently assigns tickets to moderators based on their skills and ticket requirements
- **👥 Role-Based Access Control**: Different views and permissions for users, moderators, and admins
- **📧 Email Notifications**: Automated email notifications for ticket assignments and user registration
- **⚡ Workflow Automation**: Uses Inngest for reliable, event-driven workflow processing
- **📱 Responsive Design**: Modern, mobile-friendly interface built with React and Tailwind CSS

### Ticket Management
- Create and track support tickets
- AI-powered ticket prioritization
- Automatic skill extraction and matching
- Detailed ticket analytics and notes
- Status tracking and updates

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **Vite** - Fast build tool and development server

### Backend
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing
- **Nodemailer** - Email sending

### AI & Automation
- **Google Gemini AI** - Advanced language model for ticket analysis
- **Inngest** - Workflow automation and event processing
- **@inngest/agent-kit** - AI agent creation toolkit


## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/intelliflow.git
cd intelliflow
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_SERVER_URL=http://localhost:8000/api
```

### 4. Start the Application

#### Start Backend Server
```bash
cd Backend
npm run dev
npm run inngest-dev
```

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
```

## 🎯 Usage Guide

### Getting Started

1. **Register an Account**: Create a new user account through the signup page
2. **Login**: Use your credentials to access the system
3. **Create Tickets**: Submit support tickets with detailed descriptions
4. **AI Processing**: Watch as AI automatically analyzes and prioritizes your tickets
5. **Track Progress**: Monitor ticket status and updates

### User Roles & Permissions

#### 👤 User
- Create and submit support tickets
- View their own tickets and status
- Receive email notifications for ticket updates

#### 🛠 Moderator
- View all tickets in the system
- Get assigned tickets based on their skills
- Access detailed AI analysis and helpful notes
- Receive email notifications for new assignments

#### 👑 Admin
- Full system access and user management
- Assign roles and update user skills
- View comprehensive ticket analytics
- Manage system configuration

### Workflow Process

1. **Ticket Creation**: User submits a ticket with title and description
2. **AI Analysis**: Gemini AI analyzes the ticket to extract:
   - Priority level (low, medium, high)
   - Required technical skills
   - Helpful notes and resources
   - Summary of the issue
3. **Smart Assignment**: System finds the best moderator based on:
   - Required skills match
   - Current workload
   - Availability
4. **Notification**: Assigned moderator receives email notification
5. **Resolution**: Moderator works on the ticket with AI-provided insights

## 📁 Project Structure

```
intelliflow/
├── Backend/                    # Express.js backend
│   ├── controllers/           # Request handlers
│   │   ├── user.controller.js # User management logic
│   │   └── ticket.controller.js # Ticket management logic
│   ├── inngest/              # Workflow automation
│   │   ├── client.js         # Inngest client configuration
│   │   └── functions/        # Event-driven functions
│   │       ├── onSignUp.js   # User registration workflow
│   │       └── onTicketCreate.js # Ticket processing workflow
│   ├── middlewares/          # Custom middleware
│   │   └── auth.middleware.js # JWT authentication
│   ├── models/               # MongoDB schemas
│   │   ├── user.model.js     # User data model
│   │   └── ticket.model.js   # Ticket data model
│   ├── routes/               # API routes
│   │   ├── user.routes.js    # User-related endpoints
│   │   └── ticket.route.js   # Ticket-related endpoints
│   ├── utils/                # Helper functions
│   │   ├── ai.js            # AI integration utilities
│   │   └── mailer.js        # Email sending utilities
│   ├── .env                 # Environment variables
│   ├── package.json         # Backend dependencies
│   └── index.js             # Application entry point
│
├── frontend/                  # React frontend
│   ├── public/               # Static assets
│   │   └── vite.svg         # Vite logo
│   ├── src/
│   │   ├── assets/          # Images and static files
│   │   │   └── react.svg    # React logo
│   │   ├── components/      # Reusable components
│   │   │   ├── checkAuth.jsx # Authentication guard
│   │   │   └── navbar.jsx   # Navigation component
│   │   ├── pages/           # Page components
│   │   │   ├── login.jsx    # Login page
│   │   │   ├── signup.jsx   # Registration page
│   │   │   ├── tickets.jsx  # Ticket listing page
│   │   │   ├── ticket.jsx   # Ticket details page
│   │   │   └── admin.jsx    # Admin panel
│   │   ├── store/           # Redux store
│   │   │   ├── store.js     # Store configuration
│   │   │   └── authSlice.js # Authentication state
│   │   ├── App.jsx          # Main application component
│   │   ├── main.jsx         # Application entry point
│   │   ├── App.css          # Component styles
│   │   └── index.css        # Global styles
│   ├── .env                 # Environment variables
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── index.html           # HTML template
│
├── Backend_backup/           # Backup of backend code
└── README.md                # Project documentation
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Required
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key

# Email (choose one)
# Mailtrap (Development)
MAILTRAP_SMTP_HOST=smtp.mailtrap.io
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=your_mailtrap_user
MAILTRAP_SMTP_PASS=your_mailtrap_password

# Gmail (Production)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your_email@gmail.com
# SMTP_PASS=your_app_password
```

#### Frontend (.env)
```env
VITE_SERVER_URL=http://localhost:8000/api
```

## 🚧 Future Enhancements

### Technical Improvements
- [ ] **Caching**: Redis integration for improved performance
- [ ] **CI/CD**: Automated deployment pipeline
- [ ] **Monitoring**: Application performance monitoring
- [ ] **Documentation**: API documentation with Swagger
- [ ] **Docker**: Containerization for easy deployment


## 🙏 Acknowledgments

- **[Inngest](https://www.inngest.com/)** - For reliable workflow automation
- **[Google Gemini](https://ai.google.dev/)** - For powerful AI capabilities
- **[React](https://reactjs.org/)** - For the amazing frontend framework
- **[Express.js](https://expressjs.com/)** - For the robust backend framework
- **[MongoDB](https://www.mongodb.com/)** - For flexible data storage
- **[Tailwind CSS](https://tailwindcss.com/)** - For beautiful styling
- **[DaisyUI](https://daisyui.com/)** - For elegant UI components


---

**Made with ❤️ by the Pruthvi**
