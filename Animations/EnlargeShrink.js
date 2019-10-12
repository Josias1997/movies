import React, { useState, useEffect} from 'react';
import { Animated } from 'react-native';

const EnlargeShrink = props => {
	const _getSize = () => {
		if(props.isFavorite) {
			return 80;
		}
		return 40;

	};
	const [size, setSize] = useState(new Animated.Value(_getSize()));

	useEffect(() => {
		Animated.spring(size, {
			toValue: _getSize()
		}).start();
	}, [props.isFavorite])

	return (
		<Animated.View style={{width: size, height: size}}>
			{props.children}
		</Animated.View>
	)
};

export default EnlargeShrink;