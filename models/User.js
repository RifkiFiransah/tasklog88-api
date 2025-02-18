import sequelize from "../config/config.js";

const User = {
  // Get all data users
  getAllUsers: async() => {
    // const query = `
    // SELECT * FROM user
    // `;
    // const result = await sequelize.query(query);
    // return {result}
    try {
      const query = `
        SELECT * FROM user
      `
      const data = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
      })

      const countQuery = `
        SELECT COUNT(*) AS total FROM user
      `
      const [countResult] = await sequelize.query(countQuery, {
        type: sequelize.QueryTypes.SELECT
      })

      console.log('Count Query Result: ', countResult);

      return {
        data,
        total: countResult.total
      };
      
    } catch (error) {
      throw new Error("Error fetching data: "+error.message)
    }
  },

  // Get data user by id
  getUserById: async(userId) => {
    const query = `
    SELECT * FROM user WHERE id_user = ?
    `;

    const result = await sequelize.query(query, {
      replacements: [userId],
      type: sequelize.QueryTypes.SELECT
    });
    return result[0]
  },

  // Post data user
  postUser: async(userData) => {
    const {username, password, nama_lengkap} = userData;
    const query = `
    INSERT INTO user (username, password, nama_lengkap) VALUES(?, ?, ?)
    `
    const [result] = await sequelize.query(query, {
      replacements: [username, password, nama_lengkap]
    })

    return {
      id_user: result.insertId,
      ...userData
    }
  },

  // Update data user
  updateUserById: async(userData, userId) => {
    const {username, password, nama_lengkap} = userData;
    const query = `
    UPDATE user SET username = ?, password = ?, nama_lengkap = ? WHERE id_user=?
    `;
    const [result] = await sequelize.query(query, {
      replacements: [username, password, nama_lengkap, userId]
    })

    return result.affectedRows > 0;
  },

  // Delete data user
  deleteUserById: async(userId) => {
    const query = `
    DELETE FROM user WHERE id_user = ?
    `;

    const [result] = await sequelize.query(query, {
      replacements: [userId]
    });

    return result.affectedRows > 0;
  }
}

export default User