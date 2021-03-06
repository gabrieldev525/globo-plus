// react imports
import React from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//IconAntDesign
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import IconFontisto from 'react-native-vector-icons/Fontisto'


// third imports
import { withFormik } from 'formik'
// project imports
import {
  registerUser,
  failRegister,
  registerLoading
} from '../../store/authentication/action'

// local imports
import {
  Container,
  Logo,
  InputField,
  HyperLink,
  ContainerView,
  ContainerItem,
  Button,
  Text
} from './styles'
import logo from '../../assets/logo.png'

//Global Styles
const GlobalStyle = StyleSheet.create({
  Icon: {
    position: "absolute",
    right: 1,
    bottom: 25,
  }
})

const RegisterScreen = (props) => {

  return (
    <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#333'}}>
      <Container>
        <Logo source={logo} />

        {
          props.authentication.register_fail && (
            <Text color='#ff3a24'>Erro ao realizar o cadastro!</Text>
          )
        }

        {
          props.authentication.register_loading && (
            <ActivityIndicator size="large" color="#4623DE" />
          )
        }

        <ContainerView>
          <ContainerItem>
            <InputField
              placeholder='Digite seu login'
              value={props.values.username}
              onChangeText={text => props.setFieldValue('username', text)} />

            <IconFontAwesome5
              style={GlobalStyle.Icon}
              name='user'
              color='#fff'
              size={25} />
          </ContainerItem>

          <ContainerItem>
            <InputField
              placeholder='Digite seu email'
              value={props.values.email}
              onChangeText={text => props.setFieldValue('email', text)} />

            <IconMaterialIcons
              style={GlobalStyle.Icon}
              name='email'
              color='#fff'
              size={25} />
          </ContainerItem>

          <ContainerItem>
            <InputField
              placeholder='Digite sua senha'
              value={props.values.password}
              secureTextEntry
              onChangeText={text => props.setFieldValue('password', text)} />

            <IconFontisto
              style={GlobalStyle.Icon}
              name='key'
              color='#fff'
              size={25} />
          </ContainerItem>

          <Button
            onPress={props.handleSubmit}>
            <Text font={'20px'} >Conectar</Text>
          </Button>

          <HyperLink
            onPress={() => {
              props.navigation.replace('Login')
            }}>
            Já possui uma conta?
          </HyperLink>
        </ContainerView>
      </Container>
    </KeyboardAwareScrollView>
  )
}

const formikEnhancer = withFormik({
  mapPropsToValues: () => ({ email: '', password: '', username: '' }),

  handleSubmit: async (values, { props }) => {
    props.registerLoading(true)
    await props.registerUser(values)
      .then(async () => {
        // then register, ask to user login again
        props.navigation.replace('Login')
      })
      .catch(() => {
        props.registerLoading(false)
        props.failRegister()
      })
  }
})(RegisterScreen)

const mapStateToProps = ({ authentication }) => {
  return {
    authentication
  }
};

export default connect(
  mapStateToProps, {
  registerUser,
  failRegister,
  registerLoading
}
)(formikEnhancer)