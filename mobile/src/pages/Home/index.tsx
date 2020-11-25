import React, {useEffect, useState} from 'react';
import { Image, ImageBackground, View, ScrollView, Text, StyleSheet, Dimensions, Linking } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native'

import { Feather as Icon } from '@expo/vector-icons';

const Home = () => {

    const navigation = useNavigation();

    function handleNavigateToMap() {
        navigation.navigate('DonationsMap')
    }

    return (
        <ImageBackground  
            source={require('../../images/1.png')} 
            style={styles.container}
        >
            <View style={styles.main}>
                <Image source={require('../../images/logo.png')} />
                <Text style={styles.title}>Venha dar uma Ajudinha.</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem as soluções para seus problemas.</Text>
            </View>

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

export default Home;