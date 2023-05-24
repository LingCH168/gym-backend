import { Router } from "express";
import xml2js from "xml2js"
import auth from "../middleware/auth.js";
import { validate } from "../middleware/validator.js";
import {
  createActivity,
  getAll,
  getByID,
  update,
  deleteByID
} from "../models/activities.js";

const activitiesController = Router();

activitiesController.post("/activity/upload/xml", (req, res) => {
  if (req.files && req.files["xml-file"]) {
    // Access the XML file as a string
    const XMLFile = req.files["xml-file"]
    const file_text = XMLFile.data.toString()

    // Set up XML parser
    const parser = new xml2js.Parser();
    parser.parseStringPromise(file_text)
      .then(data => {
        const activityUpload = data["activity-upload"]
        const activityUploadAttributes = activityUpload["$"]
        const operation = activityUploadAttributes["operation"]
        // Slightly painful indexing to reach nested children
        const activityData = activityUpload["activities"][0].activity

        if (operation == "insert") {
          Promise.all(activityData.map((activityData) => {
            // Convert the xml object into a model object
            const activities = {
              activity_name: activityData.activity_name.toString(),
              activity_description: activityData.activity_description.toString(),
              activity_duration: activityData.activity_duration.toString()
            }
            // Return the promise of each creation query
            return createActivity(activities)
          })).then(results => {
            res.status(200).json({
              status: 200,
              message: "XML Upload insert successful",
            })
          }).catch(error => {
            res.status(500).json({
              status: 500,
              message: "XML upload failed on database operation - " + error,
            })
          })
        } else if (operation == "update") {
          Promise.all(activityData.map((activityData) => {
            // Convert the xml object into a model object
            const activity = {
              activity_id: activityData.activity_id.toString(),
              activity_name: activityData.activity_name.toString(),
              activity_description: activityData.activity_description.toString(),
              activity_duration: activityData.activity_duration.toString()
            }
            // Return the promise of each creation query
            return update(activity)
          })).then(results => {
            res.status(200).json({
              status: 200,
              message: "XML Upload update successful",
            })
          }).catch(error => {
            res.status(500).json({
              status: 500,
              message: "XML upload failed on database operation - " + error,
            })
          })

        } else {
          res.status(400).json({
            status: 400,
            message: "XML Contains invalid operation element value",
          })
        }
      })
      .catch(error => {
        res.status(500).json({
          status: 500,
          message: "Error parsing XML - " + error,
        })
      })
  } else {
    res.status(400).json({
      status: 400,
      message: "No file selected",
    })
  }
})


const createActivitySchema = {
  type: "object",
  required: [

    "activity_name",
    "activity_description",
    "activity_duration",
  ],
  properties: {

    activity_name: { type: "string" },
    activity_description: { type: "string" },
    activity_duration: { type: "string" },
  },
};

activitiesController.post(
  "/activity",
  [auth(["admin", "trainer"]),
  validate({ body: createActivitySchema }),
  ],
  (req, res) => {
    // #swagger.summary = 'Create an activity';
    /*
    #swagger.requestBody= {
                description: "Adding new booking",
                content:{
                    'application/json':{
                      schema:{
                            activity_name:"string",
                            activity_description:"number",
                            activity_duration:"string",
                            },
                      example:{
                            activity_name:"Yoga",
                            activity_description:"Yoga is a physical, mental, and spiritual practice",
                            activity_duration:"30 minutes",
                            }
                    }       
                }
    }
    */
    const data = req.body;

    createActivity(data)
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: "Created activity",
          result: result.affectedRows
        });
      })
      .catch((error) => {
        res.status(500).json({
          data: data,
          status: 500,
          message: "Failed to create activity",
        });
      });
  }
);

activitiesController.get(
  "/activity",
  // [auth(["admin", "trainer"])],
  (req, res) => {
    //#swagger.summary = 'Get all activity'

    getAll()
      .then((data) => {
        res.json({
          status: 200,
          message: "Get all activity",
          activities: data,
        });
      })
      .catch((error) => {
        res.json({
          status: 500,
          message: "Failed to get all activity",
        });
      });
  });

const getActivityByIDSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
};

activitiesController.get(
  "/activity/:id",
  [
    auth(["admin", "trainer", "member"]),
    validate({ params: getActivityByIDSchema }),
  ],

  (req, res) => {
    //   #swagger.summary = 'Get a specific activity by ID'

    const activityID = req.params.id;
    // console.log("666",activityID)
    getByID(activityID)
      .then((data) => {
        // console.log("333",data)
        res.status(200).json({
          status: 200,
          message: "Get activity by ID",
          activity: data,
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).json({
          status: 500,
          message: "Failed to get activity by ID",
        });
      });
  }
);

const updateActivitySchema = {
  type: "object",
  required: [
    "activity_id",
    "activity_name",
    "activity_description",
    "activity_duration",
  ],
  properties: {
    activity_id: { type: "number" },
    activity_name: { type: "string" },
    activity_description: { type: "string" },
    activity_duration: { type: "string" },
  },
};

activitiesController.put(
  "/activity",
  [auth(["admin", "trainer"]), validate({ body: updateActivitySchema })],
  (req, res) => {
    // #swagger.summary = 'Update an existing activity';
    /*
    #swagger.requestBody= {
                description: "Update an existing activity",
                content:{
                    'application/json':{
                      schema:{
                        activity_name:"string",
                        activity_description:"string",
                        activity_duration:"string",
                        activity_id:"number"
                            },
                      example:{
                        activity_name:"Yogaga",
                        activity_description:"Yoga is a physical, mental, and spiritual practice",
                        activity_duration:"30 minutes",
                        activity_id:1
                            }
                    }       
                    }       
                }
    }
    */
    const data = req.body;
    update(data)
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: "Updated activity",
          modifiedCount: result.modifiedCount,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "Failed tp update activity",
        });
      });
  }
);

const deleteActivityByIDSchema = {
  type: "object",
  required: ["activity_id"],
  properties: {
    activity_id: { type: "number" },
  },
};

activitiesController.delete(
  "/activity",
  [auth(["admin", "trainer"]), validate({ body: deleteActivityByIDSchema })],
  (req, res) => {
    // #swagger.summary = 'Delete a specific activity by ID'
    /*
    #swagger.requestBody= {
    description: "Deleting a activity",
        content:{
            'application/json':{
                schema:{
                    activity_id: 'number',
                },
                example:{

                    activity_id:'1',
                }
            }
        }
    }
    */
    const activityID = req.body.activity_id;
    deleteByID(activityID)
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: "Delete activity by ID",
          deletedCount: result.deletedCount,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "Failed to delete activity by ID",
        });
      });
  }
);


export default activitiesController;




