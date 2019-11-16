import SMERouter from 'sme-router'
import * as indexControllers from '../controllers/index'
import * as positionController from '../controllers/position'
import activeMiddleware from './active'

const router = new SMERouter('router-view')

router.route('/',indexControllers.render)
router.route('/position/:_',positionController.render)
router.route('/position_add',positionController.add)
router.route('/position_update/:id',positionController.update)
router.route('*', (req, res, next) => {
    res.redirect('/')
})
router.use(activeMiddleware)