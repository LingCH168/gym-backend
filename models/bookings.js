import { db } from "../database/database.js";

// Create
export async function createBooking(
    result
) {

    // console.log(result);
    return await db.query(
        `
    INSERT INTO bookings 
    (   booking_user_id,
        booking_class_id,
        booking_created_date,
        booking_created_time
    )
    VALUES(?,?,?,?) 

    `,
        [
            result.booking_user_id,
            result.booking_class_id,
            result.booking_created_date,
            result.booking_created_time
        ]
    )
}

export async function getAll() {

    // return await db.query("SELECT * FROM classes")
    const [bookings] = await db.query("SELECT * FROM bookings")
    return bookings.map(result =>
    ({
        booking_id: result.booking_id,
        booking_user_id: result.booking_user_id,
        booking_class_id: result.booking_class_id,
        booking_created_date: new Date(result.booking_created_date).toLocaleDateString(),
        booking_created_time: result.booking_created_time
    }
    ));
}

export async function getByID(bookingID) {
    // console.log(classID);
    const [bookings] = await db.query(
        "SELECT * FROM bookings WHERE booking_id = ?", bookingID
    )

    if (bookings.length > 0) {
        const result = bookings[0]
        const formattedResult = Object.assign({}, result, {
            booking_created_date: new Date(result.booking_created_date).toLocaleDateString()
        });
        return Promise.resolve(formattedResult)
    } else {
        return Promise.reject("no results found")
    }
}

export async function getByClassID(classID) {
    // console.log(classID);
    const [bookings] = await db.query(
        "SELECT * FROM bookings WHERE booking_class_id = ?", classID
    )

    if (bookings.length > 0) {
        const result = bookings[0]
        return Promise.resolve(result)
    } else {
        return Promise.reject("no results found")
    }
}

export async function getByStaffID(staffID) {
    // console.log(classID);
    const [bookings] = await db.query(
        "SELECT * FROM bookings WHERE booking_user_id = ?  ORDER BY booking_created_date DESC, booking_created_time DESC", staffID
    )
    if (bookings.length > 0) {

        // const result = bookings[0]

        return bookings.map(result =>
        ({
            booking_id: result.booking_id,
            booking_user_id: result.booking_user_id,
            booking_class_id: result.booking_class_id,
            booking_created_date: new Date(result.booking_created_date).toLocaleDateString(),
            booking_created_time: result.booking_created_time
        }
        ));

        // return Promise.resolve(result)
    } else {
        return Promise.reject("no results found")
    }
}


export async function update(result) {

    const currentDateTime = new Date(result.booking_created_date);
    const year = currentDateTime.getFullYear();
    const month = currentDateTime.getMonth() + 1;
    const day = currentDateTime.getDate();
    const mysqlDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    result.booking_created_date = mysqlDate
    // console.log(result);
    return db.query(
        "UPDATE bookings SET "
        + "booking_user_id = ?,"
        + "booking_class_id = ?, "
        + "booking_created_date = ?,"
        + "booking_created_time = ? "
        + "WHERE booking_id = ?",
        [
            result.booking_user_id,
            result.booking_class_id,
            result.booking_created_date,
            result.booking_created_time,
            result.booking_id
        ])
}

export async function deleteByID(bookingID) {
    // console.log("666", bookingID);
    return db.query("DELETE FROM bookings WHERE booking_id = ?", bookingID)
}