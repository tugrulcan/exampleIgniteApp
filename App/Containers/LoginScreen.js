import React, { PropTypes } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  Modal,
  LayoutAnimation
} from "react-native";
import { connect } from "react-redux";
import styles from "./Styles/LoginScreenStyles";
import { Images, Metrics } from "../Themes";
import LoginActions from "../Redux/LoginRedux";

class LoginScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func
  };

  isAttempting = false;
  keyboardDidShowListener = {};
  keyboardDidHideListener = {};

  constructor(props) {
    super(props);
    this.state = {
      username: "surucu@obis.com.tr",
      password: "sifre123",
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth },
      open: false,
      modalVisible: false
    };
    this.isAttempting = false;
  }

  componentWillReceiveProps(newProps) {
    this.forceUpdate();
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.fetching) {
      this.props.navigation.goBack();
    }
  }

  componentWillMount() {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let newSize = Metrics.screenHeight - e.endCoordinates.height;
    this.setState({
      visibleHeight: newSize,
      topLogo: { width: 100, height: 70 }
    });
  };

  keyboardDidHide = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    });
  };

  handlePressLogin = () => {
    // const { username, password } = this.state
    // this.isAttempting = true
    // // attempt a login - a saga is listening to pick it up from here.
    // this.props.attemptLogin(username, password)
    this.setState({ open: true });
    //alert("test");
    this.setModalVisible(!this.state.modalVisible);

    const { navigate } = this.props.navigation;
    navigate("ExampleScreen1");
  };

  handleChangeUsername = text => {
    this.setState({ username: text });
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  handleChangePassword = text => {
    this.setState({ password: text });
  };

  render() {
    const { username, password } = this.state;
    const { fetching } = this.props;
    const editable = !fetching;
    const textInputStyle = editable
      ? styles.textInput
      : styles.textInputReadonly;
    return (
      <ScrollView
        contentContainerStyle={{ justifyContent: "center" }}
        style={[styles.container, { height: this.state.visibleHeight }]}
        keyboardShouldPersistTaps="always"
      >
        <Image
          source={Images.logo}
          style={[styles.topLogo, this.state.topLogo]}
        />

        <View style={styles.form}>
          <View style={styles.row}>
            <Text style={styles.headerLabel}>
              Şoför Girişi
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Kullanıcı Adı</Text>
            <TextInput
              ref="username"
              style={textInputStyle}
              value={username}
              editable={editable}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={this.handleChangeUsername}
              underlineColorAndroid="transparent"
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder="Kullanıcı Adı"
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Şifre</Text>
            <TextInput
              ref="password"
              style={textInputStyle}
              value={password}
              editable={editable}
              keyboardType="default"
              returnKeyType="go"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              onChangeText={this.handleChangePassword}
              underlineColorAndroid="transparent"
              onSubmitEditing={this.handlePressLogin}
              placeholder="Şifre"
            />
          </View>

          <View style={[styles.loginRow]}>
            <TouchableOpacity
              style={styles.loginButtonWrapper}
              onPress={this.handlePressLogin}
            >
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>Giriş Yap</Text>
              </View>
            </TouchableOpacity>
            {/*<TouchableOpacity style={styles.loginButtonWrapper} onPress={() => this.props.navigation.goBack()}>
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>İptal</Text>
              </View>
            </TouchableOpacity>*/}
          </View>
        </View>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onShow={() => {
            setTimeout(() => {
              this.setState({ modalVisible: false });
            }, 800);
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  paddingRight: 15
                }}
              >
                <Image
                  style={{
                    width: 32,
                    height: 32
                  }}
                  source={Images.success}
                />
              </View>

              <Text style={styles.alertLabel}>
                Giriş yapıldı!
              </Text>
            </View>
          </View>

        </Modal>

      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.login.fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    attemptLogin: (username, password) =>
      dispatch(LoginActions.loginRequest(username, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
