import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from "@expo/vector-icons";

import api from '../services/api';

export default ({ navigation }) => {

    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');

    useEffect(() => {
        const loadInitialPosition = async () => {
            const { granted } = await requestPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });
            }
        };

        loadInitialPosition();

    }, []);

    const loadDevs = async () => {
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });

        setDevs(response.data.devs);
    }

    const handleRegionchanged = (region) => {
        setCurrentRegion(region);
    }

    if (!currentRegion) {
        return null;
    }

    return <>
        <MapView
            initialRegion={currentRegion}
            onRegionChangeComplete={handleRegionchanged}
            style={styles.map}
        >
            {devs.map(dev => (
                <Marker
                    key={dev._id}
                    coordinate={{
                        longitude: dev.location.coordinates[0],
                        latitude: dev.location.coordinates[1]                       
                    }}
                >
                    <Image
                        style={styles.avatar}
                        source={{ uri: dev.avatar_url }}
                    />
                    <Callout onPress={() => {
                        navigation.navigate('Profile', { github_username: dev.github_username })
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>{dev.name}</Text>
                            <Text style={styles.devBio}>{dev.bio}</Text>
                            <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                        </View>
                    </Callout>
                </Marker>
            ))}
        </MapView>
        <View style={styles.searchForm}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar devs por techs..."
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
            />
            <TouchableOpacity onPress={loadDevs} style={styles.searchButton}>
                <MaterialIcons name="my-location" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    </>
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    avatar: {
        borderColor: '#fff',
        borderRadius: 4,
        borderWidth: 3,
        height: 50,
        width: 50,
    },
    callout: {
        width: 260
    },
    devName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    },
    searchForm: {
        flexDirection: 'row',
        left: 20,
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 5
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 25,
        color: '#333',
        elevation: 2,
        flex: 1,
        fontSize: 16,
        height: 50,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {
            height: 4,
            width: 4
        },
        shadowOpacity: 0.2,
    },
    searchButton: {
        alignItems: 'center',
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
        marginLeft: 15,
        width: 50
    }
});