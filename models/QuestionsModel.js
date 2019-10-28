import mongoose from "mongoose"

const QuestionDataSchema = mongoose.Schema({
    question:{
        type: String,
        required:true,
        unique:true
    },
    tags:{
        type:[String],
        default:[],
        index:true
    }
},{
    versionKey:false,
    createAt:true,
    updatedAt:true
});

export default mongoose.model('Question',QuestionDataSchema,'questions')
