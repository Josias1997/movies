import React, { useState, useEffect } from 'react';
import { Platform, Share, TouchableOpacity, StyleSheet, View, Text, ScrollView, ActivityIndicator, Image } from 'react-native';
import { getFilmDetailsFromApi, getImageFromApi } from '../api/TMDBApi';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux';
import EnlargeShrink from '../Animations/EnlargeShrink';

const FilmDetails = props => {
	const [film, setFilm] = useState(undefined);
	const [isLoading, setIsLoading] = useState(true);
	const filmId = props.navigation.state.params.filmId;

	useEffect(() => {
		getFilmDetailsFromApi(filmId)
			.then(data => {
				setFilm(data);
				setIsLoading(false);
			});
	}, [props.favoritesFilm])

	const _toggleFavorite = () => {
		const action = { type: "TOGGLE_FAVORITE", value: film}
		props.dispatch(action);
	}

	const _displayFavoriteImage = () => {
		let sourceImage = require('../images/ic_favorite_border.png');
		let isFavorite = false;
		if (props.favoritesFilm.findIndex(item => item.id === film.id ) !== -1) {
			sourceImage = require('../images/ic_favorite.png');
			isFavorite = true;
		}
		return <EnlargeShrink isFavorite={isFavorite}>
			<Image style={styles.favorite_image} source={sourceImage}/>
		</EnlargeShrink>;
	}

	const _shareFilm = () => {
		Share.share({title: film.title, message: film.overview});
	};

	const _displayFloatingActionButton = () => {
		if (film != undefined && Platform.OS === 'android') {
			return (
				<TouchableOpacity style={styles.share_touchable_floatingactionbutton}
					onPress={_shareFilm}>
					<Image style={styles.share_image}
					 source={require('../images/ic_share.png')} />
				</TouchableOpacity>
			)
		}
	}

	const _displayFilm = () => {
		if (film !== undefined) {
			return(
				<ScrollView style={styles.scrollview_container}>
					<Image style={styles.image} 
						source={{uri: getImageFromApi(film.backdrop_path)}}
					/>
					<View style={styles.main_details}>
						<Text style={styles.title}>{film.title}</Text>
						<TouchableOpacity style={styles.favorite_container} onPress={_toggleFavorite}>
							{_displayFavoriteImage()}
						</TouchableOpacity>
						<Text style={styles.description}>{film.overview}</Text>
						<View style={styles.more_details}>
							<Text style={styles.boldStyle}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
							<Text style={styles.boldStyle}>Note : {film.vote_average} / 10</Text>
							<Text style={styles.boldStyle}>Nombre de votes : {film.vote_count}</Text>
							<Text style={styles.boldStyle}>Budget :  {numeral(film.budget).format('0,0[.]00$')} </Text>
							<Text style={styles.boldStyle}>Genre(s) : {film.genres.map(genre => {
								return genre.name;
							}).join('/')} </Text>
							<Text style={styles.boldStyle}>Compagnie(s) : {film.production_companies.map(company => {
								return company.name;
							}).join('/')}</Text>
						</View>
					</View>
				</ScrollView>
			)
		}
	}

	const _displayLoading = () => {
        return isLoading ? <View style={styles.loading_container}>
            <ActivityIndicator size='large'/>
        </View> : null;
    }
	return (
		<View style={styles.main_container}>
			{_displayFilm()}
			{_displayLoading()}
			{_displayFloatingActionButton()}
		</View>
	);
};

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
	},
	loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    scrollview_container: {
    	flex: 1,
    },

    image: {
		height: 250,
		marginHorizontal: 2,
    },

    main_details: {
		marginHorizontal: 5,
    },

    title: {
    	marginVertical: 10,
    	textAlign: 'center',
    	fontSize: 26,
    	fontWeight: 'bold',
    },

    description: {
    	marginVertical: 10,
		textAlign: 'left',
		fontStyle: 'italic'
    },
    more_details: {
    	marginTop: 5,
		textAlign: 'left',
    },
    boldStyle: {
    	fontWeight: 'bold',
    },
    favorite_container: {
    	alignItems: 'center',
    },
    favorite_image: {
    	flex: 1,
    	width: null,
    	height: null,
    },  
    share_touchable_floatingactionbutton: {
	    position: 'absolute',
	    width: 60,
	    height: 60,
	    right: 30,
	    bottom: 30,
	    borderRadius: 30,
	    backgroundColor: '#e91e63',
	    justifyContent: 'center',
	    alignItems: 'center'
	 },
	share_image: {
	    width: 30,
	    height: 30
	}
});

const mapStateToProps = state => {
	return {
		favoritesFilm: state.toggleFavorite.favoritesFilm,
	}
}

export default connect(mapStateToProps)(FilmDetails);