import {API_TOKEN} from '../Helpers/token';

export const getFilmsFromApiWithSearchedText = (text, page) => {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page;
    return fetch(url)
	    .then(response => response.json())
	    .catch(error => error);
};

export const getImageFromApi = name => {
	return 'http://image.tmdb.org/t/p/w300' + name;
};

export const getFilmDetailsFromApi = id => {
	const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr';
	return fetch(url)
	    .then(response => response.json())
	    .catch(error => error);
};

export const getNewFilmsFromApi = (page) => {
	const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN + '&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page=' + page;
	return fetch(url)
		.then(response => response.json())
		.catch(error => error);
};
