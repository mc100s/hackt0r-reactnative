import React from 'react'
import { View, Modal } from 'react-native'
import DebugConfig from '../../App/Config/DebugConfig'
import RoundedButton from '../../App/Components/RoundedButton'
import PresentationScreen from './PresentationScreen'
import { StackNavigator } from 'react-navigation'

export default class DevscreensButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render () {
    // const { navigate } = this.props.navigation;
    
    if (DebugConfig.showDevScreens) {
      return (
        <View>
          <RoundedButton onPress={this.toggleModal}>
            Open DevScreens
          </RoundedButton>
          {/* <RoundedButton onPress={() => navigate('HomeScreen') }>
            Open DevScreens
          </RoundedButton> */}
          <Modal
            visible={this.state.showModal}
            onRequestClose={this.toggleModal}>
            <PresentationScreen screenProps={{ toggle: this.toggleModal }} />
          </Modal>
        </View>
      )
    } else {
      return <View />
    }
  }
}
