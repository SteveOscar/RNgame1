import React, { Component } from 'react';
let TargetRing = require('./components/TargetRing')
let Pupil = require('./components/Pupil')

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


class Level1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      txt: 'Level 1',
      shrinkPupil: false,
      directHit: false
    };
  }

  handlePressIn() {
    this.setState({ txt: '', pressed: true })
  }

  handlePressOut() {
    this.setState({ pressed: false })
  }

  receiveResult(result) {
    let message = result ? 'Success' : 'Failure'
    if(result) {
      this.setState({ txt: 'Success', directHit: true })
    }else {
      this.setState({ txt: 'Missed' })
      this.props.updateScore(-1)
    }
  }

  targetDone() {
    this.setState({ shrinkPupil: true, directHit: false })
  }

  successFinished() {
    this.props.updateScore(1)
    this.setState({ shrinkPupil: false })
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.paddingLayer}>
          <Pupil pressed={this.state.pressed}
                 sendResult={this.receiveResult.bind(this)}
                 shrinking={this.state.shrinkPupil}
                 successFinished={this.successFinished.bind(this)}/>
        </View>

        <View style={styles.holdOpen}>
          <Text style={styles.boardText}>{this.state.txt || '...'}</Text>
          <TargetRing hitDetected={this.state.directHit}
                      targetDone={this.targetDone.bind(this)}/>
        </View>

        <TouchableWithoutFeedback
          onPressIn={this.handlePressIn.bind(this)}
          onPressOut={this.handlePressOut.bind(this)}>
          <View style={styles.theButton}></View>
        </TouchableWithoutFeedback>

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
  boardText: {
    color: 'white',
    position: 'absolute',
    top: screenHeight*.2,
    left: 50,
    fontSize: 18
  },
  theButton: {
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 50,
    left: 50,
    zIndex: 1000
  }
});

module.exports = Level1;
