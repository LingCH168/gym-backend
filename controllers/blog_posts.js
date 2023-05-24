
import { Router } from "express";
import { validate } from "../middleware/validator.js";
import auth from "../middleware/auth.js";
import {
    createBlog_post,
    getAll,
    getByID,
    update,
    deleteByID,
} from "../models/blog_post.js";

const blog_postsController = Router();
const createBlog_postSchema = {
    type: "object",
    required: [

        // "post_date",
        // "post_time",
        "post_user_id",
        "post_title",
        "post_content",
    ],
    properties: {

        // post_date: { type: "string" },
        // post_time: { type: "string" },
        post_user_id: { type: "string" },
        post_title: { type: "string" },
        post_content: { type: "string" },
    },
};

blog_postsController.post(
    "/blog_post",
    [
    auth(["admin", "trainer","member"]),
    validate({ body: createBlog_postSchema}),
    ],
    (req, res) => {
        // #swagger.summary = 'Create a blog_post';
        /*
        #swagger.requestBody= {
                    description: "Adding new blog_post",
                    content:{
                        'application/json':{
                          schema:{
                                blog_post_user_id:"number",
                                blog_post_class_id:"number",
                                blog_post_created_date_time:"string",
                                },
                          example:{
                                blog_post_user_id: 1,
                                blog_post_class_id:1,
                                blog_post_created_date_time:"2023/10/20",
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
        req.body.post_date = mysqlDate
        // const currentTime = new Date().toLocaleTimeString()
        // // console.log(currentTime);
        req.body.post_time = mysqlTime

        // delete req.body.blog_post_id
        const data = req.body;
        // console.log(data);
        createBlog_post(data)
            .then((result) => {
                res.status(200).json({
                    status: 200,
                    message: "Created blog_post",
                    result: result.affectedRows
                });
            })
            .catch((error) => {
                // console.log(error);
                res.status(500).json({
                    status: 500,
                    message: "Failed to create blog_post",
                });
            });
    }
);

blog_postsController.get(
    "/blog_post",
    // [auth(["admin", "trainer"])],
    (req, res) => {
        //#swagger.summary = 'Get all blog_post'

        getAll()
            .then((data) => {
                res.json({
                    status: 200,
                    message: "Get all blog_posts",
                    blog_posts: data,
                });
            })
            .catch((error) => {
                res.json({
                    status: 500,
                    message: "Failed to get all blog_posts",
                });
            });
    });

const getBlog_postByIDSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: { type: "string" },
    },
};

blog_postsController.get(
    "/blog_post/:id",
    [auth(["admin", "trainer","member"]),
    validate({ params: getBlog_postByIDSchema }),
    ],

    (req, res) => {
        //   #swagger.summary = 'Get a specific blog_post by ID'
        const blog_postID = req.params.id;
        getByID(blog_postID)
            .then((data) => {
                res.status(200).json({
                    status: 200,
                    message: "Get blog_post by ID",
                    blog_post: data,
                });
            })
            .catch((error) => {
                // console.log(error);
                res.status(500).json({
                    status: 500,
                    message: "Failed to get blog_post by ID",
                });
            });
    }
);


const updateBlog_postSchema = {
    type: "object",
    required: [
        "post_id",
        "post_date",
        "post_time",
        "post_user_id",
        "post_title",
        "post_content",
    ],
    properties: {
        post_id: { type: "number" },
        post_date: { type: "string" },
        post_time: { type: "string" },
        post_user_id: { type: "string" },
        post_title: { type: "string" },
        post_content: { type: "string" },
    },
};

blog_postsController.put(
    "/blog_post",
    [auth(["admin", "trainer","member"]), 
    validate({ body: updateBlog_postSchema})
],
    (req, res) => {
        // #swagger.summary = 'Update an existing blog_post';
        /*
        #swagger.requestBody= {
                    description: "Update an existing blog_post",
                    content:{
                        'application/json':{
                          schema:{
                            blog_post_user_id:"number",
                            blog_post_class_id:"number",
                            blog_post_created_date_time:"string",
                            blog_post_id:"number"
                                },
                          example:{
                            blog_post_user_id: 110,
                            blog_post_class_id:110,
                            blog_post_created_date_time:"2023/04/10",
                            blog_post_id:1
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
                    message: "Updated blog_post",
                    modifiedCount: result.modifiedCount,
                });
            })
            .catch((error) => {
                // console.log(error);
                res.status(500).json({
                    status: 500,
                    message: "Failed tp update blog_post",
                });
            });
    }
);

const deleteBlog_postByIDSchema = {
    type: "object",
    required: ["post_id"],
    properties: {
        post_id: { type: "number" },
    },
};

blog_postsController.delete(
    "/blog_post",
    [auth(["admin", "trainer","member"]), validate({ body: deleteBlog_postByIDSchema})],

    (req, res) => {
        // #swagger.summary = 'Delete a specific blog_post by ID'
        /*
        #swagger.requestBody= {
        description: "Deleting a blog_post",
            content:{
                'application/json':{
                    schema:{
                        blog_post_id: 'number',
                    },
                    example:{
    
                        blog_post_id:'1',
                    }
                }
            }
        }
        */
        const blog_postID = req.body.post_id;
        // console.log(blog_postID);
        deleteByID(blog_postID)
            .then((result) => {
                res.status(200).json({
                    status: 200,
                    message: "Delete blog_post by ID",
                    deletedCount: result.deletedCount,
                });
            })
            .catch((error) => {
                res.status(500).json({
                    status: 500,
                    message: "Failed to delete blog_post by ID",
                });
            });
    }
);


export default blog_postsController;
















