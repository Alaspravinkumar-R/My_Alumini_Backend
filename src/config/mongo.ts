const dbConfig = {
    databaseName  : "college",
    key: "4686acba-e8b4-4348-b125-c2994a1b0cdb",
    expire: 86400,
    message: {
        serverError: "Server ecxeption. Please contact administrator!",
        notExist: "Not Exist"
      },
    collection: {
        user: "user_details",
        test: "test"
    },
}

export default dbConfig;