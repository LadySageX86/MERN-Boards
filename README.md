# MERN-Boards
## Developed by Spencer W. Smith (spencerwayne310@gmail.com)

A simple imageboard built using the MERN stack, originally developed as a new curriculum for RP4K. This project does have a few issues that need to be fixed at some point when I have more time to come back to it, but is about 90% complete overall.

## How to use

- Clone the git repository to your local system. 
- Navigate to the client folder and run `npm install package.json` to install the dependencies for the client side, then navigate to the server folder and do the same thing. 
- On the server side, set the `ATLAS_URI` environment variable in `config.env` to your own Atlas URI to connect to MongoDB.
- Run the client using `npm start` in the client folder.
- Run the server using `node server.js` in the server folder.
