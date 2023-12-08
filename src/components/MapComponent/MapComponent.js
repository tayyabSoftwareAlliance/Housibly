import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import MapView, { Circle, Marker, Polygon } from 'react-native-maps';
import { WP, appIcons, colors, handleLocationPermission } from '../../shared/exporter';
import Geolocation from '@react-native-community/geolocation';
import { AddressModal } from '../Modal/AddressModal';
import MapGuideModal from '../Modal/MapGuideModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DragMarker = () => (
  <View style={styles.dragMarker} />
)

export const MapComponent = () => {

  const mapRef = useRef()
  const [polygonGuideModal,setPolygonGuideModal] = useState(false)
  const [circleGuideModal,setCircleGuideModal] = useState(false)
  const [region, setRegion] = useState({
    latitude: 34.28371,
    longitude: 74.458908,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [polygonCoords, setPolygonCoords] = useState([])
  const [circleCoords, setCircleCoords] = useState([])

  const onPolygonMarkerDragEnd = useCallback((e, index) => {
    const newCoord = e.nativeEvent.coordinate
    setPolygonCoords(prev => {
      const copy = JSON.parse(JSON.stringify(prev))
      copy[index] = newCoord
      return [...copy]
    })
  }, [polygonCoords])

  const onCircleMarkerDragEnd = useCallback((e) => {
    const newCoord = e.nativeEvent.coordinate
    setCircleCoords(prev => {
      const copy = JSON.parse(JSON.stringify(prev))
      copy[1] = newCoord
      return [...copy]
    })
  }, [circleCoords])

  const handlePolygon = useCallback(async() => {
    setCircleCoords([])
    if (polygonCoords.length > 0) {
      setPolygonCoords([])
      return
    }
    // calculate and draw polygon
    const radius = Math.min(region.latitudeDelta, region.longitudeDelta) / 4;
    const angleStep = (2 * Math.PI) / 5; // Divide the circle into 5 parts for a pentagon
    const polygon = Array.from({ length: 5 }).map((_, index) => ({
      latitude: region.latitude + radius * Math.cos(angleStep * index), //this is for latitude means y axis
      longitude: region.longitude + radius * Math.sin(angleStep * index), //this is for longitude means x axis
    }));
    setPolygonCoords(polygon)

    if(!(await AsyncStorage.getItem('IS_MAP_POLYGON_GUIDE_SHOWED')))
    setPolygonGuideModal(true)
  }, [polygonCoords])

  const handleCircle = useCallback(async() => {
    setPolygonCoords([])
    if (circleCoords.length > 0) {
      setCircleCoords([])
      return
    }
    // calculate and draw circle
    const radius = Math.min(region.latitudeDelta, region.longitudeDelta) / 4;
    setCircleCoords([
      {
        latitude: region.latitude,
        longitude: region.longitude
      },
      {
        latitude: region.latitude - radius,
        longitude: region.longitude
      }
    ])
    if(!(await AsyncStorage.getItem('IS_MAP_CIRCLE_GUIDE_SHOWED')))
    setCircleGuideModal(true)
  }, [circleCoords])

  //distance between two lat lng in meters
  const haversineDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Earth radius in meters
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
    return distance;
  }, [])

  const handleNavigator = useCallback(async () => {
    if (await handleLocationPermission()) {
      Geolocation.getCurrentPosition((pos) => {
        mapRef.current?.animateToRegion({
          ...region,
          latitude: pos?.coords?.latitude,
          longitude: pos?.coords?.longitude,
        })
      })
    }
  }, [region])

  const handleZoomIn = useCallback(() => {
    mapRef.current?.animateToRegion({
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    })
  }, [region])

  const handleZoomOut = useCallback(() => {
    mapRef.current?.animateToRegion({
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    })
  }, [region])

  const handleRefresh = useCallback(() => {

  }, [])

  return (
    <View style={styles.container}>
      <MapGuideModal type={'polygon'} show={polygonGuideModal} onPressHide={() => setPolygonGuideModal(false)} />
      <MapGuideModal type={'circle'} show={circleGuideModal} onPressHide={() => setCircleGuideModal(false)} />
      {/* side icons */}
      <View style={styles.itemCon}>
        <TouchableOpacity
          style={[styles.btnCon, {
            backgroundColor: polygonCoords.length > 0 ? colors.bl2 : colors.g28
          }]}
          onPress={handlePolygon}>
          <Image
            source={appIcons.polygon}
            style={{ height: 20, width: 20 }}
            resizeMode='contain'
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnCon, {
            backgroundColor: circleCoords.length > 0 ? colors.bl2 : colors.g28
          }]}
          onPress={handleCircle}>
          <Image
            source={appIcons.circle}
            style={{ height: 20, width: 20 }}
            resizeMode='contain'
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnCon}
          onPress={handleNavigator}>
          <Image
            source={appIcons.navigator}
            style={{ height: 20, width: 20 }}
            resizeMode='contain'
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnCon}
          onPress={handleZoomOut}>
          <Image
            source={appIcons.minus}
            style={{ height: 20, width: 20 }}
            resizeMode='contain'
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnCon}
          onPress={handleZoomIn}>
          <Image
            source={appIcons.plus}
            style={{ height: 20, width: 20 }}
            resizeMode='contain'
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnCon}
          onPress={handleRefresh}>
          <Image
            source={appIcons.refresh}
            style={{ height: 20, width: 20 }}
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>

      <MapView
        ref={mapRef}
        provider={'google'}
        userLocationCalloutEnabled={true}
        showsUserLocation={true}
        initialRegion={region}
        onRegionChangeComplete={region => setRegion(region)}
        customMapStyle={customStyle}
        style={[styles.container]}
      >
        {/* polygon markers */}
        {polygonCoords.map((item, index) => (
          <Marker
            coordinate={item}
            draggable
            onDragEnd={(e) => onPolygonMarkerDragEnd(e, index)}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <DragMarker />
          </Marker>
        ))}
        {/* circle markers */}
        {circleCoords.length > 0 &&
          <Marker
            coordinate={circleCoords[1]}
            draggable
            onDragEnd={onCircleMarkerDragEnd}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <DragMarker />
          </Marker>
        }
        {polygonCoords.length > 0 &&
          <Polygon
            coordinates={polygonCoords}
            strokeColor={colors.white}
            strokeWidth={2}
            fillColor={'transparent'}
          />
        }
        {circleCoords.length > 0 &&
          <Circle
            center={circleCoords[0]}
            radius={haversineDistance(circleCoords[0].latitude, circleCoords[0].longitude, circleCoords[1].latitude, circleCoords[1].longitude)}
            strokeColor={colors.white}
            strokeWidth={3}
          />
        }
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemCon: {
    position: 'absolute',
    right: 20,
    zIndex: 1,
    top: 100,
  },
  btnCon: {
    backgroundColor: colors.g28,
    height: 45,
    width: 45,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  dragMarker: {
    width: WP(5),
    aspectRatio: 1,
    borderRadius: WP(3),
    borderColor: colors.white,
    borderWidth: 3,
    backgroundColor: colors.g40,
    zIndex: 3
  }
});

const customStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: colors.b2,
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: colors.g21,
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: colors.b2,
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: colors.g21,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: colors.g21,
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: colors.b1,
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: colors.g21,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: colors.g11,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: colors.g11,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: colors.g11,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: colors.g11,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: colors.g11,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: colors.g11,
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: colors.b1,
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: colors.b1,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: colors.b1,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: colors.b1,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: colors.b1,
      },
    ],
  },
];
