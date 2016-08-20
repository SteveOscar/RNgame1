import React, { Component } from 'react';
let TargetRing = require('./components/TargetRing')
let TargetRing2 = require('./components/TargetRing2')
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


class Level2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layer: 1,
      pressed: false,
      txt: 'Level 2',
      shrinkPupil: false,
      directHit: false
    };
  }

  handlePressIn() {
    this.setState({ txt: '', pressed: true })
  }

  handlePressOut() {
    if(this.state.layer === 2) { return }
    this.setState({ pressed: false })
  }

  receiveResult(result) {
    const previousLayer = this.state.layer
    let message = result ? 'Success' : 'Failure'
    if(result) {
      this.setState({ txt: 'Success', directHit: true, layer: previousLayer + 1 })
    }else {
      this.setState({ txt: 'Missed', layer: 1 })
      this.props.updateScore(-1)
    }
  }

  targetDone() {
    this.setState({ shrinkPupil: true, directHit: false })
  }

  successFinished() {
    const score = this.layer === 1 ? 1 : -1
    this.props.updateScore(score)
    this.setState({ shrinkPupil: false })
    if(score < 0) { this.setState({ txt: 'Missed', layer: 1 }) }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.holdOpen}>

          <Text style={styles.boardText}>{this.state.txt || '...'}</Text>
          <TargetRing hitDetected={this.state.directHit}
                      targetDone={this.targetDone.bind(this)}/>

        </View>

        <View style={styles.paddingLayer}>
          <Pupil pressed={this.state.pressed}
                 sendResult={this.receiveResult.bind(this)}
                 shrinking={this.state.shrinkPupil}
                 layer={this.state.layer}
                 successFinished={this.successFinished.bind(this)}/>
        </View>

        <View style={styles.paddingLayer}>
          <TargetRing2/>
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
    zIndex: 0
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

module.exports = Level2;
