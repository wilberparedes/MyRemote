import React from 'react';
import MapView from 'react-native-maps';
import {View, StyleSheet} from 'react-native';

const Maps = ({coordinates}) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        minZoomLevel={10}
        maxZoomLevel={15}
        initialRegion={{
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}>
        <MapView.Marker
          coordinate={{
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            latitudeDelta: 0,
            longitudeDelta: 0,
          }}
        />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default Maps;
