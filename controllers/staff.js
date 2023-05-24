import { Router } from "express";
import bcrypt from "bcryptjs";
import { v4 as uuid4 } from "uuid";
import auth from "../middleware/auth.js";
import { validate } from "../middleware/validator.js";
import {
  createStaff,
  getAll,
  getByID,
  getByEmail,
  update,
  getByAuthenticationKey,
  deleteByID,
} from "../models/staff.js";

const staffController = Router();
const createStaffSchema = {
  type: "object",
  required: [
    // "staff_id",
    "staff_email",
    "staff_password",
    "staff_access_role",
    "staff_phone",
    "staff_first_name",
    "staff_last_name",
    "staff_address",
    // "staff_authentication_key"
  ],
  properties: {
    // staff_id: { type: "string" },
    staff_email: { type: "string" },
    staff_password: { type: "string" },
    staff_access_role: { type: "string" },
    staff_phone: { type: "string" },
    staff_first_name: { type: "string" },
    staff_last_name: { type: "string" },
    staff_address: { type: "string" },
    // staff_authentication_key: { type: "string" },
  },
};

staffController.post(
  "/staff",
  [
    // auth(["admin"]),
    validate({ body: createStaffSchema }),
  ],
  (req, res) => {
    // #swagger.summary = 'Create a staff';
    /*
    #swagger.requestBody= {
                description: "Adding new staff",
                content:{
                    'application/json':{
                            schema:{
                                email:"string",
                                staff_password:"string",
                                role:"string",
                                phone:"string",
                                first_name:"string",
                                last_name:"string",
                                address:"string"
                            },
                            example:{
                                email:"lingCH@server.com",
                                staff_password:"123",
                                role:"admin",
                                phone:"4735658925",
                                first_name:"Jack",
                                last_name:'CHUNG',
                                address:"128 Hassall St"
                        
                            }
                    }       
                }
    }
    */
    const staff = req.body;
    // console.log(staff);
    if (!staff.staff_password.startsWith("$2a")) {
      staff.staff_password = bcrypt.hashSync(staff.staff_password);
    }
    createStaff(staff)
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: "Created staff",
          result: result,
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).json({
          status: 500,
          message: "Failed to create staff",
        });
      });
  }
);

const postUserLoginSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string"
    },
    password: {
      type: "string"
    }
  }
}

staffController.post("/staff/login",
  validate({ body: postUserLoginSchema }),
  (req, res) => {
    // console.log(333);
    // #swagger.summary = 'staff Login'
    /*
      #swagger.requestBody= {
          description: "staff Login",
          content:{
              'application/json':{
                  schema:{
                      email: 'string',
                      password: 'string',
                  },
                  example:{
                      email:"lingCH@server.com",
                      password:"123",
                  }
              }
          }
      }
      */

    const loginData = req.body;
    getByEmail(loginData.email)
      .then((staff) => {
        // console.log(staff)
        if (bcrypt.compareSync(loginData.password, staff.staff_password)) {
          staff.staff_authentication_key = uuid4().toString();
          update(staff).then((result) => {
            // console.log(result)
            res.status(200).json({
              status: 200,
              message: "staff logged in",
              role: result.staff_access_role,
              authenticationKey: result.staff_authentication_key,
            });
          });
        } else {
          res.status(400).json({
            status: 400,
            message: "invalid credentials",
          });
        }
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).json({
          status: 500,
          message: "login failed",
        });
      });
  });

staffController.post("/staff/logout",
  [auth(["admin", "trainer", "member"])],
  (req, res) => {
    // #swagger.summary = 'staff Logout'
    /*
      #swagger.requestBody= {
      description: "staff Logout",
          content:{
              'application/json':{
                  schema:{
                      authenticationKey: 'string',
                  },
                  example:{
                  authenticationKey: '55d1ebc9-779a-4e2e-8907-184cca7b21f2',
                  }
          }
      }
      }
      */

    const authenticationKey = req.body.authenticationKey;
    getByAuthenticationKey(authenticationKey)
      .then((staff) => {
        staff.staff_authentication_key = null;
        update(staff).then((staff) => {
          res.status(200).json({
            status: 200,
            message: "staff logged out",
          });
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "failed to logout staff",
        });
      });
  });

staffController.get("/staff",
  [auth(["admin", "trainer"])],
  (req, res) => {
    //#swagger.summary = 'Get all staff'
    getAll()
      .then((staff) => {
        res.json({
          status: 200,
          message: "Get all staff",
          staff: staff,
        });
      })
      .catch((error) => {
        // console.log(error);
        res.json({
          status: 500,
          message: "Failed to get all staff",
        });
      });
  });

const getStaffByIDSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
};

