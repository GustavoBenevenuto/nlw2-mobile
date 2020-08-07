import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../service/api';

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


const TeacherList = () => {

    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const [favorites, setFavorites] = useState<number[]>([]);
    const [subject, setSubject] = useState('');
    const [weekDay, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    const [teachers, setTeachers] = useState([]);

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

    function handleToggleFilterVisible(){
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit(){
        
        loadFavorites();
        
        try {
            const response = await api.get('classes',{
                params:{
                    subject,
                    week_day: weekDay,
                    time,
                }
            });
            console.log(response.data);
            setTeachers(response.data);
            handleToggleFilterVisible();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFilterVisible}>
                        <Feather name="filter" size={20} color="#FFF"/>
                    </BorderlessButton>
                )}
            >
                {isFiltersVisible &&
                    (<View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            placeholderTextColor="#c1bccc"
                            style={styles.input}
                            value={subject}
                            onChangeText={(value) => setSubject(value)}
                            placeholder='Qual a matéria?'
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semmana</Text>
                                <TextInput
                                    placeholderTextColor="#c1bccc"
                                    style={styles.input}
                                    value={weekDay}
                                    onChangeText={(value) => setWeekDay(value)}
                                    placeholder='Qual o dia?'
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    placeholderTextColor="#c1bccc"
                                    style={styles.input}
                                    value={time}
                                    onChangeText={(value) => setTime(value)}
                                    placeholder='Qual o horário?'
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>
                                Filtrar
                            </Text>
                        </RectButton>

                    </View> )
                }
            </PageHeader>

            <ScrollView
                style={styles.teacherlist}
                contentContainerStyle={
                    {
                        paddingHorizontal: 16,
                        paddingBottom: 16,
                    }
                }
            >
                {teachers.map((item : TeacherData)=> {
                  return (
                    <TeacherItem 
                        key={item.id} 
                        teacher={item}
                        favorited={favorites.includes(item.id)}
                    />  
                  )
                })}
            </ScrollView>
        </View>
    )
}

export default TeacherList;