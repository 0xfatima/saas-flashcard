import {NextResponse} from 'next/server'
import Groq from 'groq-sdk'



const systemPrompts=`you are a flash card creator.
1. You are creating educational flashcards for the given topic
2. The difficulty level should be easy. 
3. For each card, put a clear question or prompt for the front,
   and the concise answer or explanation for the back.
4. Focus on key concepts, ensure clarity, and use simple language.
5. when appropriate, use memory aids to help reinforce the information.
6.If given the body of text, extract the most improtant and relevent information for cards. 
7. Review and format the cards to ensure they are effective for learning.
8. generate 10 cards
Return that data in following JSON format
{
    "flashcard":[
        {
            "front":str,
            "back":str
        }
    ]

}

`
const client= new Groq({apiKey:process.env.GROQ_API_KEY})

export async function POST(req){
    
    const data= await req.text();

    try{
        console.log(data)
        const response= await client.chat.completions.create(
          {
            messages:[
                {role:'system', content:systemPrompts}
                ,{role:'user', content:data}],
            model:'llama3-8b-8192',
            stream:false,
            response_format:{type:'json_object'}
          }
        )
        
        const flashcards= JSON.parse(response.choices[0]?.message?.content);
        return NextResponse.json(flashcards.flashcard)
      
 
    }catch(err){
       return NextResponse.json({status:500})
    }


}