staffController.get(
  "/staff/:id",
  [auth(["admin", "trainer", "member"]),
  validate({ params: getStaffByIDSchema }),
  ],

  (req, res) => {
    //   #swagger.summary = 'Get a specific staff by ID'

    const staffID = req.params.id;
    getByID(staffID)
      .then((staff) => {
        res.status(200).json({
          status: 200,
          message: "Get staff by ID",
          staff: staff,
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).json({
          status: 500,
          message: "Failed to get staff by ID",
        });
      });
  }
);


// const updateStaffSchema = {
//   type: "object",
//   required: [
//     "staff_id",
//     "staff_email",
//     "staff_password",
//     "staff_access_role",
//     "staff_phone",
//     "staff_first_name",
//     "staff_last_name",
//     "staff_address",
//     "staff_authentication_key",
//   ],
//   properties: {
//     staff_id: { type: "number" },
//     staff_email: { type: "string" },
//     staff_password: { type: "string" },
//     staff_access_role: { type: "string" },
//     staff_phone: { type: "string" },
//     staff_first_name: { type: "string" },
//     staff_last_name: { type: "string" },
//     staff_address: { type: "string" },
//     staff_authentication_key: { type: "string" },
//   },
// };

// staffController.put(
//   "/staff",
//   // [auth(["admin"]), validate({ body: updateStaffSchema})],
//   (req, res) => {
//     // #swagger.summary = 'Update an existing staff';
//     /*
//     #swagger.requestBody= {
//                 description: "Update an existing staff",
//                 content:{
//                     'application/json':{
//                             schema:{
//                                 authenticationKey:"string",
//                                 id:"string",
//                                 email:"string",
//                                 password:"string",
//                                 role:"string",
//                                 firstName:"string",
//                                 lastName:"string",
//                                 create_time:"string",
//                             },
//                             example:{
//                                 authenticationKey:"c2a5afbe-f7a0-4e0a-997d-9cb9241ec52e",
//                                 id:"6413fc98f808c06fab425866",
//                                 email:"lingCH333@server.com",
//                                 password:"lingCH",
//                                 role:"admin",
//                                 firstName:"Test",
//                                 lastName:"staff",
//                                 create_time:'03/03/2021',
//                             }
//                     }       
//                 }
//     }
//     */

//     const staff = req.body;
//     console.log(staff)
//     if (!staff.staff_password.startsWith("$2a")) {
//       staff.staff_password = bcrypt.hashSync(staff.staff_password);
//     }
//     update(staff)
//       .then((result) => {
//         res.status(200).json({
//           status: 200,
//           message: "Updated staff",
//           modifiedCount: result.modifiedCount,
//         });
//       })
//       .catch((error) => {
//         res.status(500).json({
//           status: 500,
//           message: "Failed tp update staff",
//         });
//       });
//   }
// );

const deleteStaffByIDSchema = {
  type: "object",
  required: ["staff_id"],
  properties: {
    staff_id: { type: "number" },
  },
};

staffController.delete(
  "/staff",
  [
    auth(["admin"]),
    validate({ body: deleteStaffByIDSchema })],

  (req, res) => {
    // #swagger.summary = 'Delete a specific staff by ID'
    /*
    #swagger.requestBody= {
    description: "Deleting a staff",
        content:{
            'application/json':{
                schema:{
                    authenticationKey:'string',
                    id: 'string',
                },
                example:{
                    authenticationKey:"c2a5afbe-f7a0-4e0a-997d-9cb9241ec52e",
                    id:'640ec1f2a499175ad989b26c',
                }
            }
        }
    }
    */
    const staffID = req.body.staff_id;
    console.log(staffID);
    deleteByID(staffID)
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: "Delete staff by ID",
          deletedCount: result.deletedCount,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "Failed to delete staff by ID",
        });
      });
  }
);




const updateStaffSchema = {
  type: "object",
  required: [
    "staff_id",
    "staff_email",
    "staff_password",
    "staff_access_role",
    "staff_phone",
    "staff_first_name",
    "staff_last_name",
    "staff_address",
    "staff_authentication_key",
  ],
  properties: {
    staff_id: { type: "number" },
    staff_email: { type: "string" },
    staff_password: { type: "string" },
    staff_access_role: { type: "string" },
    staff_phone: { type: "string" },
    staff_first_name: { type: "string" },
    staff_last_name: { type: "string" },
    staff_address: { type: "string" },
    staff_authentication_key: { type: "string" },
  },
};

staffController.put(
  "/staff",
  [auth(["admin"]), validate({ body: updateStaffSchema })],
  (req, res) => {
    // #swagger.summary = 'Update staff access level by ID '

    /*
    #swagger.requestBody= {
            description: "Update staff access level ",
            content:{
                'application/json':{
                    schema:{
                            authenticationKey:'string',
                            role: 'string',
                            startDate: 'string',
                            endDate: 'string'
                    },
                    example:{
                            authenticationKey:"c2a5afbe-f7a0-4e0a-997d-9cb9241ec52e",
                            role:'manager',
                            start_date: '01/01/2021',
                            end_date: '01/01/2024'
                    }
                }
            }
    }
    */
    const staff = req.body;

    if (!staff.staff_password.startsWith("$2a")) {
      staff.staff_password = bcrypt.hashSync(staff.staff_password);
    }

    if (staff.staff_id == null) {
      res.status(404).json({
        status: 404,
        message: "Cannot find staff to update without ID",
      });
      return;
    }
    update(staff)
      .then((updatedStaff) => {
        res.status(200).json({
          status: 200,
          message: "Staff updated",
          staff: staff,
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).json({
          status: 500,
          message: "Failed to update staff",
        });
      });
  }
);


const getUserByAuthenticationKeySchema = {
  type: "object",
  required: ["authenticationKey"],
  properties: {
    authenticationKey: {
      type: "string",
    },
  },
};

staffController.get(
  "/staff/by-key/:authenticationKey",
  [auth(["admin", "trainer", "member"]),
  validate({ params: getUserByAuthenticationKeySchema })
  ],
  (req, res) => {
    const authenticationKey = req.params.authenticationKey;
    getByAuthenticationKey(authenticationKey)
      .then((staff) => {
        // console.log(user);
        res.status(200).json({
          status: 200,
          message: "Get staff by authentication key",
          staff: staff,
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).json({
          status: 500,
          message: "Failed to get staff by authentication key",
        });
      });
  }
);

export default staffController;
