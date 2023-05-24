import { db } from "../database/database.js";

// Create
export async function createRoom(
    result
) {
    return await db.query(
        `
    INSERT INTO rooms 
    (   room_location,
        room_number)
    VALUES(?,?) 
    `,
        [result.room_location,
        result.room_number,

        ]
    )
}



export async function getAll() {

    // return await db.query("SELECT * FROM rooms")
    const [rooms] = await db.query("SELECT * FROM rooms")
    return rooms.map(result =>
    ({
        room_id: result.room_id.toString(),
        room_location: result.room_location,
        room_number: result.room_number
    }
    ));
}

export async function getByID(roomID) {
    // console.log(roomID);
    const [rooms] = await db.query(
        "SELECT * FROM rooms WHERE room_id = ?", roomID
    )

    if (rooms.length > 0) {
        const result = rooms[0]
        return Promise.resolve(result)
    } else {
        return Promise.reject("no results found")
    }
}

export async function update(result) {
    // console.log(result);
    return db.query(
        "UPDATE rooms SET "
        + "room_location = ?,"
        + "room_number =? "
        + "WHERE room_id = ?",
        [
            result.room_location,
            result.room_number,
            result.room_id
        ])
}

export async function deleteByID(roomID) {
    return db.query("DELETE FROM rooms WHERE room_id = ?", roomID)
}