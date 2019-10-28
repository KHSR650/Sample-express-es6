import QuestionModel from "../models/QuestionsModel"
class QuestionDataServiceProvide {

    constructor(){
    }

    async insertQuestion(data){
        return new QuestionModel(data).save()
    }
    async getAllQuestions(){
        return QuestionModel.find({})
    }
    async getAllQuestionsByTags(tags,limit){
        return QuestionModel.aggregate([
            {
                $match: {
                    tags: {
                        $in: tags
                    }
                }
            }, 
            {
                $unwind: "$tags"
            }, 
            {
                $match: {
                    tags: {
                        $in: tags
                    }
                }
            }, 
            {
                $group: {
                    _id:{"question":"$question"}, 
                    matches:{
                    $sum:1
                    }
                }
            }, 
            {$sort:{matches:-1}},
            {
                $project:{
                    "question":"$_id.question",
                    "matches":-1
                }
            },{
                $limit:limit
            }
        ]
        );
    }
}

export default new QuestionDataServiceProvide()