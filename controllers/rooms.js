import { Router } from "express";
import xml2js from "xml2js"
import auth from "../middleware/auth.js";
import { validate } from "../middleware/validator.js";
import {
  createRoom,
  getAll,
  getByID,
  update,
  deleteByID
} from "../models/rooms.js";

const roomsController = Router();

roomsController.post("/room/upload/xml", (req, res) => {
  if (req.files && req.files["xml-file"]) {
    // Access the XML file as a string
    const XMLFile = req.files["xml-file"]
    const file_text = XMLFile.data.toString()
  // console.log(file_text);
    // Set up XML parser
    const parser = new xml2js.Parser();
    parser.parseStringPromise(file_text)
      .then(data => {
        // console.log(data);
        const roomUpload = data["room-upload"]
        const roomUploadAttributes = roomUpload["$"]
        const operation = roomUploadAttributes["operation"]
        // Slightly painful indexing to reach nested children
        const roomsData = roomUpload["rooms"][0].room

        if (operation == "insert") {
          Promise.all(roomsData.map((roomData) => {
            // Convert the xml object into a model object
            const rooms = {
              room_location: roomData.room_location.toString(),
              room_number: roomData.room_number.toString()
            }
            // Return the promise of each creation query
            return createRoom(rooms)
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
          Promise.all(roomsData.map((roomData) => {
            // Convert the xml object into a model object
            const rooms = {
              room_id: roomData.room_id.toString(),
              room_location: roomData.room_location.toString(),
              room_number: roomData.room_number.toString()
            }
            // Return the promise of each creation query
            return update(rooms)
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


const createRoomSchema = {
  type: "object",
  required: [
    "room_location",
    "room_number"
  ],
  properties: {
    room_location: { type: "string" },
    room_number: { type: "string" }
  },
};

roomsController.post(
  "/room",
  [auth(["admin", "trainer"]),
  validate({body: createRoomSchema }),
  ],
  (req, res) => {
    // #swagger.summary = 'Create a room';
    /*
    #swagger.requestBody= {
                description: "Adding new room",
                content:{
                    'application/json':{
                      schema:{
                            room_location:"string",
                            room_number:"number",
                            },
                      example:{
                            room_location:"Block A",
                            room_number:205
                            }
                    }       
                }
    }
    */

    const data = req.body;

    createRoom(data)
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: "Created room",
          result: result.affectedRows
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          status: 500,
          message: "Failed to create room",
        });
      });
  }
);


roomsController.get(
  "/room",
  [auth(["admin", "trainer"])],
  (req, res) => {
    //#swagger.summary = 'Get all room'

    getAll()
      .then((data) => {
        res.json({
          status: 200,
          message: "Get all rooms",
          rooms: data,
        });
      })
      .catch((error) => {
        res.json({
          status: 500,
          message: "Failed to get all rooms",
        });
      });
  });

const getRoomByIDSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" }
  },
};

roomsController.get(
  "/room/:id",
  [auth(["admin", "trainer","member"]),
  validate({ params: getRoomByIDSchema}),
  ],

  (req, res) => {
    //   #swagger.summary = 'Get a specific room by ID'

    const roomID = req.params.id;
    getByID(roomID)
      .then((data) => {
        res.status(200).json({
          status: 200,
          message: "Get room by ID",
          room: data,
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).json({
          status: 500,
          message: "Failed to get room by ID",
        });
      });
  }
);

const updateRoomSchema = {
  type: "object",
  required: [
    "room_id",
    "room_location",
    "room_number"
  ],
  properties: {
    room_id: { type: "number" },
    room_location: { type: "string" },
    room_number: { type: "string" }
  },
};

roomsController.put(
  "/room",
  [auth(["admin", "trainer"]), validate({ body: updateRoomSchema})],
  (req, res) => {
    // #swagger.summary = 'Update an existing room';
    /*
    #swagger.requestBody= {
                description: "Update an existing room",
                content:{
                    'application/json':{
                        schema:{
                            room_location:"string",
                            room_number:"number",
                            room_id:"number"
                            },
                        example:{
                            room_location:"Block G",
                            room_number:303,
                            room_id:1
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
          message: "Updated room",
          modifiedCount: result.modifiedCount,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "Failed tp update room",
        });
      });
  }
);

const deleteRoomByIDSchema = {
  type: "object",
  required: ["room_id"],
  properties: {
    room_id: { type: "number" },
  },
};

roomsController.delete(
  "/room",
  [auth(["admin", "trainer"]), validate({ body: deleteRoomByIDSchema})],

  (req, res) => {
    // #swagger.summary = 'Delete a specific room by ID'
    /*
    #swagger.requestBody= {
    description: "Deleting a room",
        content:{
            'application/json':{
                schema:{
                    room_id: 'number',
                },
                example:{

                    room_id:'1',
                }
            }
        }
    }
    */
    const roomID = req.body.room_id;
    // console.log(roomID);
    deleteByID(roomID)
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: "Delete room by ID",
          deletedCount: result.deletedCount,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "Failed to delete room by ID",
        });
      });
  }
);


export default roomsController;

