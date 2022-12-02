const RoutineModel = require('../models/routines.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    try {
        RoutineModel.createRoutine(req.body)
            .then((result) => {
                res.status(201).send({user: result});
            });
    } catch (e) {
        console.log(e)
    }

};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    RoutineModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};
exports.listByUser = (req, res) => {
    const userId = req.params?.userId || ''
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    RoutineModel.listByUser(limit, page, userId)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    RoutineModel.findById(req.params.routineId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
    RoutineModel.patchRoutine(req.params.routineId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    RoutineModel.removeById(req.params.routineId)
        .then((result)=>{
            res.status(204).send({});
        });
};
