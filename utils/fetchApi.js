import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com'


export const fetchApi  = async ( url ) => {
    const {data} = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': '4843bf9b26msha8058536089e063p14661ejsn4da4be972fcb',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
          }
    })

    return data;
}