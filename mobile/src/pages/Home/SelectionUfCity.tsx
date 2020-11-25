import React, {useEffect, useState} from 'react';
import { Image, ImageBackground, View, Text, StyleSheet, Platform, KeyboardAvoidingView, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native'

import { Feather as Icon } from '@expo/vector-icons';

const SelectionUfCity = () => {
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');
    const navigation = useNavigation();

    function handleNavigateToMap() {
        navigation.navigate('DonationsMap', {uf, city})
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground  
                source={require('../../images/1.png')} 
                style={styles.container}
            >
                <View style={styles.main}>
                    <Text style={styles.title}>Selecione o Estado e a Cidade para continuar.</Text>
                </View>

                <View style={styles.footer}>
                    <TextInput
                    style={styles.input}
                    placeholder="Digite a UF"
                    value={uf}
                    maxLength={2}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    onChangeText={text => setUf(text)}
                    />
                    <TextInput 
                    style={styles.input}
                    placeholder="Digite a cidade"
                    value={city}
                    autoCorrect={false}
                    onChangeText={text => setCity(text)}
                    />
                </View>

                {city ? (
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
        </KeyboardAvoidingView>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },

    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        color: '#fff',
        fontSize: 32,
        fontFamily: 'Jost_700Bold',
        maxWidth: 260,
        marginTop: 48,
    },

    description: {
        color: '#fff',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Jost_600SemiBold',
        maxWidth: 260,
        lineHeight: 24,
      },
    
      footer: {},
    
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