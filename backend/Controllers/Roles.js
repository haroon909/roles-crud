const { M_Roles } = require("../Models/Role_model"); // Correctly import M_Roles

// GET method to retrieve all roles
async function Get_Role(req, res) {
  try {
    const allRoles = await M_Roles.find();
    return res.status(200).send({ "Data": allRoles });
  } catch (error) {
    console.error(error);
    res.status(500).send({ "error": "An error occurred while retrieving roles" });
  }
}

// POST method to create a new role
async function Post_Role(req, res) {
  try {
    const { roleName, roleStatus } = req.body;

    const roleName_Checker = /^(?! )[A-Za-z ]+(?<! )$/;
    const roleStatus_Checker = /^(active|nonactive)$/;

    if (!roleName_Checker.test(roleName)) {
      return res.status(400).send({ "error": "Role name must contain only characters and no extra spaces" });
    }

    if (!roleStatus_Checker.test(roleStatus)) {
      return res.status(400).send({ "error": "Status must be either 'active' or 'nonactive'" });
    }

    const existingRole = await M_Roles.findOne({ roleName: roleName.toLowerCase() });
    if (existingRole) {
      return res.status(400).send({ "error": "Role already exists in the database" });
    }

    const newRole = await M_Roles.create({
      roleName: roleName.toLowerCase(),
      status: roleStatus
    });

    return res.status(201).send({
      "data": newRole,
      "message": "User Role Added Successfully!"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ "error": "An error occurred while adding the role" });
  }
}

// DELETE method to delete a role by roleName
async function Delete_Role(req, res) {
  try {
    const roleDel_Name = req.params.id.toLowerCase();

    const existingRole = await M_Roles.findOne({ roleName: roleDel_Name });
    if (!existingRole) {
      return res.status(404).send({ "error": "Role not available" });
    }

    await M_Roles.deleteOne({ roleName: roleDel_Name });
    return res.status(200).send({ "message": "Role deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ "error": "An error occurred while deleting the role" });
  }
}

// UPDATE method to update a role by roleName
async function Update_Role(req, res) {
  try {
    const { roleName, status } = req.body;
    const roleDel_Name = req.params.id.toLowerCase();

    const existingRole = await M_Roles.findOne({ roleName: roleDel_Name });
    if (!existingRole) {
      return res.status(404).send({ "error": "Role not found" });
    }

    const updateData = await M_Roles.updateOne(
      { roleName: roleDel_Name },
      {
        $set: {
          roleName: roleName.toLowerCase(),
          status: status
        }
      }
    );

    return res.status(200).send({ "message": "Role updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ "error": "An error occurred while updating the role" });
  }
}

module.exports = { Get_Role, Post_Role, Delete_Role, Update_Role };
