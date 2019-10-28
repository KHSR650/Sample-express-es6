import questions from "./allquestions.json"
import request from "request"

go()
async function go(){
    for (let i = 0; i < questions.length; i++) {
        console.log(i)
        try{
            const res = await insertQuestion(questions[i].question)
            console.log(res)
        }
        catch(error){
            console.log(error)
        }
        
    }
}

async function insertQuestion(question){
    var options = {
        method: 'POST',
        url: 'http://localhost:3000/questions',
        body: { question: question },
        json: true
    };
    return new Promise((resolve,reject)=>{
        request(options,  (error, response, body) =>  {
            if (error) {
                reject(error)
            }
            if (response.statusCode != 201) {
                reject('Invalid status code <' + response.statusCode + '>');
            }
            resolve(body);
        });
    });
}
