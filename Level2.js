import React, { Component } from 'react';
let TargetRing = require('./components/TargetRing')
let TargetRing2 = require('./components/TargetRing2')
let Pupil2 = require('./components/Pupil2')

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
const target1Width = Dimensions.get('window').width * .75
let target2Width = Dimensions.get('window').width * .3


class Level2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layer: 1,
      hit: true,
      miss: false,
      pressed: false,
      txt: 'Level 2',
      shrinkPupil: false,
      directHit1: false,
      directHit2: false
    };
  }

  handlePressIn() {
    this.setState({ txt: '', pressed: true })
    if(this.state.layer > 2) { this.setState({ shrinkPupil: false }) }
  }

  handlePressOut() {
    this.setState({ pressed: false })
  }

  receiveStatus(pupilSize) {
    let result
    if(this.state.layer === 1) {
      result = (target1Width - pupilSize < 10) && (target1Width - pupilSize > -5)
    }else {
      result = (target2Width - pupilSize < 10) && (target2Width - pupilSize > -5)
    }
    if(result) { this.handleSuccess() }
    if(!result) { this.handleFailure() }
  }

  handleFailure() {
    this.setState({ hit: false, miss: true, txt: 'Failure', layer: 1 })
    this.props.updateScore(-1)
  }

  receivePupilFinished() {
    this.setState({ hit: true, miss: false })
  }

  handleSuccess() {
    const previousLayer = this.state.layer
    if(previousLayer == 1) { this.setState({ hit: true, directHit1: true, layer: previousLayer + 1 }) }
    if(previousLayer == 2) {
      debugger
      this.setState({ hit: true, txt: 'Success', directHit2: true, layer: previousLayer + 1 })
      this.props.updateScore(1)
    }
  }

  targetDone() {
    this.setState({ shrinkPupil: true, directHit1: false, directHit2: false })
  }

  // successFinished(result) {
  //   this.setState({ shrinkPupil: false })
  //   if( !result ) { this.setState({ txt: 'Missed', layer: 1 }) }
  // }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.holdOpen}>

          <Text style={styles.boardText}>{this.state.txt || '...'}</Text>
          <TargetRing hitDetected={this.state.directHit1}
                      targetDone={this.targetDone.bind(this)}/>

        </View>

        <View style={styles.paddingLayer}>
          <Pupil2 pressed={this.state.pressed}
                 shrinking={this.state.shrinkPupil}
                 hit={this.state.hit}
                 miss={this.state.miss}
                 layer={this.state.layer}
                 sendStatus={this.receiveStatus.bind(this)}
                 pupilFinished={this.receivePupilFinished.bind(this)}/>
        </View>

        <View style={styles.paddingLayer}>
          <TargetRing2 hitDetected={this.state.directHit2}
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
