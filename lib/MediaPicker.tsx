import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  styles,
  _modalStyle,
  _buttonStyle,
  _buttonTextStyle,
} from "./MediaPicker.style";
import { Modalize } from "react-native-modalize";
import Icon from "react-native-dynamic-vector-icons";
import { isIPhoneXFamily } from "@freakycoder/react-native-helpers";
import ImagePicker, { Image } from "react-native-image-crop-picker";

export interface IProps {
  cameraOnPress?: (image: Image | Image[]) => void;
  galleryOnPress?: (images: Image | Image[]) => void;
  IconComponent: any;
  multiple: boolean;
  cameraText: string;
  galleryText: string;
  cameraIconName: string;
  cameraIconType: string;
  cameraIconSize: number;
  backgroundColor: string;
  cameraIconColor: string;
  galleryIconName: string;
  galleryIconType: string;
  galleryIconSize: number;
  cameraTextColor: string;
  galleryTextColor: string;
  cameraButtonSize: number;
  galleryIconColor: string;
  galleryButtonSize: number;
  cameraButtonBackgroundColor: string;
  galleryButtonBackgroundColor: string;
  compressImageQuality: number;
}

interface IState {}

export default class MediaPicker extends React.Component<IProps, IState> {
  modal = React.createRef<Modalize>();

  static defaultProps = {
    multiple: true,
    cameraIconSize: 20,
    IconComponent: Icon,
    galleryIconSize: 23,
    cameraText: "Camera",
    cameraButtonSize: 50,
    galleryButtonSize: 50,
    galleryText: "Gallery",
    cameraIconName: "camera",
    cameraIconColor: "#90a1fc",
    backgroundColor: "#90a1fc",
    cameraTextColor: "#fdfdfd",
    galleryIconType: "FontAwesome",
    galleryIconColor: "#90a1fc",
    galleryTextColor: "#fdfdfd",
    galleryIconName: "image",
    cameraIconType: "FontAwesome",
    cameraButtonBackgroundColor: "#fdfdfd",
    galleryButtonBackgroundColor: "#fdfdfd",
    compressImageQuality: 0.8,
  };

  openModal = () => {
    if (this.modal.current) {
      this.modal.current.open();
    }
  };

  closeModal = () => {
    if (this.modal.current) {
      this.modal.current.close();
    }
  };

  openGallery = () => {
    this.closeModal();
    return ImagePicker.openPicker({
      multiple: this.props.multiple,
      writeTempFile: true, // iOS Only
      compressImageQuality: this.props.compressImageQuality,
    });
  };

  openCamera = () => {
    this.closeModal();
    return ImagePicker.openCamera({
      mediaType: "any",
      writeTempFile: true, // iOS Only
      compressImageQuality: this.props.compressImageQuality,
    });
  };

  handleCameraPressed = () => {
    this.openCamera()
      .then(
        (image: any) =>
          this.props.cameraOnPress && this.props.cameraOnPress(image)
      )
      .catch(
        (err: any) => this.props.cameraOnPress && this.props.cameraOnPress(err)
      );
  };

  handleGalleryPressed = () => {
    this.openGallery()
      .then(
        (images: any) =>
          this.props.galleryOnPress && this.props.galleryOnPress(images)
      )
      .catch(
        (err: any) =>
          this.props.galleryOnPress && this.props.galleryOnPress(err)
      );
  };

  renderContent = () => {
    const {
      cameraText,
      galleryText,
      IconComponent,
      cameraIconName,
      cameraIconType,
      cameraIconSize,
      cameraIconColor,
      galleryIconName,
      galleryIconType,
      galleryIconSize,
      cameraTextColor,
      galleryIconColor,
      cameraButtonSize,
      galleryTextColor,
      galleryButtonSize,
      cameraButtonBackgroundColor,
      galleryButtonBackgroundColor,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.containerGlue}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.center,
                _buttonStyle(cameraButtonSize, cameraButtonBackgroundColor),
              ]}
              onPress={this.handleCameraPressed}
            >
              <IconComponent
                name={cameraIconName}
                type={cameraIconType}
                size={cameraIconSize}
                color={cameraIconColor}
              />
            </TouchableOpacity>
            <Text style={_buttonTextStyle(cameraTextColor)}>{cameraText}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.center,
                _buttonStyle(galleryButtonSize, galleryButtonBackgroundColor),
              ]}
              onPress={this.handleGalleryPressed}
            >
              <IconComponent
                name={galleryIconName}
                type={galleryIconType}
                size={galleryIconSize}
                color={galleryIconColor}
              />
            </TouchableOpacity>
            <Text style={_buttonTextStyle(galleryTextColor)}>
              {galleryText}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { backgroundColor, ...rest } = this.props;
    return (
      <Modalize
        ref={this.modal}
        snapPoint={isIPhoneXFamily() ? 115 : 100}
        modalStyle={_modalStyle(backgroundColor)}
        {...rest}
      >
        {this.renderContent()}
      </Modalize>
    );
  }
}
