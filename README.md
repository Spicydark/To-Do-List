# To-Do List Application

A full-stack To-Do List application built with Spring Boot (backend) and vanilla JavaScript (frontend). This application allows users to manage their tasks with features like creating, searching, updating status, and deleting tasks.

## 🚀 Features

- ✅ **Create Tasks**: Add new tasks with title, description, status, and due date
- 🔍 **Search Tasks**: Search tasks by title, description, status, or ID
- ✏️ **Mark as Done**: Update task status to "Done" based on search criteria
- 🗑️ **Delete Tasks**: Remove tasks based on search criteria
- 📋 **View All Tasks**: Display all tasks in a clean, responsive table
- 🎨 **Modern UI**: Beautiful interface built with Tailwind CSS
- 🔄 **Real-time Updates**: Automatic task list refresh after operations
- ⚡ **RESTful API**: Well-structured REST endpoints for all operations

## 🛠️ Technology Stack

### Backend
- **Java 21**
- **Spring Boot 3.4.3**
- **Spring Data JPA** - Database operations
- **Spring Web** - REST API
- **MySQL** - Database
- **Lombok** - Reduce boilerplate code
- **Maven** - Dependency management

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Tailwind CSS** - Styling framework

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Java Development Kit (JDK) 21** or higher
- **Maven 3.6+**
- **MySQL 8.0+**
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Spicydark/To-Do-List.git
cd To-Do-List
```

### 2. Database Setup

1. **Install MySQL** if not already installed

2. **Create the database**:
   ```sql
   CREATE DATABASE task_db;
   ```

3. **Configure database credentials**:
   - Open `src/main/resources/application.properties`
   - Update the following properties with your MySQL credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/task_db
     spring.datasource.username=YOUR_USERNAME
     spring.datasource.password=YOUR_PASSWORD
     ```

### 3. Backend Setup

1. **Navigate to the project root directory**

2. **Build the project**:
   ```bash
   ./mvnw clean install
   ```
   or on Windows:
   ```bash
   mvnw.cmd clean install
   ```

3. **Run the Spring Boot application**:
   ```bash
   ./mvnw spring-boot:run
   ```
   or on Windows:
   ```bash
   mvnw.cmd spring-boot:run
   ```

   The backend server will start on `http://localhost:8080`

### 4. Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd "Simple To-Do List Frontend"
   ```

2. **Open `index.html` in your web browser**, or use a local development server:
   
   Using Python:
   ```bash
   python -m http.server 3000
   ```
   
   Using Node.js:
   ```bash
   npx http-server -p 3000
   ```

3. **Access the application** at `http://localhost:3000` (or open `index.html` directly)

## 📡 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Endpoints

#### 1. Get All Tasks
- **Method**: GET
- **URL**: `/tasks`
- **Response**: Array of Task objects

#### 2. Add New Task
- **Method**: POST
- **URL**: `/tasks`
- **Request Body**:
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "Pending",
    "dueDate": "2025-12-31"
  }
  ```
- **Response**: Created Task object

#### 3. Search Tasks
- **Method**: POST
- **URL**: `/search`
- **Request Body** (all fields optional):
  ```json
  {
    "id": 1,
    "title": "Task Title",
    "description": "Description",
    "status": "Pending"
  }
  ```
- **Response**: Array of matching Task objects

#### 4. Mark Tasks as Done
- **Method**: PATCH
- **URL**: `/tasks/done`
- **Request Body**: Same as Search Tasks
- **Response**: Array of updated Task objects

#### 5. Delete Tasks
- **Method**: DELETE
- **URL**: `/tasks/delete`
- **Request Body**: Same as Search Tasks
- **Response**: Success message with count of deleted tasks

### Task Object Structure
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive README",
  "status": "Pending",
  "dueDate": "2025-11-15"
}
```

## 🎯 Usage Guide

### Adding a Task
1. Fill in the "Add New Task" form with task details
2. Select a status (Pending or Done)
3. Optionally add a due date
4. Click "Add Task"

### Searching Tasks
1. Enter search criteria in the "Task Actions" section
2. Leave fields empty to match all tasks
3. Click "Search Tasks"

### Marking Tasks as Done
1. Enter criteria to identify tasks (title, description, status, or ID)
2. Click "Mark as Done"
3. All matching tasks will be updated to "Done" status

### Deleting Tasks
1. Enter criteria to identify tasks to delete
2. Click "Delete Tasks"
3. Confirm the deletion in the popup dialog

## 📁 Project Structure

```
To-Do-List/
├── src/
│   ├── main/
│   │   ├── java/com/example/To_Do_List/
│   │   │   ├── Controller/
│   │   │   │   └── TaskController.java       # REST API endpoints
│   │   │   ├── DTO/
│   │   │   │   └── TaskSearchRequest.java    # Data Transfer Object
│   │   │   ├── Model/
│   │   │   │   └── Task.java                 # Task entity
│   │   │   ├── Repository/
│   │   │   │   └── TaskRepo.java             # Database interface
│   │   │   ├── Service/
│   │   │   │   └── TaskService.java          # Business logic
│   │   │   ├── Specification/
│   │   │   │   └── TaskSpecification.java    # Dynamic query builder
│   │   │   └── ToDoListApplication.java      # Main application class
│   │   └── resources/
│   │       └── application.properties         # Configuration
│   └── test/                                  # Test files
├── Simple To-Do List Frontend/
│   ├── index.html                             # Main HTML file
│   ├── style.css                              # Custom styles
│   └── app.js                                 # Frontend JavaScript
├── pom.xml                                    # Maven configuration
└── README.md                                  # This file
```

## 🔍 Key Features Explained

### Dynamic Search with JPA Specifications
The application uses Spring Data JPA Specifications for flexible, dynamic queries. This allows searching by any combination of fields without writing multiple query methods.

### CORS Configuration
Cross-Origin Resource Sharing (CORS) is enabled to allow the frontend to communicate with the backend when running on different ports.

### Automatic Table Creation
The application uses Hibernate's `ddl-auto=update` setting to automatically create and update the database schema based on entity definitions.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "Add some feature"
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/YourFeatureName
   ```
5. **Open a Pull Request**

## 🐛 Troubleshooting

### Common Issues

**Problem**: Backend fails to start with database connection error
- **Solution**: Ensure MySQL is running and credentials in `application.properties` are correct

**Problem**: Frontend shows "Failed to load tasks"
- **Solution**: Verify backend is running on `http://localhost:8080`

**Problem**: CORS errors in browser console
- **Solution**: Ensure `@CrossOrigin` annotation is present in `TaskController.java`

**Problem**: Tasks not displaying
- **Solution**: Check browser console for errors and verify API endpoint URLs

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Spicydark**
- GitHub: [@Spicydark](https://github.com/Spicydark)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- Tailwind CSS for the beautiful styling utilities
- The open-source community for inspiration and support

---

**Note**: This is a demo project for learning purposes. For production use, consider adding authentication, input validation, error handling, and security features.
