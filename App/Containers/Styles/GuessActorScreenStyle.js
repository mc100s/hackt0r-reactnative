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
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  actorImage: {
    width: actorImageWidth,
    height: actorImageHeight
  },
  input: {
    height: 50,
    color: Colors.white,
    borderBottomColor: Colors.white,
    // flexGrow: 1,
    textAlign: 'center',
    marginHorizontal: Metrics.section,
  },
  text: {
    color: Colors.white
  }
})
