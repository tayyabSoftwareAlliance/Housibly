import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
  TextInput,
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
import { useIsFocused, useRoute } from '@react-navigation/native';
import { AppButton } from '../AppButton/AppButton';
import { BlurView } from "@react-native-community/blur";

const DragMarker = () => (
  <View style={styles.dragMarker} />
)

const PropertyMarker = () => (
  <Image source={appIcons.propertyMarker} style={styles.propertyMarker} resizeMode='contain' />
)

let hideSelectedPropertyTimeout;

const PropertyComponentModal = ({ isVisible, data, onBackdropPress, onPress }) => {

  const params = useRoute().params

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      backdropColor='rgba(0,0,0,1)'
      onBackdropPress={onBackdropPress}
      onBackButtonPress={onBackdropPress}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.itemContainer, params?.from == 'bottomTab' && { bottom: PADDING_BOTTOM_FOR_TAB_BAR_SCREENS + WP(11) }]}
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

const ZipCodeModal = ({ isVisible, onBackdropPress, onSubmitEditing }) => {

  const inputRef = useRef()

  useEffect(() => {
    isVisible && setTimeout(() => inputRef.current?.focus(), 1000)
  }, [isVisible])

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      style={[styles.modalContainer, { margin: 0 }]}
      backdropColor='rgba(0,0,0,0.1)'
      onBackdropPress={onBackdropPress}
      onBackButtonPress={onBackdropPress}
    >
      <BlurView
        style={{ ...StyleSheet.absoluteFill }}
        blurType="extraDark"
        blurAmount={10}
        blurRadius={10}
      />
      <Pressable style={styles.zipCodeModalContainer} onPress={onBackdropPress} >
        <TextInput
          ref={inputRef}
          style={styles.zipCodeInput}
          placeholder='Postal Code'
          placeholderTextColor={colors.white}
          onSubmitEditing={(e) => onSubmitEditing(e.nativeEvent.text)}
          keyboardType='numeric'
          maxLength={10}
        />
      </Pressable>
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
  const [zipCodeModal, setZipCodeModal] = useState(false)
  const [zipCode, setZipCode] = useState('')
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

  const getPropertiesAgainstZipCode = async (zipCode) => {
    try {
      setZipCode(zipCode)
      setZipCodeModal(false)
      setPolygonCoords([])
      setCircleCoords([])
      setProperties([])
      setIsLoading(true)
      const params = `search[zip_code]=${zipCode}`
      const res = await app.getPropertiesAgainstZipCode(params);
      if (res?.status == 200) {
        setProperties(res.data || [])
        res.data?.length > 0 && mapRef.current?.animateToRegion({
          ...region,
          latitude: res.data[0]?.latitude,
          longitude: res.data[0]?.longitude,
        })
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
        const currentRegion = {
          ...region,
          latitude: pos?.coords?.latitude,
          longitude: pos?.coords?.longitude,
        }
        mapRef.current?.animateToRegion(currentRegion)
        setRegion(currentRegion)
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

  // const handleRefresh = useCallback(() => {

  // }, [])

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
        {/* <TouchableOpacity
          style={styles.btnCon}
          onPress={handleRefresh}>
          <Image
            source={appIcons.refresh}
            style={{ height: 20, width: 20 }}
            resizeMode='contain'
          />
        </TouchableOpacity> */}
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
          }, 0)
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
              hideSelectedPropertyTimeout && clearTimeout(hideSelectedPropertyTimeout)
              setSelectedPropertyData(item)
              setSelectedPropertyDataModal(true)
            }}
          // anchor={{ x: 0.5, y: 0.5 }}
          >
            <PropertyMarker />
          </Marker>
        ))}
      </MapView>
      <View style={styles.buttonsContainerStyle} >
        {zipCode &&
          <View style={styles.zipCodeContainer}>
            <Text style={styles.zipCodeTxt}>{zipCode}</Text>
            <TouchableOpacity
              onPress={() => {
                setZipCode('')
                setProperties([])
              }}
              style={styles.zipCodeTxtCloseBtn}
            >
              <Image source={appIcons.cross} style={styles.zipCodeTxtCloseBtnImg} resizeMode='contain' />
            </TouchableOpacity>
          </View>
        }
        <View style={styles.buttonsContainerStyleInner}>
          <AppButton
            width="38.5%"
            height={WP('10.3')}
            title="Enter Zip/Postal Code"
            borderColor={colors.p2}
            shadowColor={colors.white}
            textStyle={styles.btnTxtStyle}
            onPress={() => setZipCodeModal(true)}
          />
          {properties.length > 0 &&
            <AppButton
              width="38.5%"
              height={WP('10.3')}
              title="View All Properties"
              borderColor={colors.p2}
              shadowColor={colors.white}
              textStyle={styles.btnTxtStyle}
              buttonStyle={{ marginLeft: WP(5) }}
              onPress={() => navigation.navigate('AllProperties', { properties })}
            />
          }
        </View>
      </View>
      <AppLoader loading={isLoading} />
      <PropertyComponentModal
        isVisible={selectedPropertyDataModal}
        data={selectedPropertyData}
        onBackdropPress={() => {
          setSelectedPropertyDataModal(false)
          hideSelectedPropertyTimeout = setTimeout(() => setSelectedPropertyData(null), 1000)
        }}
        onPress={() => {
          setSelectedPropertyDataModal(false)
          setTimeout(() => {
            navigation.navigate('PropertyDetail', { propertyData: selectedPropertyData })
          }, 1000)
        }}
      />
      <ZipCodeModal
        isVisible={zipCodeModal}
        onBackdropPress={() => setZipCodeModal(false)}
        onSubmitEditing={(zipCode) => getPropertiesAgainstZipCode(zipCode)}
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
    bottom: WP(18)
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
  btnTxtStyle: {
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_SemiBold,
  },
  buttonsContainerStyle: {
    position: 'absolute',
    bottom: WP(7),
    width: '100%',
    alignItems: 'center'
  },
  buttonsContainerStyleInner: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  zipCodeContainer: {
    backgroundColor: colors.white,
    padding: WP(1),
    paddingHorizontal: WP(4),
    borderRadius: WP(1.5),
    marginBottom: WP(7)
  },
  zipCodeTxt: {
    color: colors.b1,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_SemiBold,
  },
  zipCodeTxtCloseBtn: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#C4C4C4',
    height: 16,
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  zipCodeTxtCloseBtnImg: {
    height: 8,
    width: 8,
    tintColor: colors.b1
  },
  zipCodeModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zipCodeInput: {
    width: WP(30),
    color: colors.white,
    fontSize: size.small,
    fontFamily: family.Gilroy_Medium,
    textAlign: 'center'
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
