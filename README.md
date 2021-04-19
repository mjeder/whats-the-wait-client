# What's The Wait? | General Assembly: Capstone Project

*What's The Wait?* is a waitlist management system built for restaurants. It enables users to create waitlists that can be used to manage a busy Saturday night or keep a reservation list for a holiday that is coming up. 

More specifically a user can create a waitlist, view all waitlists that they own, view an individual waitlist with the guests on it, edit the name of the waitlist, and delete it. Once they create a waitlist they are able to add guests to it with information such as: name, guest count, phone number, time they were quoted, and any notes needed. As those guests are added to the waitlist they are kept in order of when they were added with additional information like the number they are on the list, timestamp of when they were added, and a running timer of how long they've been on the waitlist so a user can instantly compare that time to the time they quoted which will help them be proactive when it comes to any guest recovery issues. Additionally users can sit a guest, edit a guest, delete a guest, and _coming soon_ text a guest all from the view of the waitlist. 
___
## Important Links
- [Back End Repo](https://github.com/mjeder/whats-the-wait-api)
- Deployed Client - link coming soon due to technical difficulties
- [Deployed API](https://whats-the-wait-api.herokuapp.com/)
___
## Planning Story
I started off by writing user stories that would satisfy the requirements of the project and build a solid foundation for v1.0 of my application. Once I was able to document and decide on the user needs, I was able to start building out my wireframe and ERD to visualize how the application would look and operate. This lead to me creating a to-do list so I could stick to a daily schedule and ensure I would deliver my v1.0 by the deadline.
___
## Schedule
### Planning
- [X] Create User Stories
- [X] Create Wire Frames
- [X] Create ERD
- [x] 1:1 with Instructor
___
### Set Up
##### API
- [x] Create a Github Repository
- [x] Deploy to Heroku

##### Client
- [x] Create a Github Repository
- [x] Deploy React app to Github Pages
___
### Development
#### API
- [x] Create WAITLIST resource and end points
- [x] Test end points with curl scripts
- [x] Add the relationship to a User
- [x] Add User ownership to resource controller
- [x] Create GUEST resource and end points
- [x] Test end points with curl scripts
- [x] Add the relationship to a User
- [x] Add User ownership to resource controller

#### Client
- [x] Sign Up (curl then web app)
- [x] Sign In (curl then web app)
- [x] Change Password (curl then web app)
- [x] Sign Out (curl then web page)
- [x] All API calls have success or failure messages
- [x] Create WAITLIST resource (curl then web app)
- [x] Get all of WAITLIST resources (curl then web app)
- [x] Get one of WAITLIST resources (curl then web app)
- [x] Delete single WAITLIST resource (curl then web app)
- [x] Update single WAITLIST resource (curl then web app)
- [x] Create GUEST resource (curl then web app)
- [ ] Delete single GUEST resource (curl then web app)
- [ ] Update single GUEST resource (curl then web app)

#### Final Touches
- [x] README
- [ ] Troubleshoot/Debug
- [ ] Style
___
## User Stories
Auth
- As an unregistered user, I would like to sign up for an account. (C)
- As a registered user, I would like to sign into my account. (C)
- As a signed in user, I would like to change my password. (U)
- As a signed in user, I would like to sign out of my account. (D)

Waitlist Management
- As a signed in user, I would like to create a Waitlist. (C)
- As a signed in user, I would like to see all of my created Waitlists. (R)
- As a signed in user, I would like to see an individual Waitlist with all guests that belong to that waitlist. (R)
- As a signed in user, I would like to edit my Waitlists. (U)
- As a signed in user, I would like to delete my Waitlists. (D)

Guest Management
- As a signed in user, I would like to create a guest to add to my waitlist. (C)
- As a signed in user, I would like to edit my guests. (U)
- As a signed in user, I would like to delete my guests. (D)
___
## Technologies Used
- React
- CSS
- Bootstrap
- JavaScript
- Node.js
- Express
- MongoDB
- Mongoose
- Heroku
- Ajax (Axios)
___
## Unsolved Problems
- [ ] Currently I am unable to deploy my application on GH pages. Working on fixing that ASAP.
- [ ] Creating a guest throws an error but still adds the guest to a waitlist on the server side.
- [ ] Unable to delete a guest.
- [ ] Unable to edit a guest.
- [ ] Unable to seat a guest.
___
## Would like to eventually:
- [ ] Responsive design for better UX on phone/tablet.
- [ ] Seated list to keep track of guests that were sat OR accidentally sat so they can be put back on waitlist.
- [ ] Statistics such as: total number of guests on the waitlist and current average wait for top 5 guests.
- [ ] Texting feature to tell a guest their table is ready. (Possibly two-way)
- [ ] Floor plan builder so guests can be placed directly at tables for a better UX for host/hostess to keep track of what tables are open.

___
## Wireframe:
GitHub and Imgur will not allow me to upload a photo of my wireframe. Working on other options ASAP.
