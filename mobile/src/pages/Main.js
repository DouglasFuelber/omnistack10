import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

export default () => {

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

    return <MapView initialRegion={cureentRegion} style={styles.map} />
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});
