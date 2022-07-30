import { GET_ALL_GAMES, GET_GAME_DETAIL, GET_GAME_BY_NAME,SORT_GAME,CLEAR,CREATE_GAME,SORT_GAME_GENRE,GET_ALL_GENRES, CLEAR_DETAIL,CLEAR_ALL_GAMES, BAD_SEARCH } from "../actions"


const initialState = {
    allGames: [],
    gamesByName: [],
    gameDetail: {},
    createdGames: [],
    allGenres: [],
    badSearch: []
}

export default function reducer(state = initialState, {type, payload}){
    switch(type){
            case GET_ALL_GAMES:   
            return {
                ...state,
                allGames: payload,
                gamesByName: payload
            }
            case GET_GAME_DETAIL:
            return {
                ...state,
                gameDetail: payload
            }  
            case GET_GAME_BY_NAME:
                return{
                    ...state,/* 
                    gamesByName: state.allGames.filter(e=> e.name.toLocaleLowerCase().includes(payload.toLocaleLowerCase())) */
                    gamesByName: payload
                }
            case SORT_GAME:
                return {
                    ...state,
                    allGames: payload
                }
            case CLEAR:
                return{
                    ...state,
                    gamesByName: payload
                }
                case CLEAR_DETAIL:
                return{
                    ...state,
                    gameDetail: payload,
                }
                case CLEAR_ALL_GAMES:
                return{
                    ...state,
                    allGames: payload,
                }
            case CREATE_GAME:
                    return{
                    ...state,
                    createdGames: state.createdGames.concat(payload)
                }
            case SORT_GAME_GENRE:
                return{
                    ...state,
                    gamesByName: payload
                }
            case GET_ALL_GENRES:
                return{
                    ...state,
                    allGenres: payload
                }
            case BAD_SEARCH:
                return{
                    ...state,
                    badSearch: payload
                } 
            default: return state
    }
}