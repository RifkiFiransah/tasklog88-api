import Pengerjaan from "../models/Pengerjaan.js";

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
  const pengerjaanData = req.body;

  try {
    const result = await Pengerjaan.addPengerjaan(pengerjaanData);
    
    res.status(201).json({
      status: 'success',
      data: result,
      message: 'created data pengerjaan success'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};