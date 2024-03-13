import { API_URL } from "../constants/urls";
import GenreResponse from "../models/genreResponse";

const endpoint = 'video-game'

const token = JSON.parse(localStorage.getItem('token')!)

const genres = () : Promise<GenreResponse[]> => {
    return fetch(`${API_URL}/${endpoint}/genres`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
    }).then(response =>{
        if(!response.ok){
            //???
        }

        return response.json() as Promise<GenreResponse[]>
    })
}

const GameService = {
  genres,
};

export default GameService;
