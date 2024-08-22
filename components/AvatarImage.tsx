import { Image, StyleSheet, ImageStyle, StyleProp } from "react-native";

interface AvatarImageProps {
    size?: number; // Optional size prop
}

export function AvatarImage({ size = 50 }: AvatarImageProps) {
    const avatarStyle: StyleProp<ImageStyle> = {
        width: size,
        height: size,
        borderRadius: size / 2,
        marginRight: 10,
    };

    return (
        <Image
            source={{ uri: 'https://avatar.iran.liara.run/public' }} // Placeholder avatar URL
            style={[styles.avatar, avatarStyle]}
        />
    );
}

const styles = StyleSheet.create({
    avatar: {
        marginRight: 10,
    },
});
