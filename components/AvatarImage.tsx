import React, { useState, useRef, useEffect } from 'react';
import { Animated, StyleSheet, ImageStyle, StyleProp, View, Image } from 'react-native';

interface AvatarImageProps {
    size?: number; // Optional size prop
}

export function AvatarImage({ size = 50 }: AvatarImageProps) {
    const [loading, setLoading] = useState(true);
    const pulseAnim = useRef(new Animated.Value(0)).current; // Animated value for pulsing

    // Define the pulsing animation
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [pulseAnim]);

    const avatarStyle: StyleProp<ImageStyle> = {
        width: size,
        height: size,
        borderRadius: size / 2,
        marginRight: 10,
    };

    // Interpolating the opacity of the pulse
    const pulseInterpolation = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0.5', '0.2'],
    });

    return (
        <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
            {loading && (
                <Animated.View
                    style={[
                        styles.placeholder,
                        {
                            width: size,
                            height: size,
                            borderRadius: size / 2,
                            opacity: pulseInterpolation,
                        },
                    ]}
                />
            )}
            <Image
                source={{ uri: 'https://avatar.iran.liara.run/public' }} // Placeholder avatar URL
                style={[styles.avatar, avatarStyle]}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatar: {
        position: 'absolute',
    },
    placeholder: {
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
