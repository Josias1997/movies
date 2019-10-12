import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Search from '../components/Search';
import FilmDetails from '../components/FilmDetails';
import Favorites from '../components/Favorites';
import News from '../components/News';

const SearchStackNavigator = createStackNavigator({
	Search: {
		screen: Search,
		navigationOptions: {
			title: 'Rechercher'
		}
	},
	FilmDetails: {
		screen: FilmDetails,
		navigationOptions: {
			title: 'Film Détails'
		}
	}
});
const MoviesTabNavigator = createBottomTabNavigator({
	Search: {
		screen: SearchStackNavigator,
		navigationOptions: {
			tabBarIcon: () => {
				return <Image 
				source={require('../images/ic_search.png')}
				style={styles.icon} />

			}
		}
	},
	Favorites: {
		screen: Favorites,
		navigationOptions: {
			tabBarIcon: () => {
				return <Image 
				source={require('../images/ic_favorite.png')}
				style={styles.icon} />

			}
		}
	},
	News: {
		screen: News,
		navigationOptions: {
			tabBarIcon: () => {
				return <Image 
				source={require('../images/ic_fiber_new.png')}
				style={styles.icon} />
			}
		}
	}
},
{
	tabBarOptions: {
		showLabel: false,
		showIcon: true,
		activeBackgroundColor: '#DDD',
		inactiveBackgroundColor: '#FFF',
	}

});

const styles = StyleSheet.create({
	icon: {
		width: 30,
		height: 30,
	}
})

export default createAppContainer(MoviesTabNavigator);
