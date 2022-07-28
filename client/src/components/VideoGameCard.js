import React from "react";
import { Link } from "react-router-dom"
import estilo from "./styles/gameCard.module.css"

export default function VideoGameCard(props) {
    return (

        <Link to={`/games/${props.id}`} style={{ textDecoration: 'none' }}>
            <div className={estilo.card} key={props.id}>
                
                <p className={estilo.rating}>{props.rating} 🟊</p>
                <img className={estilo.img} src={props.image} alt={props.name} />
                    

                <div className={estilo.partedeabajo}>
                    <p className={estilo.titulo}>{props.name}</p>
                    <div className={estilo.genreBox}>
                        {props.genres?.map((g, index) => {
                            const name= g.name? g.name : g
                            if (name.length > 11) {
                                return (<p key={index} className={estilo.genres}>{"MMO"}</p>)
                            }
                            return (<p key={index} className={estilo.genres}>{name}</p>)
                        })}
                    </div>

                </div>
            </div>
        </Link>
    )
}


