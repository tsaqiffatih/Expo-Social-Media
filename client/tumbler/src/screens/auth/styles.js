// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tumbler: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 70,
        textShadowColor: 'rgba(255, 255, 255, 1)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#fff',
        textShadowColor: 'rgba(255, 255, 255, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        color: '#ffff'
    },
    input: {
        width: 350,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#fff',
    },
    button: {
        width: 350,
        height: 40,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    registerText: {
        fontSize: 16,
        color: '#fff'
    },
    registerLink: {
        color: '#4CAF50',
        textDecorationLine: 'underline',

    },
    loginText: {
        color: '#4CAF50',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    registerButton: {
        marginTop: 20,
    },
});
