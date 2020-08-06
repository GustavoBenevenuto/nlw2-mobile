import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';

import styles from './styles';

import GiveClassesBgImg from '../../assets/images/give-classes-background.png'
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const GiveClasses = () => {
    
    const {goBack} = useNavigation();

    function goToBack(){
        goBack();
    }
    
    return(
        <View style={styles.container}>
            <ImageBackground 
                resizeMode="contain"
                source={GiveClassesBgImg} 
                style={styles.content}
            >
                <Text style={styles.title}>
                    Quer ser um Proffy?
                </Text>

                <Text style={styles.description}>
                    Para começar, você precisa se cadastrar como professor na nossa plataforma web.
                </Text>
            </ImageBackground>

            <RectButton 
                onPress={() => goToBack()}
                style={styles.okButton}>
                <Text style={styles.okButtonText}>Tudo bem!</Text>
            </RectButton>
        </View>
    )
}

export default GiveClasses;