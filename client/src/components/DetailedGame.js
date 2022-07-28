import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, clearSearch, getGameDetail } from "../actions";
import estilo from "./styles/detailCard.module.css"
import { Link } from "react-router-dom"
import loadingLogo from "../imgs/loading.png"

export default function DetailedGame(props) {

    const dispatch = useDispatch()
    const id = props.match.params.id
    const { gameDetail } = useSelector(state => state)

    useEffect(() => {
        dispatch(getGameDetail(id))
        dispatch(clearSearch())
        return () => dispatch(clearDetail())
    }, [dispatch, id])

    const objkeys = Object.keys(gameDetail)



    const classRate = () => {
        if (gameDetail.rating > 4) {
            return estilo.ratingGreen
        }
        else if (gameDetail.rating < 2) {
            return estilo.ratingRed
        }
        else return estilo.ratingYellow
    }

    return (

        <div className={estilo.fondo}>
            <div className={estilo.div}>


                {objkeys.length === 0 ?
                    <div className={estilo.cardsPaginate}>
                        <div className={estilo.contenedorLoading}><img className={estilo.loading} src={loadingLogo} alt="loading" /> </div>
                    </div>
                    :

                    <div className={estilo.contenedor} >
                        <div className={estilo.imagen}>
                            <img className={estilo.img} src={gameDetail.image} alt={gameDetail.name} />
                        </div>
                        <div className={estilo.gradiente}>
                            <div className={estilo.titulo}>
                                <h1>{gameDetail.name}</h1>
                                <label className={estilo.date}>Released At: {gameDetail.releaseDate}</label>
                                <div className={estilo.dateS}><label>Genres: {gameDetail.genres?.map((genre, index) => <label key={index}>{genre.name ? genre.name : genre} </label>)}</label></div>
                            </div>

                            <div className={estilo.description}>
                                <p>{gameDetail.description}</p>
                            </div>
                            <div className={estilo.platforms}><label>Platforms:</label> {gameDetail.platforms?.map((d, index) => <label key={index} className={estilo.platformsText}>{d}</label>)}</div>

                            <div className={estilo.buttonContainer}>
                                <Link to="/home"><button className={estilo.button} ><i className="fa-solid fa-chevron-left"></i> <i className="fa-solid fa-house-chimney"></i> volver </button></Link>
                            </div>
                            <div className={classRate()} >
                                <p>{gameDetail.rating}🟊</p>
                            </div>
                        </div>
                    </div>

                }


            </div>
        </div>
    )
}

