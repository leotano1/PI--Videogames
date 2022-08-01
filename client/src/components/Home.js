import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, getGameByName, clearSearch, sortGameByName, sortGameGenre, clearDetail, clearAllGames, badSearch } from "../actions";
import estilo from "./styles/home.module.css"
import Paginacion from "./paginacion";
import VideoGameCard from "./VideoGameCard"
import { Link } from "react-router-dom";
import loadingLogo from "../imgs/loading.png"
import notfound from "../imgs/notfound.png"


export default function Home() {

    /////////////////////////////   ESTADO LOCAL   //////////////////////////////////////   

    const [search, setSearch] = useState({ name: "" }) /// estado del buscador ///
    const [pagina, setPagina] = useState(1)            /// estado del paginado ///
    const [loading, setLoading] = useState(false)


    ////////////////////////   ME TRAIGO EL ESTADO GLOBAL  //////////////////////////////   

    const { allGames } = useSelector(state => state)
    const { gamesByName } = useSelector(state => state)

    ///////////////////////////// DESPACHO LA ACTION ////////////////////////////////////

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllGames(setLoading))
        /* return () => {
            dispatch(clearAllGames())
        } */
    }, [])
   

    //////////////////////////////////////////////////////////////////////////////////////////
    
    const porPagina = 15
    let maximo = Math.round( gamesByName.length / porPagina)

    //////////////////////////// FUNCIONES DEL BUSCADOR ///////////////////////////////// 

    const disablePrev = () => {
        if (pagina === 1) return true
        else return false
    }
    const disableNext = () => {
        if (pagina === maximo) return true
        else return false
    }

    /////////////////////////////////////////////////////////////////////////////////////

    function onChange(e) {
        setSearch({
            ...search,

            [e.target.name]: e.target.value
        })
    }

    function onSubmit(e) {
        e.preventDefault()
        setPagina(1)
        dispatch(clearSearch())
        dispatch(getGameByName(setLoading,search.name))
    }

    function clear() {
        setSearch({
            ...search,
            name: ""
        })
        setPagina(1)

        dispatch(clearSearch())
    }



    /////////////////////////////////////////  FILTRO POR GENERO  ///////////////////////////////////////////////////  

    function genreFilter(e) {
        let gameSorted = allGames.filter(g => g.genres.includes(e.target.value))
        dispatch(sortGameGenre(gameSorted))
        setPagina(1)
        
    }

    ////////////////////////////////////////  ORDENAMIENTO ALFABETICO  //////////////////////////////////////////////

    function sortByName(e) {
        if (e.target.value === "A-Z") {
            let gameSorted = (gamesByName.length === 0 ? allGames : gamesByName).sort((game1, game2) => {
                if (game1.name.toLowerCase() < game2.name.toLowerCase()) {
                    return -1
                } else if (game1.name.toLowerCase() > game2.name.toLowerCase()) {
                    return 1
                } else {
                    return 0
                }
            })
            dispatch(sortGameByName(gameSorted))
            setPagina(1)
        }

        if (e.target.value === "Z-A") {
            let gameSorted = (gamesByName.length === 0 ? allGames : gamesByName).sort((game1, game2) => {
                if (game1.name.toLowerCase() < game2.name.toLowerCase()) {
                    return 1
                } else if (game1.name.toLowerCase() > game2.name.toLowerCase()) {
                    return -1
                } else {
                    return 0
                }
            })
            dispatch(sortGameByName(gameSorted))
            setPagina(1)
        }
    }

    //////////////////////////////////////  ORDENAMIENTO POR RATE  //////////////////////////////////////////

    function sortByRate(e) {
        if (e.target.value === "poor") {
            let gameSorted = (gamesByName.length === 0 ? allGames : gamesByName).sort((game1, game2) => {
                if (game1.rating < game2.rating) {
                    return -1
                } else if (game1.rating > game2.rating) {
                    return 1
                } else {
                    return 0
                }
            })
            dispatch(sortGameByName(gameSorted))
            setPagina(1)
        }

        if (e.target.value === "best") {
            let gameSorted = (gamesByName.length === 0 ? allGames : gamesByName).sort((game1, game2) => {
                if (game1.rating < game2.rating) {
                    return 1
                } else if (game1.rating > game2.rating) {
                    return -1
                } else {
                    return 0
                }
            })

            dispatch(sortGameByName(gameSorted))
            setPagina(1)
        }

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const nextPage = () => {
        if (pagina === maximo) return
        setPagina(pagina + 1)
    }
    const prevPage = () => {
        if (pagina === 1) return
        setPagina(pagina - 1)
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////                                           //////////////////////////////////////////////////////
    ////////////////////////////////    ACA EMPIEZA A RENDERIZAR LA PAGINA     //////////////////////////////////////////////////////
    ////////////////////////////////                                           //////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <div className={estilo.fondo}>

            <div className={estilo.ordenador}>
                <select className={estilo.select} onChange={sortByName}>
                    <option> Alphabetical order </option>
                    <option value="A-Z" > A-Z</option>
                    <option value="Z-A"> Z-A</option>
                </select>


                <select className={estilo.select} name="genre" onChange={genreFilter}>
                    <option> Order by Genre </option>
                    <option value="Action">Action</option>
                    <option value="Indie">Indie</option>
                    <option value="Adventure">Adventure</option>
                    <option value="RPG">RPG</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Casual">Casual</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Racing">Racing</option>
                    <option value="Massively Multiplayer">Massively Multiplayer</option>
                    <option value="Sports">Sports</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Family">Family</option>
                    <option value="Board Games">Board Games</option>
                    <option value="Educational">Educational</option>
                    <option value="Card">Card</option>
                </select>


                <select className={estilo.select} onChange={sortByRate}>
                    <option> Order by Rating </option>
                    <option value="best"> best rated</option>
                    <option value="poor"> poor rated</option>
                </select>


                <Link to="/create"><button className={estilo.button}><i className="fa-solid fa-circle-plus"></i> Add Game</button></Link>
                <button className={estilo.button} type="button" onClick={clear}><i className="fa-solid fa-trash-can"></i>  Clear Filters</button>

                <form onSubmit={onSubmit}>
                    <input className={estilo.searchbar} placeholder="Search..." type="text" name="name" value={search.name} onChange={onChange}></input>
                    <button className={estilo.searchButton} type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>

                </form>
            </div>


            
            {loading?
                <div className={estilo.cardsPaginate}>
                    <div className={estilo.contenedorLoading}><img className={estilo.loading} src={loadingLogo} alt="loading" /> </div>
                </div>
                :

                    gamesByName.length > 0  ?       
                    
                <div className={estilo.cardsPaginate}>
                    <div className={estilo.prevButtonDiv}> <button onClick={prevPage} disabled={disablePrev()} className={estilo.prevButton}>❮</button></div>
                    <div className={estilo.nextButtonDiv}> <button onClick={nextPage} disabled={disableNext()} className={estilo.nextButton}>❯</button></div>

                    {(gamesByName.length === 0 ? allGames : gamesByName)?.slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina).map(game =>

                        <div className={estilo.Card} key={game.id} >
                            <VideoGameCard id={game.id} image={game.image} name={game.name} genres={game.genres} key={game.id} rating={game.rating} />
                        </div>

                    )}
                </div>
                : 
                <div className={estilo.cardsPaginate}>
                <div className={estilo.notfound}><img src={notfound} alt="notfound" /> </div>
                </div>
            }



            <div className={estilo.paginado} >
                <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
            </div>
        </div>
    )
}