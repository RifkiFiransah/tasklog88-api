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
 
  getAllUser: async(page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    try {
      const query = `
        SELECT * FROM user LIMIT :limit OFFSET :offset
      `
      const data = await sequelize.query(query, {
        replacements: {
          limit: limit,
          offset: offset
        },
        type: sequelize.QueryTypes.SELECT
      })

      return data;
      
    } catch (error) {
      throw new Error("Error fetching data: "+error.message)
    }
  },

  
  searchUser: async(keyword) => {
    const query = `
      SELECT * FROM user 
      WHERE username LIKE ? OR role LIKE ? OR nama_lengkap LIKE ? 
    `;

    const data = await sequelize.query(query, {
      replacements: [`%${keyword}%`, `%${keyword}%`,  `%${keyword}%`]
    });

    return data[0]
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
  postUser: async(username, password, nama_lengkap, role) => {
    const query = `
    INSERT INTO user (username, password, nama_lengkap, role) VALUES(?, ?, ?, ?)
    `
    const [result] = await sequelize.query(query, {
      replacements: [username, password, nama_lengkap, role]
    })

    return {
      id_user: result.insertId,
      username,
      password,
      nama_lengkap,
      role
    }
  },

  // Update data user
  updateUserById: async(username, password, nama_lengkap, role, userId) => {
    const query = `
    UPDATE user SET username = ?, password = ?, nama_lengkap = ?, role = ? WHERE id_user=?
    `;
    const [result] = await sequelize.query(query, {
      replacements: [username, password, nama_lengkap, role, userId]
    })

    return result.affectedRows > 0;
  },

  // Update data user without password
  updateUserWithoutPassword: async(username, nama_lengkap, role, userId) => {
    const query = `
      UPDATE user SET username = ?, nama_lengkap = ?, role = ? WHERE id_user = ?
    `;
    const [result] = await sequelize.query(query, {
      replacements: [username, nama_lengkap, role, userId]
    })

    return result.affectedRows > 0;
  },
  
  updateUserPassword: async(password, userId) => {
    const query = `
      UPDATE user SET password = ? WHERE id_user = ?
    `;
    const [result] = await sequelize.query(query, {
      replacements: [password, userId]
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