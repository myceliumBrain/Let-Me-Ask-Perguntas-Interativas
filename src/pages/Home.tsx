import Illustration from "../assets/images/Illustration.svg"
import Logo from "../assets/images/Logo.svg"
import IconGoogle from "../assets/images/IconGoogle.svg"
import Login1 from "../assets/images/Login1.svg"

import "../styles/auth.scss"

import { Button } from "../components/Button"

import { useHistory } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"
import { FormEvent, useState } from "react"
import { database } from "../services/firebase"


export function Home(){

    const history = useHistory();
    const {user, signInWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState('');


    async function handleCreateRoom(){
        if(!user){
           await signInWithGoogle()
        }        

        history.push("/room/newRoom")
       
    }


    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if(roomCode.trim() ===""){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()){
            alert("Room does not exist :l")
            return;
        }

        if(roomRef.val().endedAt){
            alert('Room Alreded Closed')
            return;
        }

        history.push(`/rooms/${roomCode}`)

    }

    return(
        <div id="page-auth">
            <aside>
                <img src={Illustration} alt="Ilustração"></img>
                <strong>Toda pergunta tem uma resposta.</strong>
                <p>Aprenda a compratilhar conhecimento com outras pessoas</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={Logo}></img>
                        <button onClick={handleCreateRoom} className="create-room">
                        <img src={IconGoogle} alt="Ícone do Google"></img>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                            onChange={event=>setRoomCode(event.target.value)}
                            value={roomCode}
                            >
                            
                        </input>
                        <Button type="submit">
                            <img src= {Login1} alt="Ícone de Log-in"></img>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}