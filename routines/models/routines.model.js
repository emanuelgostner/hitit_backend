const mongoose = require('../../common/services/mongoose.service').mongoose;
require('../../users/models/users.model')
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const routineSchema = new Schema({
    title: String,
    intervals: Array,
    public: Boolean,
    creator: {
        type : ObjectId,
        ref : 'Users'
    }
});

routineSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
routineSchema.set('toJSON', {
    virtuals: true
});

routineSchema.findById = function (cb) {
    return this.model('Routine').find({id: this.id}, cb);
};

const Routine = mongoose.model('Routine', routineSchema);

exports.findByEmail = (email) => {
    return Routine.find({email: email});
};
exports.findById = (id) => {
    return Routine.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createRoutine = (routineData) => {
    const routine = new Routine(routineData);
    return routine.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        try {
            Routine.find({ public: true })
                .populate('creator')
                .limit(perPage)
                .skip(perPage * page)
                .exec(function (err, routines) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(routines);
                    }
                })
        } catch(e) {
            console.log(e)
        }
    });
};

exports.listByUser = (perPage, page, userId) => {
    return new Promise((resolve, reject) => {
        Routine.find({ creator: userId})
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, routines) {
                if (err) {
                    reject(err);
                } else {
                    resolve(routines);
                }
            })
    });
};

exports.patchRoutine = (id, routineData) => {
    return Routine.findOneAndUpdate({
        _id: id
    }, routineData);
};

exports.removeById = (routineId) => {
    return new Promise((resolve, reject) => {
        Routine.deleteMany({_id: routineId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

