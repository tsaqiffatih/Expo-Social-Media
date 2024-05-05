import { View, ActivityIndicator, StyleSheet } from 'react-native';

function LoadingComponent() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Ubah opacity jika diperlukan
    },
});

export default LoadingComponent;
