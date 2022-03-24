const { google } = require("googleapis");

const credentials = require('./key.json');
// Create an authorized client for Home Graph
const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ['https://www.googleapis.com/auth/homegraph']
});
const homegraph = google.homegraph({
  version: 'v1',
  auth: auth,
});

console.log(homegraph);

sync(homegraph, "USERID");

query(homegraph, "USERID", "DEVICE_ID")

// Gets all the devices associated with the given third-party user.
async function sync(homegraph: any, userId: string) {
  const request = {
    requestBody: {
      agentUserId: userId,
    }
  };
  return await homegraph.devices.sync(request);
}

// Gets the current states in Home Graph for the given set of the third-party user's devices.
async function query(homegraph: any, userId: string, deviceId: string) {
  const request = {
    requestBody: {
      agentUserId: userId,
      inputs: [{
        payload: {
          devices: [{
            id: deviceId
          }]
        }
      }]
    }
  };
  return await homegraph.devices.query(request);
}