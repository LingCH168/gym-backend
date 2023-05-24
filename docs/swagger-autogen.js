import swaggerAutogen from "swagger-autogen"

const doc = {
    info:{
        version:'1.0.0',
        title:"High Street Gym ",
        description:"JSON REST API for Dynamic Gym website "
    },
    host:"localhost:8090",
    basePath:"",
    schemas:["http"],
    consumes:["application/json"],
    produces:["application/json"]
}

const outputFile = "./docs/swagger-output.json"

const endpointsFiles = ["./server.js"]

swaggerAutogen({openapi:"3.0.0"})(outputFile, endpointsFiles, doc)
