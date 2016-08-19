import React, { Component } from 'react';
let TargetRing = require('./components/TargetRing')
let Pupil = require('./components/Pupil')
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker,
  TouchableHighlight,
  LayoutAnimation,
  TouchableWithoutFeedback,
  Animated,
  Dimensions
} from 'react-native';

const basicWidth = Dimensions.get('window').width * .75
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


class Level1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      txt: 'Welcome',
      shrinkPupil: false,
      directHit: false
    };
  }

  handlePressIn() {
    this.setState({ txt: '' })
  }

  handlePressOut(result) {
    let message = result ? 'Success' : 'Failure'
    if(result){
      this.setState({ directHit: !this.state.directHit, txt: message })
      // this.props.checkScore()
    } else {
      this.setState({ txt: message })
    }
  }

  updateScore(points) {
    this.props.updateScore(points)
    this.setState({ shrinkPupil: true })
  }

  successFinished() {
    this.setState({ shrinkPupil: false })
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.paddingLayer}>
          <Pupil handlePressIn={this.handlePressIn.bind(this)}
                 handlePressOut={this.handlePressOut.bind(this)}
                 shrinking={this.state.shrinkPupil}
                 successFinished={this.successFinished.bind(this)}/>
        </View>

        <View style={styles.holdOpen}>
          <Text style={styles.boardText}>{this.state.txt || '...'}</Text>
          <TargetRing hitDetected={this.state.directHit}
                      updateScore={this.updateScore.bind(this)}/>
        </View>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight,
    width: screenWidth,
  },
  holdOpen: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetView: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0
  },
  paddingLayer: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    position: 'absolute',
    zIndex: 5

  },
  viewText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 15
  },
  pupilView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'red',
  },
  boardText: {
    color: 'white',
    position: 'absolute',
    top: screenHeight*.2,
    left: 50,
    fontSize: 18
  }
});

module.exports = Level1;
