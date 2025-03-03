import Pengerjaan from "../models/Pengerjaan.js";
import LogPengerjaan from "../models/LogPengerjaan.js";
import path from "path";
import fs from "fs";

export const getAllPengerjaans = async(req, res) => {
  try {
    const {data, total} = await Pengerjaan.getAllPengerjaans();

    res.status(200).json({
      status: 'success',
      data,
      total,
      message: "fetched all data pengerjaan success"
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

export const getAllPengerjaan = async(req, res) => {
  const {page = 1, limit = 10 } = req.query

  try {
    const data = await Pengerjaan.getAllPengerjaan(parseInt(page), parseInt(limit));

    res.status(200).json({
      status: 'success',
      data,
      message: "fetched limit data pengerjaan success"
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

export const getPengerjaanById = async(req, res) => {
  const {id_pengerjaan} = req.params;
  try {
    const result = await Pengerjaan.getPengerjaanById(parseInt(id_pengerjaan));

    if(result) {
      res.status(200).json({
        status: 'success',
        data: result,
        message: 'fetched data pengerjaan by id success'
      })
    } else {
      res.status(404).json({
        status: 'error',
        data: result,
        message: 'not found data pengerjaan by id'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

export const countPengerjaan = async(req, res) => {
  const {id_user} = req.params

  try {
    const result = await Pengerjaan.countPengerjaanByIdUser(parseInt(id_user));

    if(result) {
      res.status(200).json({
        status: 'success',
        data: result,
        message: 'fetched data pengerjaan by id user'
      })
    } else {
      res.status(404).json({
        status: 'error',
        message: 'not found data pengerjaan by id user'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}

export const getPengerjaanByTaskId = async(req, res) => {
    const {id_task} = req.params;
  try {
    const result = await Pengerjaan.getPengerjaanByTaskId(parseInt(id_task))

    if(result) {
      res.status(200).json({
        status: 'message',
        data: result,
        message: 'fetched data pengerjaan by id task success'
      })
    } else {
      res.status(404).json({
        status: 'error',
        data: result,
        message: 'not found data pengerjaan by id task'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

export const getDetailPengerjaanByTaskId = async(req, res) => {
  const {id_task, id_pengerjaan} = req.params;
  try {
    const result = await Pengerjaan.getDetailPengerjaanByTaskId(parseInt(id_task), parseInt(id_pengerjaan));

    if(result) {
      res.status(200).json({
        status: 'success',
        data: result,
        message: 'fetched detail data pengerjaan success'
      })
    } else {
      res.status(404).json({
        status: 'error',
        message: 'not found detail data pengerjaan'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

export const postPengerjaan = async(req, res) => {
  console.log("Body Data:", req.body);
  
  const today = new Date().toISOString().split('T')[0];
  const { id_task, catatan = "-", jenis_catatan = "", tgl_pengerjaan = today } = req.body;
  const file_github = req.files?.file_github ? req.files.file_github[0].path : null;
  const file_ss = req.files?.file_ss ? req.files.file_ss[0].path : null;
  
  // console.log("Files Data:", req.file_github);
  if (!file_github || !file_ss) {
    return res.status(400).json({
      status: "error",
      message: "Both 'file_github' and 'file_ss' are required!"
    });
  }

  const pengerjaanData = {id_task, file_github, file_ss, catatan, jenis_catatan, tgl_pengerjaan}

  try {
    const result = await Pengerjaan.addPengerjaan(pengerjaanData);
    const logResult = await LogPengerjaan.addLogPengerjaan(result.id, pengerjaanData)
    
    res.status(201).json({
      status: 'success',
      data: {
        pengerjaan: result,
        log_pengerjaan: logResult,
      },
      message: 'created data pengerjaan success'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

export const updatePengerjaanByid = async (req, res) => {
  console.log("Body Data:", req.body);
  console.log("Files Data:", req.files);

  const {id_pengerjaan} = req.params;
  const {id_task} = req.body;
  const file_github_new = req.files?.file_github ? req.files.file_github[0].path : null;
  const file_ss_new = req.files?.file_ss ? req.files.file_ss[0].path : null;

  try {
    // ambil data lama di database
    const pengerjaanOld = await Pengerjaan.getPengerjaanById(parseInt(id_pengerjaan));
    if (!pengerjaanOld) {
      return res.status(404).json({
        status: "error",
        message: "Pengerjaan not found!"
      });
    }

    // Cek apakah ada file baru
    if (file_github_new && pengerjaanOld.file_github) {
      const filePathGithub = path.normalize(pengerjaanOld.file_github);
      console.log("Cek Path File Github:", filePathGithub);
    
      if (fs.existsSync(filePathGithub)) {
        fs.unlinkSync(filePathGithub);
        console.log(`File lama file_github (${pengerjaanOld.file_github}) dihapus`);
      } else {
        console.log("File Github lama tidak ditemukan:", filePathGithub);
      }
    }
    
    if (file_ss_new && pengerjaanOld.file_ss) {
      const filePathSs = path.normalize(pengerjaanOld.file_ss);
      console.log("Cek Path File SS:", filePathSs);
    
      if (fs.existsSync(filePathSs)) {
        fs.unlinkSync(filePathSs);
        console.log(`File lama file_ss (${pengerjaanOld.file_ss}) dihapus`);
      } else {
        console.log("File SS lama tidak ditemukan:", filePathSs);
      }
    }

    const pengerjaanData = {
      id_task,
      file_github: file_github_new || pengerjaanOld.file_github,
      file_ss: file_ss_new || pengerjaanOld.file_ss,
    }

    const result = await Pengerjaan.updatePengerjaanByPengerjaanIdUser(pengerjaanData, parseInt(id_pengerjaan))

    res.status(200).json({
      status: 'success',
      data: result,
      message: "updated data pengerjaan successfully"
    })
  } catch (error) {
    console.error("Error message: ", error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }

}

export const postLogPengerjaan = async(req, res) => {
  const {id_pengerjaan} = req.params;
  const pengerjaanData = req.body;

  try {
    const data = await LogPengerjaan.addLogPengerjaan(id_pengerjaan, pengerjaanData)

    res.status(201).json({
      status: 'success',
      data,
      message: 'created data pengerjaan success'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}