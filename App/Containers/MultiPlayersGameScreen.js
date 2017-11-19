import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../../App/Components/RoundedButton'
import { Colors } from '../Themes/'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles, {actorImageHeight, actorImageWidth} from './Styles/MultiPlayersGameScreenStyle'
// import { setTimeout, setInterval } from 'core-js/library/web/timers';
// import { clearInterval } from 'timers';

const dataActors = require('../Fixtures/actors.json').actors

const nbRows = 7
const nbCols = 5
const timeout = 1000

class MultiPlayersGameScreen extends React.Component {
  
  state = {
    actor: {},
    clickedPlayer: undefined, // could be undefined, 1 or 2,
    status: 'question', // Could be 'question', 'counting', 'validation', 'showingAnswer'
    countingNb: undefined,
    players: {
      1: {
        score: 0
      },
      2: {
        score: 0
      }
    }
  }

  componentWillMount() {
    this.nextQuestion()
  }

  // nextActor = () => {
  //   this.setState({
  //     ...this.state,
  //     actor: dataActors[Math.floor(Math.random() * dataActors.length)],
  //     isCorrect: false,
  //     isValidated: false,
  //     inputName: "",
  //     message: ""
  //   })
  //   this.inputName.focus()
  // }

  clickByPlayer = (playerId) => {
    clearInterval(this.state.intervalId)
    this.setState({
      ...this.state,
      clickedPlayer: playerId,
      status: 'counting'
    })
    for (let i = 3; i >= 0; i--) {
      setTimeout(() => {
        this.setState({
          ...this.state,
          countingNb: i
        })
      }, (3-i)*1000);
    }
    setTimeout(() => {
      this.setState({
        ...this.state,
        status: 'validation'
      })
    }, 3000)
  }

  clickUnknown = () => {
    clearInterval(this.state.intervalId)
    this.setState({
      ...this.state,
      status: 'showingAnswer'
    })
  }

  clickCorrectWrong = (isCorrect) => {
    let players = this.state.players
    players[this.state.clickedPlayer].score += isCorrect ? 1 : -1
    this.setState({
      ...this.state,
      status: 'showingAnswer',
      players
    })
  }

  nextQuestion = () => {
    
    let boxesAreDisplayed = []
    for (var row = 0; row < nbRows; row++) {
      for (var col = 0; col < nbCols; col++) {
        boxesAreDisplayed.push(Math.random() < 0.01)
      }
    }
    
    let intervalId = setInterval(() => {
      let cont = true
      for (var i = 0; i < boxesAreDisplayed.length && cont; i++) {
        let indRandom = Math.floor(Math.random()*boxesAreDisplayed.length)
        if (!boxesAreDisplayed[indRandom]) {
          boxesAreDisplayed[indRandom] = true
          cont = false
        }
      }
      this.setState({
        ...this.state,
        boxesAreDisplayed
      })
    }, timeout)

    this.setState({
      ...this.state,
      status: 'question',
      intervalId,
      actor: dataActors[Math.floor(Math.random() * dataActors.length)],
      boxesAreDisplayed
    })
  }

  renderButtons = () => {
    switch (this.state.status) {
      case 'question':
        return (
          <View>
            <View style={styles.playersButton}>
              <RoundedButton
                onPress={() => { this.clickByPlayer(1) }}
                style={styles.playerButton}
                text={`Player 1`}
              >
                </RoundedButton>
              <RoundedButton
                onPress={() => { this.clickByPlayer(2) }}
                style={styles.playerButton}
                text={`Player 2`}
              >
                </RoundedButton>
            </View>
            <RoundedButton
              onPress={() => { this.clickUnknown() }}
            >
              We don't know
            </RoundedButton>
          </View>
        )
    case 'counting':
      return (
        <View>
          <Text style={styles.countingNbText}>{this.state.countingNb}</Text>
        </View>
      )
    case 'validation':
      return (
        <View>
          <View style={styles.playersButton}>
            <RoundedButton
              onPress={() => { this.clickCorrectWrong(true) }}
              style={styles.playerButton}
            >
              Correct
            </RoundedButton>
            <RoundedButton
              onPress={() => { this.clickCorrectWrong(false) }}
              style={styles.playerButton}
            >
              Wrong
            </RoundedButton>
          </View>
        </View>
      )
    case 'showingAnswer':
      return (
        <View>
          <View style={styles.playersScore}>
            <Text
              style={styles.playerScore}
            >
              Player 1{"\n"}
              {this.state.players[1].score}
            </Text>
            <Text
              style={styles.playerScore}
            >
              Player 2{"\n"}
              {this.state.players[2].score}
            </Text>
          </View>
          <RoundedButton
            onPress={() => { this.nextQuestion() }}
          >
            Next Question
          </RoundedButton>
        </View>
      )
    default:
      return (
        <View>
          <Text>
            Something went wrong. status = {this.state.status}
          </Text>
        </View>
      )
    }
  }    

  renderBlackBoxes = () => {
    if (this.state.status == 'validation' || this.state.status == 'showingAnswer')
      return;
    let boxes = []
    let blackBoxStyle = {
      width: actorImageWidth/nbCols,
      height: actorImageHeight/nbRows,
    }

    for (var key = 0; key < this.state.boxesAreDisplayed.length; key++) {
      boxes.push(
        (
          <View style={[blackBoxStyle, {backgroundColor: this.state.boxesAreDisplayed[key] ? 'transparent' : Colors.black }]} key={key}>
            {/* <Text style={styles.text}>{key}</Text> */}
          </View>
        )
      )
    }
    return (
      <View style={styles.blackBoxes}>
        {boxes}
      </View>
    )
  }

  renderSolution = () => {
    if (this.state.status === 'validation' || this.state.status === 'showingAnswer') {
      return (
        <View style={[styles.actorImageAnswer]}>
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
            {this.renderBlackBoxes()}
            {this.renderSolution()}
          </View>
          

          <View style={styles.centered}>
            <Text style={styles.text}>{ this.state.message }</Text>
          </View>
          
        </KeyboardAvoidingView>
        {this.renderButtons()}
        
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

export default connect(mapStateToProps, mapDispatchToProps)(MultiPlayersGameScreen)
