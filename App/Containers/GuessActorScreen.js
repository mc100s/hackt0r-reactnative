import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View, TextInput } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../../App/Components/RoundedButton'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/GuessActorScreenStyle'

const dataActors = require('../Fixtures/actors.json').actors


class GuessActorScreen extends React.Component {
  state = {
    actor: {
      "name": "Matt Damon",
      "pictureUrl": 'https://image.tmdb.org/t/p/w500/elSlNgV8xVifsbHpFsqrPGxJToZ.jpg'
    },
    isValidated: false
  }

  componentWillMount() {

    this.state.actor = dataActors[Math.floor(Math.random() * dataActors.length)]
  }

  check = () => {
    this.state.isValidated = true
  }

  renderButton = () => {
    if (false && !this.state.isValidated) {
      return (
        <RoundedButton
          style
          // onPress={() => this.props.navigation.navigate('GuessActorScreen')}
          onPress={this.check}
        >
          Check
        </RoundedButton>
      )
    }
    else {
      return (
        <RoundedButton
          style
          onPress={() => this.props.navigation.navigate('GuessActorScreen')}
        >
          Next
        </RoundedButton>
      )
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.centered}>
            <Image
              style={styles.actorImage}
              source={{ uri: this.state.actor.pictureUrl }}
            />
            <Text>{ this.state.actor.name }</Text>
          </View>

          <TextInput style={styles.input} />

          
          {this.renderButton()}
        </KeyboardAvoidingView>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(GuessActorScreen)
