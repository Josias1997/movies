import React, { useState, useRef, useEffect } from 'react';

import { StyleSheet, View, ActivityIndicator } from 'react-native';
import FilmsList from './FilmsList';
import { getNewFilmsFromApi } from '../api/TMDBApi';

const News = props => {
	const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
	let page = useRef(0);
    let totalPages = useRef(0);

    const _loadFilms = () => { 
        setIsLoading(true);
        getNewFilmsFromApi(page.current + 1)
            .then(data => {
                page.current = data.page;
                totalPages.current = data.total_pages;
                setFilms([...films, ...data.results]);
                setIsLoading(false);
            });
    };

    useEffect(() => {
    	_loadFilms();
    }, [])


    const _displayLoading = () => {
        return isLoading ? <View style={styles.loading_container}>
            <ActivityIndicator size='large'/>
        </View> : null;
    };

	return (
		<View style={styles.container}>
			<FilmsList
	                films={films}
	                page={page.current}
	                totalPages={totalPages.current}
	                loadFilms={_loadFilms}
	                navigation={props.navigation}
	            />
	        {_displayLoading()}
        </View>
	)
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default News;