import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View, TextInput } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../../App/Components/RoundedButton'
import GuessActorActions from '../Redux/GuessActorRedux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/GuessActorScreenStyle'

const dataActors = require('../Fixtures/actors.json').actors


function areSameNames(a, b) {
  // TODO: improve this function to allow small mistakes
  return a.trim().toUpperCase() == b.trim().toUpperCase()
}
const congratMessages = ["Yes!", "Congrats!", "Well guessed!", "Awesome!", "You rock!"];

class GuessActorScreen extends React.Component {
  state = {
    actor: {
      "name": "Matt Damon",
      "pictureUrl": 'https://image.tmdb.org/t/p/w500/elSlNgV8xVifsbHpFsqrPGxJToZ.jpg'
    },
    isCorrect: false,
    isValidated: false,
    inputName: "",
    message: ""
  }

  componentWillMount() {
    this.state.actor = dataActors[Math.floor(Math.random() * dataActors.length)]
  }

  check = () => {
    let isCorrect = areSameNames(this.state.inputName, this.state.actor.name) 
    let message
    if (isCorrect)
      message = congratMessages[Math.floor(congratMessages.length*Math.random())]
    else
      message = this.state.inputName == "" ? "It was " + this.state.actor.name : "You guess wrong, it was " + this.state.actor.name
    this.setState({
      isValidated: true,
      isCorrect,
      message
    })      
  }

  nextActor = () => {
    this.setState({
      ...this.state,
      actor: dataActors[Math.floor(Math.random() * dataActors.length)],
      isCorrect: false,
      isValidated: false,
      inputName: "",
      message: ""
    })
    this.inputName.focus()
  }

  renderButton = () => {
    if (!this.state.isValidated) {
      let buttonMsg = this.state.inputName == "" ? "I don't know" : "Check"
      return (
        <RoundedButton
          // onPress={() => this.props.navigation.navigate('GuessActorScreen')}
          onPress={this.check}
        >
          {buttonMsg}
        </RoundedButton>
      )
    }
    else {
      return (
        <RoundedButton
          onPress={this.nextActor}
          // onPress={() => this.props.navigation.navigate('GuessActorScreen')}
        >
          Next
        </RoundedButton>
      )
    }
  }

  renderSolution = () => {
    if (this.state.isValidated) {
      let successFailureStyles = this.state.isCorrect ? styles.actorImageAnswerSuccess : styles.actorImageAnswerFailure
      return (
        <View style={[styles.actorImageAnswer, successFailureStyles]}>
          <Text style={[styles.text, styles.actorImageAnswerText]}>{ this.state.actor.name }</Text>
        </View> 
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
            {this.renderSolution()}
          </View>
                   

          <TextInput
            autoFocus={true}
            underlineColorAndroid={"white"}
            style={styles.input}
            ref= {(el) => { this.inputName = el }}
            onChangeText={(inputName) => this.setState({inputName})}
            value={this.state.inputName}
          />
          
          {this.renderButton()}

          <View style={styles.centered}>
            <Text style={styles.text}>{ this.state.message }</Text>
          </View>
          
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
    // test: () => dispatch(GuessActorActions.guessActorRequest("myData"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuessActorScreen)
