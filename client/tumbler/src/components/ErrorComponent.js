import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ErrorComponent = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/error-icon.jpg')} 
                style={styles.image}
            />
            <Text style={styles.text}>Opps... Something went wrong!!!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
        color:'#00BFFF'
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

export default ErrorComponent;
