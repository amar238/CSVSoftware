# Candidates & Interview Management WebApp

## Description
This web app is an all-inclusive platform for managing various aspects of a training or educational initiative. Features for managing users, batches, student information, course score monitoring, interviewing, and result analysis are all included. Furthermore, the feature of the CSV downloader improves reporting and data accessibility.

## Project Structure
- CSVSoftware/
  - assets/                 (directory containing static files like CSS, JS for separate modules)
    - css/.
    - js/.
  - config/                 (middleware for MongoDB connectivity and Passport authentication strategy).
  - controllers/            (controller logic for all components mentioned below).
  - models/                 (directory containing data models for respective components)
  - routes/                 (route definitions for respective components)
  - views/                  (directory containing all templates)
  - customFunctions.js        (custom library for functions to access globally)
  - .gitignore              (file specifying which files/folders to ignore in git)
  - package.json            (file containing metadata and dependencies)
  - README.md               (file containing project documentation)
  - app.js                  (entry point file where the server is initialized)

## Installation
- Clone the repository: `git clone https://github.com/amar238/CSVSoftware.git`
- Install dependencies: `npm install`
- Replace your local mongodb address in 'config/mongoose.js' file

## Usage
- Run the application: `node app.js`
- Open your web browser and navigate to `http://localhost:8000`

## Components
- Employee SignUp/SignIn: For employees who will be able to utilize the system
- Batches: CRUD operations for batches composed of year and month
- Student: CRUD for student's personal information
- Course Scores: CRUD student's course scores for DSA, Web Development and React
- Interviews: Add an interview, including the company name, job title, and interview date. Additionally, select applicants from the list of qualified students.
- Results: Present the candidates' results from the interview. Input the results of the candidates whos results are pending.
- CSV Downloader: Display student records with information on the student, the college, the batch, the course scores, and the interview data (company name, position, date, and result). Download the same data in csv file format.  

## Contact
For questions or support, please contact me at amargurav238@gmail.com
