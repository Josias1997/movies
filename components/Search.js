import React, { useState, useEffect, useRef } from 'react';
import {View, TextInput, Text, Button, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import { getFilmsFromApiWithSearchedText } from '../api/TMDBApi';
import FilmsList from './FilmsList.js';

const Search = props => {
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let searchedText = useRef('');
    let page = useRef(0);
    let totalPages = useRef(0);
    let isSearchFilmsCalled = useRef(false);

    useEffect(() => {
        if (isSearchFilmsCalled.current) {
            _loadFilms();
        }
    }, [films])

    const _loadFilms = () => { 
        console.log("load");
        if (searchedText.current.length > 0) {
            setIsLoading(true);
            getFilmsFromApiWithSearchedText(searchedText.current, page.current + 1)
                .then(data => {
                    page.current = data.page;
                    totalPages.current = data.total_pages;
                    setFilms([...films, ...data.results]);
                    setIsLoading(false);
                });
            isSearchFilmsCalled.current = false;
        }
    }
    const _searchInputChangeHandler = text => {
        searchedText.current = text;
    }

    const _displayLoading = () => {
        return isLoading ? <View style={styles.loading_container}>
            <ActivityIndicator size='large'/>
        </View> : null;
    }

    const _searchFilms = () => {
        isSearchFilmsCalled.current = true;
        page.current = 0;
        totalPages.current = 0;
        setFilms([]);
    }
    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="Titre du film" 
                onSubmitEditing={_searchFilms}
                onChangeText={_searchInputChangeHandler}

            />
            <Button
                onPress={_searchFilms} 
                title="Rechercher"
            />
            <FilmsList
                films={films}
                page={page.current}
                totalPages={totalPages.current}
                loadFilms={_loadFilms}
                navigation={props.navigation}
            />
            {_displayLoading()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    input: {
        marginHorizontal: 5,
        height: 50,
        borderColor: '#000',
        borderWidth: 1,
        paddingLeft: 5, 
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

export default Search;

