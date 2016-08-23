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
      miss: false,
      pressed: false,
      txt: 'Level 2',
      handlingSuccess: false,
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
      result = (target1Width - pupilSize < 15) && (target1Width - pupilSize > -15)
    }else {
      result = (target2Width - pupilSize < 15) && (target2Width - pupilSize > -15)
    }
    if(result) { this.handleSuccess() }
    if(!result) { this.handleFailure() }
  }

  handleFailure() {
    console.log('should not trigger on success')
    this.setState({ miss: true, txt: 'Failure', layer: 1, shrinkPupil: false })
    this.props.updateScore(-1)
  }

  receivePupilFinished() {
    console.log('Level received Pupil Finished')
    this.setState({ miss: false, shrinkPupil: false, layer: 1, handlingSuccess: false })
  }

  handleSuccess() {
    const previousLayer = this.state.layer
    if(previousLayer == 1) {
      this.setState({ directHit1: true, layer: 2 })
    }
    if(previousLayer == 2) {
      this.setState({ txt: 'Success', directHit2: true, layer: 3 })
      this.props.updateScore(1)
    }
  }

  targetDone() {
    const check = this.state.layer === 2
    console.log('Target done, layer: ', this.state.layer)
    this.setState({ shrinkPupil: check, directHit1: false, directHit2: false, handlingSuccess: this.state.layer === 3 })
  }

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
                 miss={this.state.miss}
                 layer={this.state.layer}
                 sendStatus={this.receiveStatus.bind(this)}
                 handlingSuccess={this.state.handlingSuccess}
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
