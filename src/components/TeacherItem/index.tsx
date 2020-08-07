import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'

import hartOutilneIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

const TeacherItem = () => {

    return(
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                    style={styles.avatar} 
                    source={{uri:'https://avatars1.githubusercontent.com/u/40447101?s=460&u=0e966219760b77dbb32e1f728c4f2e3dc1c41e99&v=4'}}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>
                        Gustavo Benevenuto
                    </Text>
                    <Text style={styles.subject}>
                        Desenvolvimento Mobile
                    </Text>
                </View>
            </View>

            <Text style={styles.bio}>
                Pai da computação, atuante no mercado há mais de 300 anos.
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                    <Text style={styles.priceValue}>R$ 180,00</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton style={[styles.favoriteButton, styles.favorited]}>
                        {/* <Image source={hartOutilneIcon}/> */}
                        <Image source={unFavoriteIcon}/>
                    </RectButton>

                    <RectButton style={styles.contactButton}>
                        <Image source={whatsappIcon}/>
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem;