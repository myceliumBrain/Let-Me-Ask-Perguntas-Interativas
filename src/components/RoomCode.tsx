import Copy from "../assets/images/Copy.svg"

import "../styles/roomCode.scss"



type RoomCodeProps = {
    code: string;
}


export function RoomCode(props: RoomCodeProps){

    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code)
    }

    return(
       <div>
            <button className="roomCode" onClick={copyRoomCodeToClipboard}>
                <div>
                    <img src={Copy} alt="Copiar imagem" ></img>
                </div>
                <span>sala #{props.code}</span>
            </button>
       </div>
    )
}