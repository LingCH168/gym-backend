import { Router } from "express";
import { validate } from "../middleware/validator.js";
import auth from "../middleware/auth.js";
import {
  createClass,
  getAll,
  getByID,
  getByActivityID,
  update,
  deleteByID
} from "../models/classes.js";

const classesController = Router();
const createClassSchema = {
  type: "object",
  required: [
    "class_date",
    "class_time",
    "class_room_id",
    "class_activity_id",
    "class_trainer_user_id",
  ],
  properties: {
    class_date: { type: "string" },
    class_time: { type: "string" },
    class_room_id: { type: "string" },
    class_activity_id: { type: "string" },
    class_trainer_user_id: { type: "string" },
  },
};

classesController.post(
  "/class",
  [auth(["admin", "trainer"]),
  validate({ body: createClassSchema }),
  ],
  (req, res) => {
    // #swagger.summary = 'Create a class';
    /*
    #swagger.requestBody= {
                description: "Adding new class",
                content:{
                    'application/json':{
                      schema:{
                            class_date_time:"string",
                            class_room_id:"number",
                            class_activity_id:"number",
                            class_trainer_user_id:"number",
                            },
                      example:{
                            class_date_time:"2023/10/20",
                            class_room_id:110,
                            class_activity_id:1,
                            class_trainer_user_id:1
                            }
                    }       
                }
    }
    */
    // console.log("Unmodded", req.body)
    const currentDate = new Date(req.body.class_date);
    // const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const currentTime = new Date(req.body.class_time);
    // const currentTime = new Date();

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const mysqlDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const mysqlTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    // req.body.class_date = mysqlDate
    // req.body.class_time = mysqlTime

    const data = req.body;
    // console.log("Modded", data)
    createClass(data)
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: "Created class",
          result: result.affectedRows
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).json({
          status: 500,
          message: "Failed to create class",
        });
      });
  }
);

classesController.get(
  "/class",
  [auth(["admin", "trainer"])],
  (req, res) => {
    //#swagger.summary = 'Get all class'

    getAll()
      .then((data) => {
        res.json({
          status: 200,
          message: "Get all classes",
          classes: data,
        });
      })
      .catch((error) => {
        res.json({
          status: 500,
          message: "Failed to get all classes",
        });
      });
  });

const getClassByIDSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
};

classesController.get(
  "/class/:id",
  [auth(["admin", "trainer","member"]),
  validate({ params: getClassByIDSchema }),
  ],

  (req, res) => {
    //   #swagger.summary = 'Get a specific class by ID'

    const classID = req.params.id;
    getByID(classID)
      .then((data) => {
        res.status(200).json({
          status: 200,
          message: "Get class by ID",
          class: data,
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).json({
          status: 500,
          message: "Failed to get class by ID",
        });
      });
  }
);

const getClassByActivityIDSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
};

classesController.get(
  "/class/activity/:id",
  [
    // auth(["admin", "trainer","user"]),
  validate({ params: getClassByActivityIDSchema }),
  ],

  (req, res) => {
    //   #swagger.summary = 'Get a specific class by ID'

    const classActivityID = req.params.id;
    getByActivityID(classActivityID)
      .then((data) => {
        // console.log("999",data);
        
        res.status(200).json({
          status: 200,
          message: "Get class by ID",
          class: data,
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).json({
          status: 500,
          message: "Failed to get class by ID",
        });
      });
  }
);


const updateClassSchema = {
  type: "object",
  required: [
    "class_id",
    "class_date",
    "class_time",
    "class_room_id",
    "class_activity_id",
    "class_trainer_user_id",
  ],
  properties: {
    class_id: { type: "number" },
    class_date: { type: "string" },
    class_time: { type: "string" },
    class_room_id: { type: "string" },
    class_activity_id: { type: "string" },
    class_trainer_user_id: { type: "string" },
  },
};

classesController.put(
  "/class",
  [
    auth(["admin", "trainer"]),
     validate({ body: updateClassSchema})],
  (req, res) => {
    // #swagger.summary = 'Update an existing class';
    /*
    #swagger.requestBody= {
                description: "Update an existing class",
                content:{
                    'application/json':{
                      schema:{
                            class_date_time:"string",
                            class_room_id:"number",
                            class_activity_id:"number",
                            class_trainer_user_id:"number",
                            class_id:"number"
                            },
                      example:{
                            class_date_time:"2023/10/20",
                            class_room_id:110,
                            class_activity_id:1,
                            class_trainer_user_id:1,
                            class_id:1
                            }
                    }       
                    }       
                }
    }
    */
    const currentDate = new Date(req.body.class_date);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    // const currentTime = new Date(class_time);
    // const hours = currentTime.getHours();
    // const minutes = currentTime.getMinutes();
    // const seconds = currentTime.getSeconds();
    const mysqlDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    // const mysqlTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    req.body.class_date = mysqlDate
    // req.body.class_time = mysqlTime
    //  console.log(req.body.class_date + "999")
    // delete req.body.booking_created_date
    const data = req.body;
    // console.log(data + "444")
    update(data)
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: "Updated class",
          modifiedCount: result.modifiedCount,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "Failed tp update class",
        });
      });
  }
);

const deleteClassByIDSchema = {
  type: "object",
  required: ["class_id"],
  properties: {
    booking_id: { type: "number" },
  },
};

classesController.delete(
  "/class",
  [auth(["admin", "trainer"]), validate({ body: deleteClassByIDSchema})],

  (req, res) => {
    // #swagger.summary = 'Delete a specific class by ID'
    /*
    #swagger.requestBody= {
    description: "Deleting a class",
        content:{
            'application/json':{
                schema:{
                    class_id: 'number',
                },
                example:{

                    class_id:'1',
                }
            }
        }
    }
    */
    const classID = req.body.class_id;
    // console.log(classID);
    deleteByID(classID)
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: "Delete class by ID",
          deletedCount: result.deletedCount,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "Failed to delete class by ID",
        });
      });
  }
);

export default classesController;

