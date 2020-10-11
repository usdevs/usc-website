# USC Website

## Development instructions
1. Install nodeJS, npm and yarn
2. Clone the repo and run `yarn` to download `node_modules` folder
3. Copy the `env.example` file into `.env` at the root directory,
Including in the appropriate API keys. Obtain GCal from your own generation of an API key, and ask Admins for Firebase.
4. run `yarn start` to build the local development build, which is visible on localhost
5. run `yarn build` to prepare the production build

## Step-by-step setup guide

### Windows users
Install [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) and continue below.

### Dependencies
These are some basic development tools you'll need to get started on this project. If you can, do a quick 2 minute read up on what each of them does! It'll help make sense of the steps later on.

1. git
    - https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

2. NodeJS 10.x.x and npm
    - https://github.com/nvm-sh/nvm#installing-and-updating
    - `nvm install 10.13.0`

3. yarn
    - https://classic.yarnpkg.com/en/docs/install

### Fork and clone the repository
The first steps in the [fork and pull request workflow](https://gist.github.com/Chaser324/ce0505fbed06b947d962)!

1. Fork this repo!
    - Look for the "Fork" button on the top right
    - Click it!

2. Clone your fork of the repo to your local machine
    - replace "USERNAME" with your Github username and run:
    - `git clone https://github.com/USERNAME/usc-website.git`

### Set up the API keys
The USC website interacts with the USC Google Calendar and Firebase. These interactions require authentication through some *secret* API keys.

1. Copy the `env.example` file into `.env` in the `usc-website/` directory
    - `cp .env.example .env`

2. Google Calendar
    - Create a Google Project from [Google cloud console](https://console.cloud.google.com).
    - Enable the Google Calendar API from the [API library](https://console.cloud.google.com/projectselector2/apis/library)
    - Create credentials from [Google cloud console](https://console.cloud.google.com/apis/credentials)
    - Copy your freshly minted API key into the `.env` file!

3. Firebase
    - Ask admins nicely for an API key.
    - Copy the API key into the `.env` file!

### Development and build servers
For most part, you'll be testing the changes you make on a development server on your local machine (your laptop, PC, etc) and any changes you make will be reflected immediately.

1. Development
    - `yarn start`

2. Build
    - `yarn build`

## Resources for Getting Started Contributing
* look for good first issues
* [fork and pull request workflow](https://gist.github.com/Chaser324/ce0505fbed06b947d962)
* format of branches: `<name>/<describe-feature-added>`
* explore `index.js`, `data.js` and `Events.js` to familiarise yourself with the codebase
* understand [dependency management](https://yarnpkg.com/en/docs/version-control)
* read up on reactstrap [documentation](https://reactstrap.github.io/)
* read up on [file structuring in react](https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145)
* when everything goes wrong - https://ohshitgit.com
* [download more ram](https://downloadmoreram.com/)
