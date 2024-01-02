import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import MapView, { Circle, Marker, Polygon } from 'react-native-maps';
import { BOTTOM_TAB_HEIGHT, PADDING_BOTTOM_FOR_TAB_BAR_SCREENS, WP, appIcons, colors, family, handleLocationPermission, property_image, responseValidator, size } from '../../shared/exporter';
import Geolocation from '@react-native-community/geolocation';
import { AddressModal } from '../Modal/AddressModal';
import MapGuideModal from '../Modal/MapGuideModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app } from '../../shared/api';
import { AppLoader } from '../Loaders/AppLoader';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { useIsFocused } from '@react-navigation/native';

const DragMarker = () => (
  <View style={styles.dragMarker} />
)

const PropertyMarker = () => (
  <Image source={appIcons.propertyMarker} style={styles.propertyMarker} resizeMode='contain' />
)

const PropertyComponentModal = ({ isVisible, data, onBackdropPress, onPress }) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      backdropColor='transparent'
      onBackdropPress={onBackdropPress}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.itemContainer}
        onPress={onPress}>
        <Image source={{ uri: data?.images?.[0]?.url || property_image }} style={styles.imgStyle} />
        <View style={{ paddingVertical: 5 }}>
          <View style={styles.innerRow}>
            <Text numberOfLines={1} style={styles.nameTxtStyle}>
              {data?.title}
            </Text>
          </View>
          <View style={styles.simpleRow}>
            <Text style={styles.smallTxtStyle}>
              {`${data?.currency_type} ${data?.price || 0} ${data?.property_type != 'vacant_land' ? '| ' : ''}`}
            </Text>
            {data?.property_type != 'vacant_land' &&
              <>
                <Image
                  resizeMode="contain"
                  source={appIcons.bedIcon}
                  style={styles.bedIconStyle}
                />
                <Text style={styles.smallTxtStyle}>{data?.bed_rooms || 0}</Text>
                <Image source={appIcons.bathIcon} style={styles.bathIconStyle} />
                <Text resizeMode="contain" style={styles.smallTxtStyle}>
                  {data?.bath_rooms || 0}
                </Text>
              </>
            }
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

export const MapComponent = () => {

  const mapRef = useRef()
  const [polygonGuideModal, setPolygonGuideModal] = useState(false)
  const [circleGuideModal, setCircleGuideModal] = useState(false)
  const [region, setRegion] = useState({
    latitude: 34.28371,
    longitude: 74.458908,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [polygonCoords, setPolygonCoords] = useState([])
  const [circleCoords, setCircleCoords] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [properties, setProperties] = useState([])
  const [selectedPropertyData, setSelectedPropertyData] = useState(null)
  const [selectedPropertyDataModal, setSelectedPropertyDataModal] = useState(false)
  const navigation = useNavigation()
  const isFocused = useIsFocused()

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

  const getPropertiesAgainstPolygon = async () => {
    try {
      setIsLoading(true)
      const polygon = encodeURIComponent(JSON.stringify(polygonCoords.map(item => ({ lat: item.latitude, lng: item.longitude }))))
      const params = `search[polygon]=${polygon}`
      const res = await app.getPropertiesInsidePolygon(params);
      if (res?.status == 200) {
        setProperties(res.data || [])
      }
    } catch (error) {
      console.log(error.response);
      let msg = responseValidator(error?.response?.status, error?.response?.data);
    } finally {
      setIsLoading(false)
    }
  }

  const getPropertiesAgainstCicle = async () => {
    try {
      setIsLoading(true)
      const radius = haversineDistance(circleCoords[0].latitude, circleCoords[0].longitude, circleCoords[1].latitude, circleCoords[1].longitude) / 1000  // get radius in kilometers
      const origin = encodeURIComponent(JSON.stringify({ lat: circleCoords[0].latitude, lng: circleCoords[0].longitude }))
      const params = `search[radius]=${radius}&search[origin]=${origin}`
      const res = await app.getPropertiesInsideCircle(params);
      if (res?.status == 200) {
        setProperties(res.data || [])
      }
    } catch (error) {
      console.log(error.response);
      let msg = responseValidator(error?.response?.status, error?.response?.data);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    polygonCoords?.length > 0 && getPropertiesAgainstPolygon()
  }, [polygonCoords])

  useEffect(() => {
    circleCoords?.length > 0 && getPropertiesAgainstCicle()
  }, [circleCoords])

  useEffect(() => {
    if (isFocused && selectedPropertyData)
      setSelectedPropertyDataModal(true)
  }, [isFocused])

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

  const handlePolygon = useCallback(async () => {
    setCircleCoords([])
    setProperties([])
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

    if (!(await AsyncStorage.getItem('IS_MAP_POLYGON_GUIDE_SHOWED')))
      setPolygonGuideModal(true)
  }, [polygonCoords, region])

  const handleCircle = useCallback(async () => {
    setPolygonCoords([])
    setProperties([])
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
    if (!(await AsyncStorage.getItem('IS_MAP_CIRCLE_GUIDE_SHOWED')))
      setCircleGuideModal(true)
  }, [circleCoords, region])

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
        showsMyLocationButton={false}
        onMapReady={() => {
          setTimeout(() => {
            handleNavigator()
          }, 1000)
        }}
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
        {/* properties markers */}
        {properties.map((item, index) => (
          <Marker
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            onPress={() => {
              setSelectedPropertyData(item)
              setSelectedPropertyDataModal(true)
            }}
          // anchor={{ x: 0.5, y: 0.5 }}
          >
            <PropertyMarker />
          </Marker>
        ))}
      </MapView>
      <AppLoader loading={isLoading} />
      <PropertyComponentModal
        isVisible={selectedPropertyDataModal}
        data={selectedPropertyData}
        onBackdropPress={() => {
          setSelectedPropertyDataModal(false)
          setTimeout(() => setSelectedPropertyData(null), 1000)
        }}
        onPress={() => {
          setSelectedPropertyDataModal(false)
          setTimeout(() => {
            navigation.navigate('PropertyDetail', { propertyData: selectedPropertyData })
          }, 1000)
        }}
      />
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
  },
  propertyMarker: {
    width: WP(10),
    height: WP(10),
    zIndex: 3
  },
  modalContainer: {
    height: '100%',
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: WP('4.2'),
    paddingHorizontal: WP('4'),
    backgroundColor: '#383838',
    width: WP(90),
    borderRadius: 15,
    position: 'absolute',
    bottom: PADDING_BOTTOM_FOR_TAB_BAR_SCREENS
  },
  imgStyle: {
    borderRadius: 15,
    width: WP('26.3'),
    height: WP('24.1'),
    marginRight: WP('2.5'),
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameTxtStyle: {
    width: '72%',
    color: colors.white,
    fontSize: size.large,
    fontFamily: family.Gilroy_SemiBold,
  },
  simpleRow: {
    paddingTop: 13,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallTxtStyle: {
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  bedIconStyle: {
    width: 14,
    height: 9,
    marginRight: 3,
    tintColor: colors.white
  },
  bathIconStyle: {
    width: 11,
    height: 11,
    marginLeft: 8,
    marginRight: 4,
    tintColor: colors.white
  },
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
