import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View } from 'react-native'
import { connect } from 'react-redux'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import RoundedButton from '../../App/Components/RoundedButton'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import { Images } from '../Themes'

// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends React.Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        {/* <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' /> */}
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.logoWhite} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText}>
              Welcome on Hacktor!
            </Text>
          </View>

          <RoundedButton onPress={() => this.props.navigation.navigate('GuessActorScreen')} >
            Play Quiz
          </RoundedButton>
          <RoundedButton onPress={() => this.props.navigation.navigate('HomeScreen')} >
            Your Hacktors list
          </RoundedButton>
          <RoundedButton onPress={() => this.props.navigation.navigate('HomeScreen')} >
            Two players game
          </RoundedButton>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
