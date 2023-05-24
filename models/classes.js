import { db } from "../database/database.js";

// Create
export async function createClass(
    result
) {
    return await db.query(
        `
    INSERT INTO classes 
    (   class_date,
        class_time,
        class_room_id,
        class_activity_id,
        class_trainer_user_id)
    VALUES(?,?,?,?,?) 
    `,
        [result.class_date,
        result.class_time,
        result.class_room_id,
        result.class_activity_id,
        result.class_trainer_user_id
        ]
    )
}

export async function getAll() {

    // return await db.query("SELECT * FROM classes")
    const [classes] = await db.query("SELECT * FROM classes")
    return classes.map(result =>
    ({
        class_id: result.class_id.toString(),
        class_date:new Date(result.class_date).toLocaleDateString(),
        class_time: result.class_time,
        class_room_id: result.class_room_id,
        class_activity_id: result.class_activity_id,
        class_trainer_user_id: result.class_trainer_user_id
    }
    ));
}

export async function getByID(classID) {
    // console.log(classID);
    const [classes] = await db.query(
        "SELECT * FROM classes WHERE class_id = ?", classID
    )


    if (classes.length > 0) {
        const result = classes[0]

        const formattedResult = Object.assign({}, result, {
            class_date: new Date(result.class_date).toLocaleDateString()
        });
        // console.log(formattedResult);
        return Promise.resolve(formattedResult)
    } else {
        return Promise.reject("no results found")
    }
}

export async function getByActivityID(activityID) {
    // console.log(activityID);
    const [classes] = await db.query(
        "SELECT * FROM classes WHERE class_activity_id = ?", activityID
    )

    if (classes.length > 0) {
        const result = classes[0]
        const formattedResult = Object.assign({}, result, {
            class_date: new Date(result.class_date).toLocaleDateString()
        });
        // console.log(formattedResult);
        return Promise.resolve(formattedResult)
    } else {
        return Promise.reject("no results found")
    }
}

export async function update(result) {
    // console.log(result);
    return db.query(
        "UPDATE classes SET "
        + "class_date = ?,"
        + "class_time = ?,"
        + "class_room_id = ?, "
        + "class_activity_id = ?, "
        + "class_trainer_user_id =? "
        + "WHERE class_id = ?",
        [
            result.class_date,
            result.class_time,
            result.class_room_id,
            result.class_activity_id,
            result.class_trainer_user_id,
            result.class_id
        ])
}

export async function deleteByID(classID) {
    return db.query("DELETE FROM classes WHERE class_id = ?", classID)
}