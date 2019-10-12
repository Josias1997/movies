import React from 'react';

import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import FilmItem from './FilmItem';

const FilmsList = props => {
	const {films, navigation } = props;


    const _displayFilmDetails = filmId => {
        navigation.navigate('FilmDetails', {
            filmId: filmId
        });
    };
	return(
		props.forFavorite ? 
			<FlatList
				style={styles.list}
	            data={films}
	            keyExtractor={(item) => item.id.toString()}
	            renderItem={({item}) => <FilmItem item={item} displayFilmDetails={_displayFilmDetails} /> }
	            extraData={props.favoritesFilm}
        /> : <FlatList
				style={styles.list}
	            data={films}
	            keyExtractor={(item) => item.id.toString()}
	            renderItem={({item}) => <FilmItem item={item} displayFilmDetails={_displayFilmDetails} /> }
	            onEndReachedThreashold={0.5}
	            onEndReached={() => {
	                if (props.page < props.totalPages) {
	                    props.loadFilms();
	                }
	            }}
	            extraData={props.favoritesFilm}
        	/>
	)
};

const styles = StyleSheet.create({
	list: {
		flex: 1,
	}
})

const mapStateToProps = state => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmsList);