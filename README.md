# Interview Scheduler

Interview scheduler is a client-side, single-page app made by React that can show the user's interview schedules. Users can also add, delete, and modify interview schedules as they need.

Through building this app, I practiced my skill of building front end by React, my interacting with data base and back-end server skills, and writing various types of test abilities (including Unit Test, Integration Test by Jest, and End to End Test by Cypress).


## Screenshots

!["the defult page when the app firstly loaded"](https://github.com/Tank-Sun/scheduler/blob/master/docs/default-page.png?raw=true)
!["the creat appointment form"](https://github.com/Tank-Sun/scheduler/blob/master/docs/add-appointment.png?raw=true)
!["the confirmation page before the appointment is deleted"](https://github.com/Tank-Sun/scheduler/blob/master/docs/delete-appointment.png?raw=true)
!["the page showing after adding and deleting appointments, the remaing number of spots changes accordingly"](https://github.com/Tank-Sun/scheduler/blob/master/docs/after-add&delete-page.png?raw=true)


## Setup

Install dependencies with `npm install`

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

- react
- axios
- classnames
- @testing-library/react
- cypress