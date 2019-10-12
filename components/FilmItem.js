import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import { getImageFromApi } from '../api/TMDBApi';
import { connect } from 'react-redux';
import FadeIn from '../Animations/FadeIn';

const FilmItem = props => {
    const {item, displayFilmDetails} = props;

    const _displayFavoriteImage = () => {
        if (props.favoritesFilm.findIndex(film => film.id === item.id ) !== -1) {
            return <Image style={styles.favorite_image} source={require('../images/ic_favorite.png')}/>;
        }
        return null;
    }
    return (
        <FadeIn>
            <TouchableOpacity 
            onPress={() => displayFilmDetails(item.id)}
            style={styles.global_container}>
                <Image style={styles.image} 
                    source={{uri: getImageFromApi(item.poster_path)}}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        {_displayFavoriteImage()}
                        <Text style={styles.title_text}>{item.title}</Text>
                        <Text style={styles.vote_text}>{item.vote_average}</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text numberOfLines={6} style={styles.description_text}>{item.overview}</Text>
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>{item.release_date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </FadeIn>
    )
};

const styles = StyleSheet.create({
    global_container: {
        height: 190,
        flexDirection: 'row',
        marginVertical: 5,
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray',
    },
    content_container: {
        flex: 1,
        flexDirection: 'column',
    },
    header_container: {
        flex: 4,
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center',
    },
    description_container: {
        flex: 7,
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666',
    },
    date_container: {
        flex: 1,
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14,
        paddingRight: 5,
        marginTop: 3,
    },
    title_text: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20,
        flexWrap: 'wrap',
        paddingRight: 5,
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666',
    },
    favorite_image: {
        width: 40,
        height: 40,
    }
});

const mapStateToProps = state => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
  }

export default connect(mapStateToProps)(FilmItem);