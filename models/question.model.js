const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
	text: String,
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
});

const QuestionSchema = new Schema({
	text: String,
	createdAt: {type: Date, default: Date.now},
	answers: [AnswerSchema]
});

const Question = mongoose.model("Question", QuestionSchema);
const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = {
    Question: Question,
    Answer: Answer
};