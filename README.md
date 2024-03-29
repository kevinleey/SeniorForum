# SeniorForum - a CS 495 Project

![image](https://github.com/kevinleey/SeniorForum/assets/55768372/26f36545-d110-4709-947d-f9ed0e7a6654)

### Collaborators: Jacob Aid, Caleb Burdette, Navamin Leelarburanathanakoon, Jade Cartolano

Seniors need a place to socialize with like-minded individuals, ask questions, or learn about events. App is to be used by seniors and possibly by caretakers as well.

Techstack: MERN (MongoDB, Express, ReactJS, NodeJS)

### Links:

- [Kanban board](https://trello.com/invite/b/hdwoN30o/ATTIdba27cd137d485b23d0aa044ce93184eCD0FE8D9/cs-495-kanban-board)
- [Pitch presentation](https://docs.google.com/presentation/d/1QS5a9HF5ync9hC1AEP0dQ1LnQmpf7cvBAOkL0lOAX88/edit#slide=id.g35f391192_029)
- [Brainstorming doc](https://docs.google.com/document/d/1zo7Y78hqRt5Y6DlvqzMewt8645pc6ixZ2LDVWqdc1c8/edit)
- [Figma mockups](https://www.figma.com/file/1MNb1uiDmYJ0lnBoh6EGTt/Figma-basics?type=design&node-id=601%3A10&mode=design&t=bobscEtjodvUaQMU-1)
- [Commit](https://www.conventionalcommits.org/en/v1.0.0/)/[Branch](https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534) naming conventions

## How to run (in a local dev environment)

### Prerequisites

#### Installation

- Install NodeJS.
- Clone the repo.
- Run `npm install` in the root directory as well as the `./client` folder.

#### Credentials

- You need to obtain a number (8) of credentials from the team (MongoDB, Auth0).
- Create a `.env` file in the root directory to store your credentials.
- After obtaining the credentials and relevant values, enter them in the `.env` in the following format separated by newlines:

  `<FIELD_NAME>: "<VALUE>"`, for example, `MONGODB_USERNAME: "myusername"`

#### Running the app

Server and client must be running simultaneously, for this you need two terminals running.

1. Server: In one terminal window, `cd` into the `/server` folder and run `npm start` to start the server.
2. Client: In another terminal window, `cd` into the `/client` folder and run `npm start` to start the client.
3. Visit `localhost:3000` to see the client in action.
