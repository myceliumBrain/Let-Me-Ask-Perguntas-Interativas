import { useParams, useHistory } from 'react-router-dom'

import Logo from "../assets/images/Logo.svg"
import Excluir from "../assets/images/Excluir.svg"
import Checkmark from "../assets/images/Checkmark.svg"
import Messages from "../assets/images/Messages.svg"


import { Button } from "../components/Button"
import { RoomCode } from "../components/RoomCode"
import { Question } from '../components/Question'


import '../styles/room.scss'
import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'

import { database } from "../services/firebase"; 

type RoomParams = {
    id: string
}

export function AdminRoom(){

   // const { user } = useAuth();
    const params = useParams<RoomParams>();
    
    const roomID = params.id;
    const history = useHistory()

    const { questions, title } = useRoom(roomID)


    async function handleEndRoom(){
        await database.ref(`rooms/${roomID}`).update({
            endedAt: new Date(),
        })

        history.push('/')
    }

    async function handleCheckQuestionAsAnswered(questionId:string){

            await database.ref(`rooms/${roomID}/questions/${questionId}`).update({
                isAnswered: true,
            })
        
    }

    async function handleHighlightQuestion(questionId:string){
      
            await database.ref(`rooms/${roomID}/questions/${questionId}`).update({
                isHighlighted: true,
            })
        
    }

    async function handleDeleteQuestion(questionId:string){
        if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")){
            await database.ref(`rooms/${roomID}/questions/${questionId}`).remove()
        }
    }

    return(
        <div id="pageRoom">
            <header>
                <div className="content">
                    <img src={Logo} alt="LetMeAsk"></img>
                    <div>
                        <RoomCode code={roomID}/>
                        <Button 
                            onClick={()=>handleEndRoom()}
                        >
                            Encessar sala
                        </Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="roomTitle">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 &&<span>{questions.length} perguntas</span>}
                </div>
                    
                    <div className='questionList'>
                        {questions.map((question)=>{
                            return(
                            <Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}   
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                    <button
                                   type="button"
                                   onClick={()=> handleCheckQuestionAsAnswered(question.id)}
                                   >
                                       <img src={Checkmark} alt="Marcar pergunta"></img>
                                   </button>
   
                                   <button
                                   type="button"
                                   onClick={()=> handleHighlightQuestion(question.id)}
                                   >
                                       <img src={Messages} alt="Destaque a pergunta"></img>
                                   </button>
                                   </>
                                )}
                                
                                   <button
                                   type="button"
                                   onClick={()=> handleDeleteQuestion(question.id)}
                                   >
                                       <img src={Excluir} alt="Excluir pergunta"></img>
                                   </button>
                                   
                                
                            </Question>
                            
                            )
                        })}
                        
                    </div>
                
            </main>
        </div>
    );
}