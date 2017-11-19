import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

let actorImageWidth = Metrics.screenWidth * 0.6
let actorImageHeight = actorImageWidth*750/500

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingTop: 20,
    paddingBottom: Metrics.baseMargin,
    backgroundColor: Colors.darkBlue,
  },
  centered: {
    alignItems: 'center'
  },
  actorImage: {
    width: actorImageWidth,
    height: actorImageHeight
  },
  actorImageAnswer: {
    flex: 1,
    justifyContent: 'center',
    width: actorImageWidth,
    height: 70,
    marginTop: -70,
    backgroundColor: "rgba(64, 78, 224, 0.5)"
  },
  actorImageAnswerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center' 
  },    
  input: {
    height: 50,
    color: Colors.white,
    borderBottomColor: Colors.white,
    textAlign: 'center',
    marginHorizontal: Metrics.section,
  },
  text: {
    color: Colors.white
  },
  playersButton: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: Metrics.baseMargin
  },
  playerButton: {
    height: Metrics.screenWidth/2 - 3*Metrics.baseMargin,
    width: Metrics.screenWidth/2 - 3*Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
  },
  playersScore: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: Metrics.baseMargin
  },
  playerScore: {
    textAlign: 'center',    
    fontSize: 30,
    lineHeight: 60,
    color: Colors.white,
    // backgroundColor: 'red',
    width: Metrics.screenWidth/2 - 3*Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    marginVertical: Metrics.doubleBaseMargin,
    paddingBottom: 10
  },
  countingNbText: {
    textAlign: 'center',    
    fontSize: 150,
    color: Colors.white
  }
})
