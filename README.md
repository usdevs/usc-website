# USC Website

First time contributing to a project? Check out our [contributing guide](CONTRIBUTING.md)!

## Development instructions

1. Install node and yarn
1. Clone the repo and run `yarn`
1. Create a Firestore database for your own use, using this
   [guide](https://firebase.google.com/docs/firestore/quickstart).
   You can use test mode and choose a location of your liking, preferably
   as close as possible to Singapore.
1. Find your Firestore API key using this
   [guide](https://support.google.com/firebase/answer/7015592),
   following the instructions for Web App.
1. Copy the `env.example` file into `.env` at the root directory,
   Including in the appropriate API keys.
1. Run `yarn start` to start developing.
