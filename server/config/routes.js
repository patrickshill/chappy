const bp = require("body-parser");
const api = require("../controllers/controllers");

function router(app) {
    app.use(bp.json());
    
    app.get("/",function(req,res) {

    });

    // Create user
    app.post("/api/users",api.createUser);

    // Get pets
    app.get("/api/users",api.getAllUsers);

    // Get user by id
    app.get("/api/users/:id",api.getUser);

    // Update user
    app.post("/api/users/:id",api.updateUser);

    // Remove user
    app.delete("/api/users/:id",api.removeUser);
}

module.exports = router;