import { Router } from "express";
import { validate } from "../middleware/validator.js";
import auth from "../middleware/auth.js";
import {
  createBooking,
  getAll,
  getByID,
  getByClassID,
  getByStaffID,
  update,
  deleteByID,
} from "../models/bookings.js";

const bookingsController = Router();
const createBookingSchema = {
  type: "object",
  required: [
    "booking_user_id",
    "booking_class_id",
    // "booking_created_date",
    // "booking_created_time",
  ],
  properties: {
    booking_user_id: { type: "string" },
    booking_class_id: { type: "string" },
    // booking_created_date: { type: "string" },
    // booking_created_time: { type: "string" }
  },
};

bookingsController.post(
  "/booking",
  [
    auth(["admin", "trainer", "member"]),
    validate({ body: createBookingSchema }),
  ],
  (req, res) => {
    // #swagger.summary = 'Create a booking';
    /*
    #swagger.requestBody= {
                description: "Adding new booking",
                content:{
                    'application/json':{
                      schema:{
                            booking_user_id:"number",
                            booking_class_id:"number",
                            booking_created_date_time:"string",
                            },
                      example:{
                            booking_user_id: 1,
                            booking_class_id:1,
                            booking_created_date_time:"2023/10/20",
                            }
                    }       
                }
    }
    */


    const currentDateTime = new Date();
    const year = currentDateTime.getFullYear();
    const month = currentDateTime.getMonth() + 1;
    const day = currentDateTime.getDate();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();
    const seconds = currentDateTime.getSeconds();

    const mysqlDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const mysqlTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // // console.log(currentDate);
    req.body.booking_created_date = mysqlDate
    // const currentTime = new Date().toLocaleTimeString()
    // // console.log(currentTime);
    req.body.booking_created_time = mysqlTime

    // delete req.body.booking_id
    const data = req.body;
    // console.log(data);

    createBooking(data)
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: "Created booking",
          result: result.affectedRows
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).json({
          status: 500,
          message: "Failed to create booking",
        });
      });
  }
);


bookingsController.get(
  "/booking",
  [auth(["admin", "trainer"])],
  (req, res) => {
    //#swagger.summary = 'Get all booking'

    getAll()
      .then((data) => {
        res.json({
          status: 200,
          message: "Get all bookings",
          bookings: data,
        });
      })
      .catch((error) => {
        res.json({
          status: 500,
          message: "Failed to get all bookings",
        });
      });
  });

const getBookingByIDSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
};

bookingsController.get(
  "/booking/:id",
  [auth(["admin", "trainer"]),
  validate({ params: getBookingByIDSchema }),
  ],

  (req, res) => {
    //   #swagger.summary = 'Get a specific booking by ID'

    const bookingID = req.params.id;
    getByID(bookingID)
      .then((data) => {
        res.status(200).json({
          status: 200,
          message: "Get booking by ID",
          booking: data,
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).json({
          status: 500,
          message: "Failed to get booking by ID",
        });
      });
  }
);


const getBookingByClassIDSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
};

bookingsController.get(
  "/booking/class/:id",
  [auth(["admin", "trainer", "member"]),
   validate({ params: getBookingByClassIDSchema })
  ],

  (req, res) => {
    //   #swagger.summary = 'Get a specific booking by ID'

    const bookingClassID = req.params.id;
    getByClassID(bookingClassID)
      .then((data) => {
        res.status(200).json({
          status: 200,
          message: "Get booking by ID",
          booking: data,
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).json({
          status: 500,
          message: "Failed to get booking by ID",
        });
      });
  }
);

const getBookingByStaffIDSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
}

bookingsController.get(
  "/booking/staff/:id",
  [auth(["admin", "trainer", "member"]), validate({ params: getBookingByStaffIDSchema})
  ],

  (req, res) => {
    //   #swagger.summary = 'Get a specific booking by ID'

    const bookingStaffID = req.params.id;
    // console.log(123)
    // console.log(bookingStaffID);
    getByStaffID(bookingStaffID)
      .then((data) => {
        res.status(200).json({
          status: 200,
          message: "Get booking by ID",
          bookings: data,
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).json({
          status: 500,
          message: "Failed to get booking by ID",
        });
      });
  }
);



const updateBookingSchema = {
  type: "object",
  required: [
    "booking_id",
    "booking_user_id",
    "booking_class_id",
    "booking_created_date",
    "booking_created_time",
  ],
  properties: {
    booking_id: { type: "number" },
    booking_user_id: { type: "string" },
    booking_class_id: { type: "string" },
    booking_created_date: { type: "string" },
    booking_created_time: { type: "string" }
  },
};

bookingsController.put(
  "/booking",
  [auth(["admin", "trainer"]), validate({ body: updateBookingSchema })],
  (req, res) => {
    // #swagger.summary = 'Update an existing booking';
    /*
    #swagger.requestBody= {
                description: "Update an existing booking",
                content:{
                    'application/json':{
                      schema:{
                        booking_user_id:"number",
                        booking_class_id:"number",
                        booking_created_date_time:"string",
                        booking_id:"number"
                            },
                      example:{
                        booking_user_id: 110,
                        booking_class_id:110,
                        booking_created_date_time:"2023/04/10",
                        booking_id:1
                            }
                    }       
                    }       
                }
    }
    */

    const data = req.body;
    // console.log(data);
    update(data)
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: "Updated booking",
          modifiedCount: result.modifiedCount,
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).json({
          status: 500,
          message: "Failed tp update booking",
        });
      });
  }
);

const deleteBookingByIDSchema = {
  type: "object",
  required: ["booking_id"],
  properties: {
    booking_id: { type: "number" },
  },
};

bookingsController.delete(
  "/booking",
  [auth(["admin", "trainer", "member"]), validate({ body: deleteBookingByIDSchema })],

  (req, res) => {
    // #swagger.summary = 'Delete a specific booking by ID'
    /*
    #swagger.requestBody= {
    description: "Deleting a booking",
        content:{
            'application/json':{
                schema:{
                    booking_id: 'number',
                },
                example:{

                    booking_id:'1',
                }
            }
        }
    }
    */
    const bookingID = req.body.booking_id;
    // console.log('555' + bookingID);
    deleteByID(bookingID)
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: "Delete booking by ID",
          deletedCount: result.deletedCount,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "Failed to delete booking by ID",
        });
      });
  }
);


export default bookingsController;




