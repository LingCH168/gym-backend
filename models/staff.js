import { db } from "../database/database.js";

// Create
export async function createStaff(
staff
) {
  return await db.query(
    `
    INSERT INTO staff 
    (staff_email,
     staff_password,
     staff_access_role,
     staff_phone,
     staff_first_name,
     staff_last_name,
     staff_address,
     staff_authentication_key)
    VALUES(?,?,?,?,?,?,?,?)
    `,
    [  staff.staff_email,
        staff.staff_password,
        staff.staff_access_role,
        staff.staff_phone,
        staff.staff_first_name,
        staff.staff_last_name,
        staff.staff_address,
        staff.staff_authentication_key,
    ]
  ).then(([result]) => {
    return { ...staff, id: result.insertId }
});
}


export async function getAll() {

  // return await db.query("SELECT * FROM staff")
 
  const [staff] = await db.query("SELECT * FROM staff")
  
return  staff.map((staff) =>
        ({staff_id:staff.staff_id.toString(),
          staff_email:staff.staff_email,
          staff_password:staff.staff_password,
          staff_access_role:staff.staff_access_role,
          staff_phone:staff.staff_phone,
          staff_first_name:staff.staff_first_name,
          staff_last_name:staff.staff_last_name,
          staff_address:staff.staff_address,
          staff_address:staff.staff_address,
          staff_authentication_key:staff.staff_authentication_key
        }
    ))
}
 
export async function getByID(staffID) {
//   console.log(staffID);
    const [staffs] = await db.query(
        "SELECT * FROM staff WHERE staff_id = ?", staffID
    )

    if (staffs.length > 0) {
        const staff = staffs[0]
        return Promise.resolve(staff)
    } else {
        return Promise.reject("no results found")
    }
}

export async function getByEmail(email) {
    const [staffs] = await db.query(
        "SELECT * FROM staff WHERE staff_email = ?", email
    )

    if (staffs.length > 0) {
        const staff = staffs[0]
        return Promise.resolve( staff)
    } else {
        return Promise.reject("no results found")
    }
}

export async function getByAuthenticationKey(authenticationKey) {
    // console.log(authenticationKey);
    const [staffs] = await db.query(
        "SELECT * FROM staff WHERE staff_authentication_key = ?", authenticationKey
    )
    // console.log(staffs);
    if (staffs.length > 0) {
        const staff = staffs[0]
        return Promise.resolve(staff)
    } else {
        return Promise.reject("no results found")
    }
}
export async function create(staff) {
    delete staff.id

    return db.query(
        "INSERT INTO staffs (email, password, role, first_name, last_name) "
        + "VALUE (?, ?, ?, ?, ?)",
        [
            staff.email,
            staff.password,
            staff.role,
            staff.firstName,
            staff.lastName,
        ]
    ).then(([result]) => {
        return { ...staff, id: result.insertId }
    })
}

export async function update(staff) {
    return db.query(
        "UPDATE staff SET "
        + "staff_email = ? ,"
        + "staff_password = ? , "
        + "staff_access_role = ? , "
        + "staff_phone = ? ,"
        + "staff_first_name = ? , "
        + "staff_last_name = ? ,"
        + "staff_address = ? ,"
        + "staff_authentication_key = ? "
        + "WHERE staff_id = ?",
        [
          staff.staff_email,
          staff.staff_password,
          staff.staff_access_role,
          staff.staff_phone,
          staff.staff_first_name,
          staff.staff_last_name,
          staff.staff_address,
          staff.staff_authentication_key,
          staff.staff_id 
        ]
    ).then(([result]) => {
        // console.log("result",result)
        // console.log("model",staff)
        return { ...staff}
    })
}

export async function deleteByID(staffID) {
    return db.query("DELETE FROM staff WHERE staff_id = ?", staffID)
}