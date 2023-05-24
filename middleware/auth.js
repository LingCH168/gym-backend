import { getByAuthenticationKey } from "../models/staff.js"

export default function auth(allowed_roles) {
    return function (req, res, next) {

        const authenticationKey = (req.body.authenticationKey || req.get("authenticationKey") ||req.get("Authorization") )
        // console.log("Auth Key Used:", authenticationKey)
        if (authenticationKey) {
            getByAuthenticationKey(authenticationKey)
                .then(user => {
                    // console.log(123)
                    // console.log("444",user)
                    if (allowed_roles.includes(user.staff_access_role
                        )) {
                        next()
                    } else {
                        res.status(403).json({
                            status: 403,
                            message: "Access forbidden"
                        })
                    }
                })
                .catch(error => {
                    res.status(401).json({
                        status: 401,
                        message: "Authentication key invalid or expired"
                    })
                })

        } else {
            res.status(401).json({
                status: 401,
                message: "Authentication key missing from request"
            })
        }

    }
}
