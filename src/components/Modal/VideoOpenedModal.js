import { ActivityIndicator, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import { Icon } from 'react-native-elements';
import Video from 'react-native-video'
import VideoPlayer from 'react-native-video-controls';
import { colors, WP, HP } from '../../shared/exporter'

const VideoOpenedModal = ({ isVisible, setModal, uri }) => {

    const [videoLoading, setVideoLoading] = useState(true)

    useEffect(() => {
        setVideoLoading(true)
    }, [])

    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={() => setModal(false)}
            onBackdropPress={() => setModal(false)}
        >
            <View style={styles.container} >
                <View style={styles.topContainer} >
                    {/* close button */}
                    <TouchableOpacity style={styles.iconCont} onPress={() => setModal(false)}>
                        <Icon
                            type='material'
                            name='close'
                            size={WP(5)}
                            color={colors.white}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                {videoLoading ?
                    <View style={styles.loader} >
                        <ActivityIndicator size={WP(7)} color={colors.p1} />
                    </View> : null
                }
                {/* {Platform.OS == 'android' ?
                                <View style={[styles.image, { width: WP(80) }]} >
                                    <VideoPlayer
                                        source={{ uri }}
                                        style={[styles.image, { marginVertical: 0, width: WP(80) }]}
                                        resizeMode={'contain'}
                                        controls={true}
                                        ignoreSilentSwitch={"ignore"}
                                        onReadyForDisplay={() => setVideoLoading(false)}
                                        onError={error => console.log('errrorrr',error)} 
                                    />
                                </View>
                                : */}
                <Video
                    source={{ uri }}
                    style={styles.image}
                    resizeMode={'contain'}
                    controls={true}
                    ignoreSilentSwitch={"ignore"}
                    onReadyForDisplay={() => setVideoLoading(false)}
                />
                {/* } */}
                </View>
            </View>
        </Modal >
    )
}

export default VideoOpenedModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    iconCont: {
        height: WP(10),
        width: WP(10),
        borderRadius: WP(5),
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: colors.p1,
        marginRight: WP(2),
        marginTop: WP(2)
    },
    image: {
        height: HP(60),
        width: WP(75),
        marginVertical: HP(4),
        backgroundColor: colors.white
    },
    fileContainerStyle: {
        width: WP(75),
        height: WP(75),
    },
    fileStyle: {
        width: WP(25),
        height: WP(25),
    },
    loader: {
        height: HP(60),
        width: WP(75),
        marginVertical: HP(4),
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    imgLoadUpperLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})