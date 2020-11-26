import React, {useEffect, useState} from 'react';
import { Image, ImageBackground, View, Text, StyleSheet, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native'
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';


import { Feather as Icon } from '@expo/vector-icons';

interface IBGEUFResponse {
    sigla: string;
}

const SelectionUfCity = () => {
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');
    const [ufs, setUfs] = useState<string[]>([]);
    const [select, setSelect] = useState<string>('Selecione um Estado')
    const navigation = useNavigation()
    

    function handleNavigateToMap() {
        navigation.navigate('DonationsMap', {uf, city})
    }

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        })

    }, []);

    return (
            <ImageBackground  
                source={require('../../images/1.png')} 
                style={styles.container}
            >
                <View style={styles.main}>
                    <Image source={require('../../images/profy.png')} />
                    <Text style={styles.title}>Selecione o Estado e a Cidade para continuar:</Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.subTitle}>Estado:</Text>

                    <TextInput
                    style={styles.input}
                    placeholder="Digite a UF"
                    value={uf}
                    maxLength={2}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    onChangeText={text => setUf(text)}
                    />

                    <Text style={styles.subTitle}>Cidade:</Text>
                    <TextInput 
                    style={styles.input}
                    placeholder="Digite a cidade"
                    value={city}
                    autoCorrect={false}
                    onChangeText={text => setCity(text)}
                    />
                </View>

                {city && uf ? (
                <RectButton style={styles.button} onPress={handleNavigateToMap}>
                    <View style={styles.buttonIcon}>
                    <Text>
                        <Icon name="arrow-right" color="#FFF" size={24} />
                    </Text>
                    </View>
                    <Text style={styles.buttonText}>
                    Entrar
                    </Text>
                </RectButton>

                ): (
                    <View />
                )}

                
            </ImageBackground>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },
    picker: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 100,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        position: 'absolute',
        color: '#fff',
        fontSize: 22,
        fontFamily: 'Jost_700Bold',
        maxWidth: 260,
        paddingBottom: 170,
        paddingLeft: 50,
    },

    subTitle: {
        color: '#fff',
        fontSize: 22,
        fontFamily: 'Jost_700Bold',
        marginBottom: 10,
    },

    description: {
        color: '#fff',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Jost_600SemiBold',
        maxWidth: 260,
        lineHeight: 24,
      },
    
      footer: {
        paddingBottom: 100,
      },
    
      select: {},
    
      input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
      },
    
      button: {
        backgroundColor: '#053A5B',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
      },
    
      buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
      },
    
      buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Jost_700Bold',
        fontSize: 16,
      }

})

export default SelectionUfCity;