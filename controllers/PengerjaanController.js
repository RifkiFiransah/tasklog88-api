import Pengerjaan from "../models/Pengerjaan.js";
import LogPengerjaan from "../models/LogPengerjaan.js";

export const getAllPengerjaan = async(req, res) => {
  try {
    const result = await Pengerjaan.getAllPengerjaan();

    res.status(200).json({
      status: 'success',
      data: result,
      message: "fetched all data pengerjaan success"
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

  const { id_task, catatan, jenis_catatan, tgl_pengerjaan } = req.body;
  const file_github = req.files?.file_github ? req.files.file_github[0].path : null;
  const file_ss = req.files?.file_ss ? req.files.file_ss[0].path : null;

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
        result,
        logResult
      },
      message: 'created data pengerjaan success'
    });
  } catch (error) {
    console.log("Files Data:", file_github);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

export const postLogPengerjaan = async(req, res) => {
  const {id_pengerjaan} = req.params;
  const pengerjaanData = req.body;

  try {
    const result = await LogPengerjaan.addLogPengerjaan(id_pengerjaan, pengerjaanData)

    res.status(201).json({
      status: 'success',
      data: {
        result,
      },
      message: 'created data pengerjaan success'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}