import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from "@expo/vector-icons";

export default ({ navigation }) => {

    const [cureentRegion, setCurrentRegion] = useState(null);

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

    if (!cureentRegion) {
        return null;
    }

    return <>
        <MapView initialRegion={cureentRegion} style={styles.map}>
            <Marker coordinate={{ latitude: -29.7269849, longitude: -52.5019521 }}>
                <Image style={styles.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/15067098?s=460&v=4' }} />
                <Callout onPress={() => {
                    navigation.navigate('Profile', { github_username: 'DouglasFuelber' })
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Douglas Fuelber</Text>
                        <Text style={styles.devBio}>Full Stack Web Developer</Text>
                        <Text style={styles.devTechs}>ReactJS, JS, C#, HTML, CSS</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
        <View style={styles.searchForm}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar devs por techs..."
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
            />
            <TouchableOpacity onPress={() => { }} style={styles.searchButton}>
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
