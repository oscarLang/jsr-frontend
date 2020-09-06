import React from "react";
import Markdown from 'markdown-to-jsx';

let md = `## Available Scripts
In the project directory, you can run:

### \`npm install\`
Install all the dependencies of the project.

### \`npm start\`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### \`npm build\`

Builds the app for production to the \`build\` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!
`;

function Week1() {
  return (
      <Markdown children={md} />
  );
}
export default Week1;