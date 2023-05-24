import { db } from "../database/database.js";

// Create
export async function createActivity(
    result
) {
    return await db.query(
        `
    INSERT INTO activities 
    (   activity_name,
        activity_description,
        activity_duration
    )
    VALUES(?,?,?) 
    `,
        [
        result.activity_name,
        result.activity_description,
        result.activity_duration
        ]
    )
}

export async function getAll() {

    // return await db.query("SELECT * FROM classes")
    const [activities] = await db.query("SELECT * FROM activities ORDER BY activity_name DESC")
    return activities.map(result =>
    ({  activity_id:result.activity_id,
        activity_name:result.activity_name,
        activity_description:result.activity_description,
        activity_duration:result.activity_duration
    }
    ));
}

export async function getByID(activityID) {
    // console.log("888",activityID);
    const [activities] = await db.query(
        "SELECT * FROM activities WHERE activity_id = ?", activityID
    )
    // console.log(activities);
    if (activities.length > 0) {
        const result = activities[0]
    // console.log("999",result);

        return Promise.resolve(result)
    } else {
        return Promise.reject("no results found")
    }
}

export async function update(result) {
    // console.log(result);
    return db.query(
        "UPDATE activities SET "
        + "activity_name = ?,"
        + "activity_description = ?, "
        + "activity_duration = ? "
        + "WHERE activity_id = ?",
        [
            result.activity_name,
            result.activity_description,
            result.activity_duration,
            result.activity_id 
        ])
}

export async function deleteByID(activityID) {
    return db.query("DELETE FROM activities WHERE activity_id = ?", activityID)
}