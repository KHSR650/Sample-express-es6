import QuestionDataServiceProvider from "../services/QuestionDataServiceProvider";
import {generateTagsFromQuestion} from "../helpers/TagsGeneratorHelper";
exports.addQuestion = async (req,res,next)=>{
    try{
        const {question} = req.body;
        const tags = generateTagsFromQuestion(question);
        await QuestionDataServiceProvider.insertQuestion({question,tags});
        return res.status(201).json({
            success:true,
            message:"Question inserted successfully",
            data:{
                question,
                tags
            }
        })
    }catch(exception){
        console.log(exception)
        return res.status(500).json({
            success:false,
            message:exception
        })
    }
}
exports.listAllQuestions = async (req,res,next)=>{
    try{
        const questions = await QuestionDataServiceProvider.getAllQuestions();
        return res.status(201).json({
            success:true,
            message:"Questions fetched successfully",
            questions
        })
    }catch(exception){
        console.log(exception)
        return res.status(500).json({
            success:false,
            message:exception
        })
    }
}

exports.searchQuestion = async (req,res,next) => {
    try{
        let {question,limit=2}  = req.query;
        if(typeof limit ==='string') limit = parseInt(limit)
        const tags = generateTagsFromQuestion(question);
        let questions = await QuestionDataServiceProvider.getAllQuestionsByTags(tags,limit)
        questions = questions.map(e=>e.question)
        return res.status(200).json({
            success:true,
            message:"Successfully Fetched  Matched questions",
            questions:questions
        })
    }
    catch(exception){
        console.log(exception)
        return res.status(500).json({
            success:false,
            message:exception.message
        })
    }
}