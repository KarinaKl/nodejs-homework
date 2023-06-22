const express = require('express')

const {auth, validation, ctrlWrapper} = require("../../middlrwares");
const {joiSchema, favoriteJoiSchema} = require("../../models/contact");
const {contacts: ctrl} = require("../../controllers");

const router = express.Router()

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:id', auth, ctrlWrapper(ctrl.getById));

router.post('/', auth, validation(joiSchema), ctrlWrapper(ctrl.add));

router.put('/:id', auth, validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:id/favorite', auth, validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateFavorite));

router.delete('/:id', auth, ctrlWrapper(ctrl.removeById));

module.exports = router;
