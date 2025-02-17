import User from "../models/User.js";

// Get all data users
export const GetAllUsers = async(req, res) => {
  try {
    const {data, total} = await User.getAllUsers()

    res.status(200).json({
      status: 'success',
      project: {
        data,
        totalData: total
      },
      message: "User fetched successfully"
    });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

// Get data user by id
export const GetUserById = async(req, res) => {
  const {id_user} = req.params
  try {
    const result = await User.getUserById(parseInt(id_user));

    if(result){
      res.status(200).json({
        status: 'success',
        data: result,
        message: 'User fetched successfully'
      })
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'user not found'
      })
    }
  } catch (error) {
    console.error("Error get User by id: ", id_user);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

// Add new user data
export const AddUser = async(req, res) => {
  const {id_user} = req.params;
  const userData = req.body;

  try {
    const result = await User.postUser(userData, parseInt(id_user));

    res.status(201).json({
      status: 'success',
      data: result,
      message: 'User created successfully'
    });
  } catch (error) {
    console.error("Error add User: ", error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

// Update data user by id
export const UpdateUserById = async(req, res) => {
  const {id_user} = req.params;
  const userData = req.body;
  try {
    const result = await User.updateUserById(userData, parseInt(id_user));

    res.status(200).json({
      status: 'success',
      data: result,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error("Error update user by id: ", error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

// Delete data user by id
export const DeleteUserById = async(req, res) => {
  const {id_user} = req.params;
  try {
    const result = await User.deleteUserById(parseInt(id_user));
    res.status(200).json({
      status: 'success',
      data: result,
      message: 'User deleted successfully'
    })
  } catch (error) {
    console.error("Error delete User by id: ", error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}