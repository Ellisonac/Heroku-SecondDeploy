const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  
  return readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)))

});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {

  const { errors, isValid } = req.body;

  if ( !isValid ) {
    const newDiagnostics = {
      time: Date.now(), 
      errors,
      error_id: uuidv4(), 
    }
  
    readAndAppend(newDiagnostics,'./db/diagnostics.json');

    const response = {
      status: 'success',
      body: newDiagnostics,
    }

    res.json(response)
  
  } else {
    res.json("error posting diagnostics");
  }

  
});

module.exports = diagnostics;
