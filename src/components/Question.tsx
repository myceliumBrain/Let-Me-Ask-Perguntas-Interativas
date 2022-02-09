import { ReactNode } from 'react'

import '../styles/question.scss'

type questionProps = {
    content: string,
    author:{
        nome: string,
        avatar: string
    }
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean; 

}

export function Question({
    content,
    author,
    isAnswered,
    isHighlighted,
    children,
}: questionProps){
    return(
        <div className={`question ${isAnswered ? 'answered': ''} ${isHighlighted ? 'highlighted' : '' }`}>
            <p>{content}</p>
            <footer>
                <div className="userInfo">
                    <img src={author.avatar} alt={author.nome}></img>
                    <span>{author.nome}</span>
                </div>
                <div>{children}</div>
            </footer>
        </div>
    )
}