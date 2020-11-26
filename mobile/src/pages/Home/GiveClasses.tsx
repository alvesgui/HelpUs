import React, {useEffect, useState} from 'react';
import { Image, ImageBackground, View, Text, StyleSheet, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native'

import { Feather as Icon } from '@expo/vector-icons';


const GiveClasses = () => {

    const navigation = useNavigation()
    

    function handleNavigateToMap() {
        navigation.navigate('DonationsMap')
    }

    return (
            <ImageBackground  
                source={require('../../images/1.png')} 
                style={styles.container}
            >
                <View style={styles.main}>
                    <Text style={styles.title}>Quer dar aula ?</Text>
                    <Text style={styles.description}>Para começar, você precisa cadastrar no mapa seu local com todas as informações necessárias.</Text>
                </View>


                <RectButton style={styles.button} onPress={handleNavigateToMap}>
                    <View style={styles.buttonIcon}>
                    <Text>
                        <Icon name="arrow-right" color="#FFF" size={24} />
                    </Text>
                    </View>
                    <Text style={styles.buttonText}>
                    Vamos lá
                    </Text>
                </RectButton>               
            </ImageBackground>
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
    },

    title: {
        color: '#fff',
        fontSize: 36,
        fontFamily: 'Jost_700Bold',
        lineHeight: 42,
    },

    description: {
        color: '#fff',
        fontSize: 20,
        lineHeight: 26,
        marginTop: 24,
        fontFamily: 'Jost_600SemiBold',
        maxWidth: 240,
      },
    
      footer: {
        paddingBottom: 100,
      },
    
      select: {},
    
      button: {
        backgroundColor: '#053A5B',
        marginVertical: 40,
        height: 60,
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 80,
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

export default  GiveClasses;