# USC Website

First time contributing to a project? Check out our [contributing guide](CONTRIBUTING.md)!

## Development instructions

If you see code blocks as below, you are supposed to copy them line by line, and run it in a
terminal. To fire up a terminal,<kbd> Ctrl</kbd> + <kbd>Alt</kbd> +<kbd> T</kbd> usually does the job.

1. Install NodeJS and Yarn, as per the [contributing guide](CONTRIBUTING.md).
1. Check that you have NodeJS 10 and Yarn running. You can use

```bash
node --version
yarn --version
```

1. Clone the repo by and run `yarn`.

```bash
git clone https://github.com/usdevs/usc-website.git
cd usc-website
yarn # installs all dependencies
```

1. Create a Firestore database for your own use, using this
   [guide](https://firebase.google.com/docs/firestore/quickstart).
   You can use test mode and choose a location of your liking, preferably
   as close as possible to Singapore.
1. Find your Firestore API key using this
   [guide](https://support.google.com/firebase/answer/7015592),
   following the instructions for Web App.
1. Copy the `.env.example` file into `.env` at the root directory,

```bash
cp .env.example .env
```

Including in the appropriate API keys by using your favourite editor.

1. Run `yarn start` to start developing! You can now view the USC-Website that is run on your laptop
   locally at `localhost:8000`. Note that any changes to the UI and data will NOT affect the real USC Website
   so hack away!
