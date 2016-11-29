# starter-template

## Setup

### Clone and NPM Install

Replace `<project name>` with whatever want to call your project

``` bash
git clone https://github.com/cklanac/starter-template.git <project name>
cd <project name>
npm install
```

### Build and Dev

Build: run a single build

``` bash
npm run build
```

Watch: watches directory and automatically rebuilds

``` bash
npm run watch
```

Serve: starts node server on port 3000

``` bash
npm run serve
```

Dev: runs watch and serve simultaneously

``` bash
npm run dev
```

## Goals and Steps

### Goal 1:  Walking Skeleton Node/Express + React/Redux/Thunk

Create express app to serve an item

-   Clone To-Do starter from organization
-   Create team branch
-   Create basic express app
-   Add GET route ‘/api/hello’ that serves a ‘hello world’ message
-   Test using Postman.

Create React/Redux/Thunk app to display item from server

-   Creates a React app that display 'dummy data'
-   Install React libraries
-   Create component
-   Add Redux to the mix and update the display
-   Add Thunk to the app and connect to server

### Goal 2: Add feature to display List of tasks

Update express app to serve a list of tasks

-   Updated express to serve list of Tasks (in-memory data)
-   Change ‘hello world’ object to a ‘todo’ object (id and title),
-   Create a list (array) of ‘task’ objects
-   Add route to return list of tasks
-   Test with Postman

Update React app to retrieve and display list of Tasks

-   Fetch list of tasks
-   Update Redux app to display list of ‘tasks’

### Goal 3: Add feature to create new Tasks

-   Create input box and respond to submit event
-   Capture text and post to server (clear input)
-   Server capture POST request and add item to array
-   Server responds with success (200) or failure (400 or 500)
-   React app handles the response and updates the list with new item
-   Challenge: Generate new ID for new Task.

### Goal 4: Add feature to update title of a task

-   Create a PUT route with ID and title param
-   Update correct task item with new title
-   Test with all PUT and GET routes with Postman
-   Update React app to handle title change,
-   Use Thunk to PUT changes to the server
-   Handle success or failure results and update display

### Goal 5: Add new feature to track 'completed' status of tasks

-   Update the data model on server, add 'completed : true|false'
-   Update route to accept 'completed' status.
-   Test all routes with Postman
-   Update display to show current completed status
-   Update display to handle status change event
-   Send new completed state to server and update the correct item
-   Ensure the display reflects the current state

### Goal 6: Add new feature to delete tasks

-   Update DELETE route which accepts an ID to delete
-   Test routes with Postman
-   Add  display feature to delete an item
-   Update display to handle click event
-   Send DELETE request to the server
-   Ensure the display is reflects the deleted event

### Goal 7: (Client side update): Add new features filter completed tasks

-   Create 3 states: 'show open tasks', 'show closed tasks', 'show all'
-   Update React to filter tasks and update display
-   Ensure new, completed-toggle and delete functionality still works

### Goal 8: (Server side update): Add Persistence with MongoDB

-   Install Mongo and Mongoose
-   Update in-memory data model and CRUD tasks to use mongo
