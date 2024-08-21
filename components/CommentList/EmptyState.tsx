import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyState: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>No comments yet. Be the first to comment!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    message: {
        fontSize: 16,
        color: 'gray',
    },
});

export default EmptyState;
