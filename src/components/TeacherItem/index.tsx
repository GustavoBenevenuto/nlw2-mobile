import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, Linking } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'

import hartOutilneIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';

interface TeacherData {
    avatar: string;
    bio: string;
    cost: number;
    id: number;
    name: string;
    subject: string;
    user_id: number;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: TeacherData;
    favorited: boolean;
}

const TeacherItem: React.FunctionComponent<TeacherItemProps> = ({ teacher, favorited }) => {

    const [isFavorited, setisFavorited] = useState(favorited);

    function handleLinkToWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');

        let favoritesArray = [];

        if (favorites) {
            favoritesArray = JSON.parse(favorites);
        }

        if (isFavorited) {
            const favoriteIndex = favoritesArray.findIndex((teacherItem: TeacherData) => {
                return teacherItem.id === teacher.id;
            });

            favoritesArray.splice(favoriteIndex, 1);

            setisFavorited(false);
        } else {
            const favorites = await AsyncStorage.getItem('favorites');

            let favoritesArray = [];

            if (favorites) {
                favoritesArray = JSON.parse(favorites);
            }

            favoritesArray.push(teacher);

            setisFavorited(true);
        }
        
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: teacher.avatar }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>
                        {teacher.name}
                    </Text>
                    <Text style={styles.subject}>
                        {teacher.subject}
                    </Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                    <Text style={styles.priceValue}>R$ {teacher.cost.toFixed(2)}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton
                        onPress={handleToggleFavorite}
                        style={[
                            styles.favoriteButton,
                            isFavorited ? styles.favorited : {}
                        ]}>
                        {isFavorited ?
                            <Image source={unFavoriteIcon} />
                            :
                            <Image source={hartOutilneIcon} />
                        }
                    </RectButton>

                    <RectButton
                        onPress={handleLinkToWhatsapp}
                        style={styles.contactButton}
                    >

                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem;