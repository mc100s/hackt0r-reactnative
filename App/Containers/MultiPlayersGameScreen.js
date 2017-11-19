import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../../App/Components/RoundedButton'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MultiPlayersGameScreenStyle'
import { setTimeout } from 'core-js/library/web/timers';

const dataActors = require('../Fixtures/actors.json').actors

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
    this.state.actor = dataActors[Math.floor(Math.random() * dataActors.length)]
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
    this.setState({
      ...this.state,
      status: 'question',
      actor: dataActors[Math.floor(Math.random() * dataActors.length)],
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
