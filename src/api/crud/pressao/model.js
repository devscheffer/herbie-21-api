/** @format */

const mongoose = require("mongoose");

const schema_pressao = new mongoose.Schema(
	{
		date: {
			type: Date,
			default: Date.now,
			required: true,
		},
		position: {
			type: String,
			required: true,
            enum: ['fl','fr','bl','br']
		},
		pressure_old: {
			type: Number,
			required: true,
		},
		pressure_new: {
			type: Number,
			required: true,
		},
		observation: {
			type: String,
			required: false,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},
	{collection: "pressao"}
);

module.exports = mongoose.model("pressao", schema_pressao);
