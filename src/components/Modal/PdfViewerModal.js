import { StyleSheet, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { Icon } from 'react-native-elements';
import { colors, WP, HP } from '../../shared/exporter'
import Pdf from 'react-native-pdf';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PdfViewerModal = ({ isVisible, setModal, uri }) => {
    const {top} = useSafeAreaInsets()
    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={() => setModal(false)}
            onBackdropPress={() => setModal(false)}
            style={{ margin: 0, backgroundColor: colors.white }}
        >
            {/* close button */}
            <TouchableOpacity style={[styles.iconCont,{top:top+WP(2)}]} onPress={() => setModal(false)}>
                <Icon
                    type='material'
                    name='close'
                    size={WP(5)}
                    color={colors.white}
                />
            </TouchableOpacity>
            <Pdf
                trustAllCerts={false}
                source={{ uri }}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdfStyle} />
        </Modal >
    )
}

export default PdfViewerModal

const styles = StyleSheet.create({
    iconCont: {
        position: 'absolute',
        right: WP(2),
        zIndex: 1,
        height: WP(7),
        width: WP(7),
        borderRadius: WP(4),
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: colors.p1,
    },
    pdfStyle: {
        width: WP(100),
        height: HP(100),
    }
})