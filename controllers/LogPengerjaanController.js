import LogPengerjaan from "../models/LogPengerjaan.js";

export const getAllLogPengerjaanByUser = async(req, res) => {
  const {id_user} = req.params;

  try {
    const data = await LogPengerjaan.getAllLogPengerjaanByUser(parseInt(id_user));

    if(data) {
      res.status(200).json({
        status: 'success',
        data,
        message: 'Fetched data log pengerjaan by user success'
      })
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Log pengerjaan by user not found'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}

export const getLogPengerjaanByIdLog = async(req, res) => {
  const { id_log_pengerjaan} = req.params
  try {
    const data = await LogPengerjaan.getLogPengerjaanByIdLog(parseInt(id_log_pengerjaan));

    if(data) {
      res.status(200).json({
        status: 'success',
        data,
        message: 'Fetched data log pengerjaan by id log success'
      })
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Log pengerjaan by id log not found'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}

export const getLogPengerjaanByIdPengerjaan = async(req, res) => {
  const { id_pengerjaan} = req.params
  try {
    const data = await LogPengerjaan.getLogPengerjaanByIdPengerjaan(parseInt(id_pengerjaan));

    if(data) {
      res.status(200).json({
        status: 'success',
        data,
        message: 'Fetched data log pengerjaan by id pengerjaan success'
      })
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Log pengerjaan by id pengerjaan not found'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}

export const getDetailLogPengerjaan = async(req, res) => {
  const { id_log_pengerjaan, id_pengerjaan} = req.params
  try {
    const data = await LogPengerjaan.getDetailLogPengerjaan(parseInt(id_log_pengerjaan), parseInt(id_pengerjaan));

    if(data) {
      res.status(200).json({
        status: 'success',
        data,
        message: 'Fetched data log pengerjaan by id pengerjaan success'
      })
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Log pengerjaan by id pengerjaan not found'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}