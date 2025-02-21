import sequelize from "../config/config.js";

const Project = {
  // Get All Project
  getAllProjects: async() => {
    try {
      const query = `
        SELECT * FROM project
      `
      const data = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
      })

      const countQuery = `
        SELECT COUNT(*) AS total FROM project
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

  getAllProject: async(page = 1, limit = 10) => {
    try {
      const offset = (page - 1) * limit;
      const query = `
      SELECT * FROM project LIMIT :limit OFFSET :offset
      `;
      const data = await sequelize.query(query, {
        replacements: {
          limit: limit,
          offset: offset
        },
        type: sequelize.QueryTypes.SELECT
      })

      return {
        data
      };
    } catch (error) {
      throw new Error("Error fetching data: "+error.message);
    }
  },

  searchProject: async(keyword) => {
    const query = `
      SELECT * 
        FROM project
      WHERE nama_project LIKE ? OR status_project LIKE ? 
    `;

    const data = await sequelize.query(query, {
      replacements: [`%${keyword}%`, `%${keyword}%`,]
    });

    return {
      data
    }
  },
  
  // Get Project by id
  getProjectById: async(projectId) => {
    const query = `
      SELECT * FROM project WHERE id_project = ?
    `;
    const data = await sequelize.query(query, {
      replacements: [projectId]
    });

    return data[0];
  },

  // Add new Project
  postProject: async(projectData) => {
    const { nama_project, tgl_mulai_project, tgl_akhir_project, status_project } = projectData
    const query = `
    INSERT INTO project (nama_project, tgl_mulai_project, tgl_akhir_project, status_project) 
    VALUES(?, ?, ?, ?)`;
    const [result] = await sequelize.query(query, {
      replacements: [nama_project, tgl_mulai_project, tgl_akhir_project, status_project]
    })

    return {
      id_project: result.insertId,
      ...projectData
    }
  },

  // update Project by id
  updateProjectById: async(projectData, projectId) => {
    const {nama_project, tgl_mulai_project, tgl_akhir_project, status_project} = projectData;
    const query = `
      UPDATE project SET nama_project = ?, tgl_mulai_project = ?, tgl_akhir_project = ? , status_project = ?
      WHERE id_project = ?
    `;
    const [result] = await sequelize.query(query, {
      replacements: [nama_project, tgl_mulai_project, tgl_akhir_project, status_project, projectId]
    });

    return result.affectedRows > 0;
  },

  // delete Project by id
  deleteProjectById: async (projectId) => {
    const query = `
      DELETE FROM project WHERE id_project = ?
    `;
    const [result] = await sequelize.query(query, {
      replacements: [projectId]
    });

    return result.affectedRows > 0;
  }
}

export default Project;