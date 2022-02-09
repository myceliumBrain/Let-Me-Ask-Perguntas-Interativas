import Illustration from "../assets/images/Illustration.svg"
import Logo from "../assets/images/Logo.svg"

import "../styles/newRoom.scss"

import { FormEvent, useState } from "react"

import {Button} from "../components/Button"

import { Link, useHistory } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"

import { database } from '../services/firebase'


export function NewRoom(){


    const { user } = useAuth();
    const history = useHistory()
    const [ newRoom, setNewRoom ] = useState('')

    async function handleCreateRoom(event:FormEvent){
        event.preventDefault();
    
        if(newRoom.trim() === ""){
            return
        }

        const roomRef = database.ref('rooms')


        const firebaseRoom = await roomRef.push({
            userID:user?.id,
            userName:user?.name,
            roomID:newRoom
        })

        history.push(`./rooms/${firebaseRoom.key}`)

    }

    return(
        <div id="page-newRoom">
            <aside>
                <img src={Illustration} alt="Ilustração"></img>
                <strong>Toda pergunta tem uma resposta.</strong>
                <p>Aprenda a compratilhar conhecimento com outras pessoas</p>
            </aside>
            <main>
            

                <div className="main-content">
                    <img src={Logo}></img>
                    <h3>Olá, {user?.name}</h3>
                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala" 
                            onChange={event=>setNewRoom(event.target.value)}
                            value={newRoom}>
                        </input>
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? 
                        <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}