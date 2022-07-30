import axios from "axios"
export const GET_ALL_GAMES = "GET_ALL_GAMES"
export const GET_GAME_DETAIL = "GET_GAME_DETAIL"
export const GET_GAME_BY_NAME = "GET_GAME_BY_NAME"
export const SORT_GAME = "SORT_GAME"
export const CLEAR = "CLEAR"
export const CREATE_GAME = "CREATE_GAME"
export const SORT_GAME_GENRE = "SORT_GAME_GENRE"
export const GET_ALL_GENRES = "GET_ALL_GENRES"
export const CLEAR_DETAIL = "CLEAR_DETAIL"
export const CLEAR_ALL_GAMES = "CLEAR_ALL_GAMES"
export const BAD_SEARCH = "BAD_SEARCH"

export function getAllGames(setLoading) {
    return function (dispatch) {
      setLoading(true)
      return fetch(`http://localhost:3001/videogames`)
      .then(response => response.json() )
      
      .then(json => {dispatch({ type: GET_ALL_GAMES, payload: json })
      setLoading(false)
        
      });
    };
  }

  export function getAllGenres() {
    return function (dispatch) {
      return fetch(`http://localhost:3001/genre`)
      .then(response => response.json() )
      
      .then(json => {dispatch({ type: GET_ALL_GENRES, payload: json })
        
      });
    };
  }

  export function getGameDetail(id) {
    return function (dispatch) {
      return fetch(`http://localhost:3001/videogames/${id}`)
      .then(response => response.json())
      .then(json => {dispatch({ type: GET_GAME_DETAIL, payload: json })
        
      });
    };
  }

  export function createGame(payload){
    if(!payload.date){
      payload.date = Date.now();
    }
    return function (dispatch){
    return  axios.post('http://localhost:3001/videogames', 
    {
      name: payload.name,
      description: payload.description,
      platforms: payload.platforms,
      rating: payload.rating,
      image: payload.image,
      genre: payload.genre,
      date: payload.date

  })
      
      .then(json => {dispatch({ type: CREATE_GAME, payload: json.data })})
      .catch(function (error) {console.log(error)})
  }
}
  



  export function getGameByName(setLoading,name) {
    return function (dispatch) {
      setLoading(true)
      return fetch(`http://localhost:3001/videogames?name=${name}`)
      .then(response => response.json())
      .then(json => {dispatch({ type: GET_GAME_BY_NAME, payload: json })
      setLoading(false)  
      });
    };
  }

/*   export function getGameByName(name){
      
    return {
      type: GET_GAME_BY_NAME,
      payload: name
    }

  } */

  export function clearSearch(){
      
    return {
      type: CLEAR,
      payload: []
    }

  }

  export function clearDetail(){
      
    return {
      type: CLEAR_DETAIL,
      payload: {}
    }
  }

  export function clearAllGames(){
      
    return {
      type: CLEAR_ALL_GAMES,
      payload: []
    }
  }

  export function sortGameByName(array){
    return {
      type: SORT_GAME,
      payload: array
    }

  }

  export function sortGameGenre(array){
    return {
      type: SORT_GAME_GENRE,
      payload: array
    }

  }

  export function badSearch(array){
    return {
      type: BAD_SEARCH,
      payload: array
    }

  }