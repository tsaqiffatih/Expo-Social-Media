// FloatingButton.js

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const FloatingButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.addButton} onPress={onPress}>
            <Feather name="plus" size={30} color="#fff" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007AFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
});

export default FloatingButton;
