import React, { ReactNode } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler'

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

// ReactNode -> receber um coponente como propriedade

interface PageHeaderProps {
    title: string;
    headerRight?: ReactNode;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = (props) => {
    const { navigate } = useNavigation();

    function goToBack() {
        navigate('Landing');
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton onPress={goToBack}>
                    <Image source={backIcon} resizeMode="contain" />
                </BorderlessButton>
                <Image source={logoImg} resizeMode="contain" />
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>
                    {props.title}
                </Text>

                {props.headerRight}
            </View>

            {props.children}
        </View>
    )
}

export default PageHeader;