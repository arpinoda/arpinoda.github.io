const path = require('path');
const fs = require('fs');
const exjwt = require('express-jwt');
const util = require('./util');

/**
 * Authenticated routes used within development and production
 * @param {app} arg The instantiated express application
 * @param {express} arg The required express library
 * @param {logger} arg The logging library
*/
module.exports = (app, express, logger) => {
  // Apply JWT middleware
  const { API_PATH } = process.env;
  const jwtMW = exjwt({
    secret: process.env.JWT_SECRET,
  });
  app.use(jwtMW);

  // Read and parse local json into memory
  var projectDetails = '';
  try {
    const detailsRaw = fs.readFileSync(
      path.join(__dirname, '/../client/src/data/projectDetail.json')
    );

    projectDetails = JSON.parse(detailsRaw);

  } catch (error) {
    logger.error(`Error: projectDetail.json.\nStack: ${error.stack}`);
  }
  
  /**
   * USE /project
   * Returns all projects within static json file
  */
  app.use(
    `${API_PATH}/project`,
    express.static(path.join(__dirname, '/../client/src/data', 'project.json')),
  );

  /**
   * USE /category
   * Returns all categories within static json file
  */
  app.use(
    `${API_PATH}/category`,
    express.static(path.join(__dirname, '/../client/src/data', 'category.json')),
  );

  /**
   * USE /image
   * Returns a protected, static image matching requested filename
  */
  app.use(
    `${API_PATH}/image`,
    express.static(path.join(__dirname, '/../client/src/static/images/protected')),
  );

  /**
   * GET /project/:id
   * Returns project details for one specific project ID
  */
  app.get(`${API_PATH}/project/:id`, (req, res) => {
    const { id } = req.params;

    if (!util.isInt(id)) {
      return res.sendStatus(400);
    }

    const projectID = parseInt(id, 10);
    const project = projectDetails.find(x => x.projectID === projectID);

    if (!project) {
      return res.sendStatus(404);
    }

    const { media } = project;
    return res.json(media);
  });
};
