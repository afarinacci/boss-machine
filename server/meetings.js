const express = require('express');
const meetingsRouter = express.Router();

// require db functions
const {
  createMeeting,
  addToDatabase,
  getAllFromDatabase,
  deleteAllFromDatabase,
} = require('./db');

// modelType = 'meetings'
// createMeeting()
// addToDatabase(modelType, instance)
// getAllFromDatabase(modelType)
// deleteAllFromDatabase(modelType)

// GET /api/meetings to get an array of all meetings.
meetingsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('meetings'));
});

// POST /api/meetings to create a new meeting and save it to the database.
// For /api/meetings POST route, no request body is necessary, as meetings are generated
// automatically by the server upon request. Use the provided createMeeting function
// exported from db.js to create a new meeting object.
meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = addToDatabase('meetings', createMeeting());
  res.status(201).send(newMeeting);
});

// DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete('/', (req, res, next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
});

module.exports = meetingsRouter;
