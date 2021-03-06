/** @format */

const model = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// [x] signup
exports.signup = async (req, res, next) => {
	try {
		const model_check = await model.find({email: req.body.email});

		if (model_check.length >= 1) {
			return res.status(409).json({
				message: "User already exists",
			});
		} else {
			bcrypt.hash(req.body.password, 10, async (err, hash) => {
				const model_post = await model.create({
					email: req.body.email,
					password: hash,
					role: "user",
				});
				res.status(201).json({
					message: "User created successfully",
					model: model_post,
				});
			});
		}
	} catch (err) {
		res.status(500).json({
			error: err,
		});
	}
};
// [x] login
exports.login = async (req, res, next) => {
	try {
		const model_check = await model.findOne({email: req.body.email});
		if (model_check.length < 1) {
			return res.status(401).json({
				message: "Auth failed",
			});
		} else {
			bcrypt.compare(
				req.body.password,
				model_check.password,
				async (err, result) => {
					if (result) {
						const token = jwt.sign(
							{
								email: model_check.email,
								userId: model_check._id,
							},
							process.env.JWT_KEY,
							{expiresIn: "1h"}
						);
						return res.status(200).json({
							message: "Auth success",
							model: model_check,
							token: token,
						});
					} else {
						return res.status(401).json({
							message: "Auth failed",
						});
					}
				}
			);
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: err,
		});
	}
};

// [x] delete
exports.delete = async (req, res, next) => {
	try {
		const model_delete = await model.findOneAndDelete({
			_id: req.params.id,
			...filter,
		});
		res.status(200).json({
			message: "User deleted successfully",
			model: model_delete,
		});
	} catch (err) {
		res.status(400).json({message: err});
	}
};
