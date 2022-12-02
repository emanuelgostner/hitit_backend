const RoutinesController = require('./controllers/routines.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/routines', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        RoutinesController.insert
    ]);
    app.get('/routines/:userId', [
        ValidationMiddleware.validJWTNeeded,
        RoutinesController.listByUser
    ]);
    app.get('/routines', [
        RoutinesController.list
    ]);
    // app.get('/routines/:routineId', [
    //     ValidationMiddleware.validJWTNeeded,
    //     PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    //     PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    //     RoutinesController.getById
    // ]);
    app.patch('/routines/:routineId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        RoutinesController.patchById
    ]);
    app.delete('/routines/:routineId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        RoutinesController.removeById
    ]);
};
