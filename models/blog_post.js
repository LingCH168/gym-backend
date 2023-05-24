import { db } from "../database/database.js";

// Create
export async function createBlog_post(result) { // console.log(result);
    return await db.query(
        `
    INSERT INTO blog_posts 
    (   
        post_date,
        post_time,
        post_user_id,
        post_title,
        post_content  
    )
    VALUES(?,?,?,?,?) 
    `,
        [
            result.post_date,
            result.post_time,
            result.post_user_id,
            result.post_title,
            result.post_content
        ]
    )
}

export async function getAll() {
    // return await db.query("SELECT * FROM classes")
    const [posts] = await db.query("SELECT * FROM blog_posts ORDER BY post_date DESC, post_time DESC ")
    return posts.map(result =>
    ({
        post_id: result.post_id,
        post_date: new Date(result.post_date).toLocaleDateString(),
        post_time: result.post_time,
        post_user_id: result.post_user_id,
        post_title: result.post_title,
        post_content: result.post_content
    }
    ));
}

export async function getByID(postID) {
    // console.log(classID);
    const [posts] = await db.query(
        "SELECT * FROM blog_posts WHERE post_id = ?", postID
    )

    if (posts.length > 0) {
        const result = posts[0]
        const formattedResult = Object.assign({}, result, {
            post_date: new Date(result.post_date).toLocaleDateString()
        });
        return Promise.resolve(formattedResult)
    } else {
        return Promise.reject("no results found")
    }
}


export async function update(result) {

    const currentDateTime = new Date(result.post_date);
    const year = currentDateTime.getFullYear();
    const month = currentDateTime.getMonth() + 1;
    const day = currentDateTime.getDate();
    const mysqlDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    result.post_date = mysqlDate
    // console.log(result);
    return db.query(
        "UPDATE blog_posts SET "
        + "post_date = ?,"
        + "post_time = ?, "
        + "post_user_id = ?,"
        + "post_title = ?, "
        + "post_content = ? "
        + "WHERE post_id = ?",
        [
            result.post_date,
            result.post_time,
            result.post_user_id,
            result.post_title,
            result.post_content,
            result.post_id
        ])
}

export async function deleteByID(postID) {
    return db.query("DELETE FROM blog_posts WHERE post_id = ?", postID)
}