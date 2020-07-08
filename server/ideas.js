const express = require('express');
const ideasRouter = express.Router();

// require db functions
const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

// modelType = 'ideas'
// addToDatabase(modelType, instance)
// getAllFromDatabase(modelType)
// getFromDatabaseById(modelType, id)
// updateInstanceInDatabase(modelType, instance)
// deleteFromDatabasebyId(modelType, id)

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// check minionID, and attach it to the req object in subsequent middleware that is run.
ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});

// POST /api/ideas to create a new idea and save it to the database.
// Note: POST request bodies will not have an id property, you will have
// to set it based on the next id in sequence.
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const receivedIdea = addToDatabase('ideas', req.body);
  res.status(201).send(receivedIdea);
});

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
});

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  let updatedIdeaInstance = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdeaInstance);
});

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
  const deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deletedIdea) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});

module.exports = ideasRouter;
