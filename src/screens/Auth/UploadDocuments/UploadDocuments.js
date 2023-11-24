import React, {useState} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {
  AppButton,
  AppHeader,
  AppInput,
  AppLoader,
  BackHeader,
  DocBox,
  GalleryCard,
  ImagePickerModal,
  OutlineBox,
  TextBox,
} from '../../../components';
import {image_options, networkText} from '../../../shared/exporter';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import {setSupportClosureRequest} from '../../../redux/actions';
const UploadDocuments = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageArray, setimageArray] = useState([]);
  const [docArray, setDocArray] = useState([]);

  const {support_info} = useSelector(state => state?.auth);
  const dispatch = useDispatch(null);

  //Gallery Handlers
  const showGallery = () => {
    setShow(false);
    setTimeout(() => {
      ImagePicker.openPicker(image_options).then(image => {
        var array3 = imageArray.concat(image);
        const distinctItems = [
          ...new Map(array3.map(item => [item['size'], item])).values(),
        ];
        setimageArray(distinctItems);
        setShow(false);
      });
    }, 400);
  };
  //Camra Handlers
  const showCamera = () => {
    setShow(false);
    setTimeout(() => {
      ImagePicker.openCamera(image_options).then(image => {
        var array3 = imageArray.concat(image);
        const distinctItems = [
          ...new Map(array3.map(item => [item['size'], item])).values(),
        ];
        setimageArray(distinctItems);
        setShow(false);
      });
    }, 400);
  };
  // Remove Images
  const removeImage = (index, item) => {
    imageArray.splice(index, 1);
    setimageArray(
      imageArray.filter(item => {
        return item;
      }),
    );
  };

  //Open Docs
  const openDocumentPicker = async () => {
    const results = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.pdf],
      //There can me more options as well find above
    });
    var array3 = docArray.concat(results);
    const distinctItems = [
      ...new Map(array3.map(item => [item['size'], item])).values(),
    ];
    setDocArray(distinctItems);
  };

  // Remove Docs
  const removeDoc = (index, item) => {
    docArray.splice(index, 1);
    setDocArray(
      docArray.filter(item => {
        return item;
      }),
    );
  };

  //On Continue
  const onContinue = () => {
    const addInfoSuccess = async () => {
      setTimeout(() => {
        navigation?.navigate('ScheduleDay');
      }, 500);
    };
    support_info['images'] = imageArray;
    support_info['documents'] = docArray;
    dispatch(setSupportClosureRequest(support_info, addInfoSuccess));
  };
  return (
    <>
      <SafeAreaView style={styles.rootContainer}>
        <AppHeader />
        <BackHeader title={'Upload Documents'} />
        <View style={styles.contentContainer}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.inputContainer}>
              <GalleryCard
                onPressImg={index => {
                  removeImage(index);
                }}
                imageArray={imageArray}
                onPress={() => {
                  setShow(true);
                }}
                title={'Upload Photos'}
                // subtitle={'Max 30 images'}
              />
              <OutlineBox
                onPress={() => {
                  openDocumentPicker();
                }}
                title={'Certifications'}
                text={'Upload here'}
              />
              <DocBox
                docArray={docArray}
                onPressDoc={index => {
                  removeDoc(index);
                }}
              />
            </View>
            <View>
              <AppButton
                title={'Next'}
                onPress={() => {
                  onContinue();
                }}
              />
            </View>
          </KeyboardAwareScrollView>

          {show && (
            <ImagePickerModal
              show={show}
              onPressCamera={() => {
                showCamera();
              }}
              onPressGallery={() => {
                showGallery();
              }}
              onPressHide={() => {
                setShow(false);
              }}
            />
          )}
        </View>
      </SafeAreaView>
      <AppLoader loading={loading} />
    </>
  );
};

export default UploadDocuments;
