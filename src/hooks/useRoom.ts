import { useEffect, useState } from "react"
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionType = {
    id: string;
    author:{
        avatar: string;
        nome: string;     
    },
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number,
    likeId: string | undefined,
}

type FirebaseQuestions = Record<string, {
    author:{
        avatar: string,
        nome: string        
    },
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean,
    likes: Record<string, {
        authorId: string
    }>
}>

export function useRoom(roomID: string){
    const { user } = useAuth();
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')


    useEffect(()=> {
        const roomRef = database.ref(`rooms/${roomID}`)
        
        roomRef.on('value', room =>{
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value])=>{
                return{
                    id:key,
                    author: value.author,
                    content: value.content,
                    isAnswered: value.isAnswered,
                    isHighlighted: value.isHighlighted,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
        return () => {
            roomRef.off('value')
        }
    
    }, [roomID, user?.id]);

    return{questions, title}
}