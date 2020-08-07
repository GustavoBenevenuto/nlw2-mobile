import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import { ScrollView } from 'react-native-gesture-handler';
import TeacherItem from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';

interface TeacherData {
    avatar: string;
    bio: string;
    cost: number;
    id: number;
    name: string;
    subject:string;
    user_id: number;
    whatsapp: string;
}


const Favorites = () => {
    

    const [favorites, setFavorites] = useState([]);

    function loadFavorites(){
        AsyncStorage.getItem('favorites')
        .then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response);
                
                const favoritedTeachersIds = favoritedTeachers.map((item : TeacherData ) => {
                    return item.id;
                });

                setFavorites(favoritedTeachersIds);
            }
        });
    }

    useEffect(() => {
        loadFavorites();
    },[]);
    
    return(
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos"/>

            <ScrollView
                style={styles.teacherlist}
                contentContainerStyle={
                    {
                        paddingHorizontal: 16,
                        paddingBottom: 16,
                    }
                }
            >
                
            </ScrollView>
        </View>
    )
}

export default Favorites;