export {appImages, appIcons, appLogos, appSvgs} from './theme/assets';

export {colors} from './theme/colors';
export {size} from './theme/sizes';
export {family} from './theme/family';
export {spacing} from './theme/spacing';
export {
  WP,
  HP,
  scrWidth,
  scrHeight,
  platformOrientedCode,
  BOTTOM_TAB_HEIGHT,
  PADDING_BOTTOM_FOR_TAB_BAR_SCREENS
} from './theme/responsive';

export {
  LoginVS,
  loginFormFields,
  forgotFormFields,
  ForgotPasswordVS,
  resetFormFields,
  ResetPasswordVS,
  updateFormFields,
  PhoneAuthFieldsVS,
  PhoneAuthFields,
  signupFormFields,
  SignupVS,
  AddPersonalInfoField,
  AddPersonalInfoVS,
  codeFormFields,
  CodeVS,
  editFormFields,
  editProfileFieldsVS,
  addCardFormFields,
  addCardVS,
  AddSupportInfoField,
  AddSupportInfoVS,
} from './utilities/validations';
export {
  StatusBarHeight,
  DimensionsWindowHeight,
  DimensionsWindowWidth,
} from './theme/statusBarHeight';

export {setupAxios, HTTP_CLIENT, initialConfig} from './utilities/config';
export {BASE_URL, ENDPOINTS} from './utilities/endpoints';
export {
  ANDROID,
  IOS,
  emailRegex,
  GOOGLE_MAP_KEY,
  web_client_id,
  profile_uri,
  stripe_publishableKey,
  video_url,
  sublists,
  lot_unit_list,
  lot_area_unit_list,
  property_type_list,
  filter_property_type_list,
  filter_bookmarks_list,
  level_list,
  beds_list,
  bath_list,
  lat_frontage_list,
  networkText,
  settings,
  inputItems,
  home_items,
  condo_items,
  image_options,
  property_image,
  weekDays,
  months
} from './utilities/constant';
export {header, authHeader} from './utilities/headers';
export {
  checkConnected,
  capitalizeFirstLetter,
  responseValidator,
  checkBrand,
  calculateDateDiff,
  checkExerciseItemOrder,
  convertNumberSystem,
  calculateCurrentDateDiff,
  best_set,
  setDigitSize,
  propertyFormData,
  handleLocationPermission,
  handleCameraPermission
} from './utilities/helper';
export {commonStyles} from './theme/commonStyles';