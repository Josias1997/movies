import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import FilmsList from './FilmsList.js';
import Avatar from './Avatar';

const Favorites = props => {
	return (
		<View style={styles.main_container}>
			<View style={styles.avatar_container}>
				<Avatar/>
			</View>
				<FilmsList
				forFavorite={true}
	            films={props.favoritesFilm}
	            navigation={props.navigation}
        	/>
		</View>
	);
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
	},
	avatar_container: {
		alignItems: 'center',
	},
});

const mapStateToProps = state => {
	return {
		favoritesFilm: state.toggleFavorite.favoritesFilm,
	}
}

export default connect(mapStateToProps)(Favorites);