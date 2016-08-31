import React, { Component } from 'react';
let Pupil3 = require('./components/Pupil3')

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
  Dimensions,
  LayoutAnimation,
  TouchableWithoutFeedback
} from 'react-native';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
let BASICWIDTH = Dimensions.get('window').width * .75

class Level1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      handlingHit: false,
      txt: 'Level 3',
      shrinkPupil: false,
      targetRing: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 5,
      }
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.openRing()
      this.pulse()
    }, 1000);
  }

  // TARGET1 ***
  pulse() {
    if(this.state.handlingHit) { return }
    let callback = this.waitForIt.bind(this);
    let animated = LayoutAnimation.Presets.easeInEaseOut
    let size = this.state.targetRing.width
    let newWidth = size > BASICWIDTH ? BASICWIDTH : BASICWIDTH+40
    animated.duration = 100
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      targetRing: {
        height: newWidth,
        width: newWidth,
        borderRadius: size > BASICWIDTH ? BASICWIDTH/2 : (BASICWIDTH+40)/2,
        borderColor: 'blue',
        borderWidth: 10
      },
    })
  }

  waitForIt() {
    setTimeout(() => {
      this.continuePulse()
    }, 1000);
  }

  continuePulse() {
    if(!this.state.handlingHit) {
      this.pulse()
    }
  }

  openRing() {
    let callback = this.props.targetOpen;
    let animated = LayoutAnimation.Presets.easeInEaseOut
    animated.duration = 400
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      targetRing: {
        height: BASICWIDTH,
        width: BASICWIDTH,
        borderRadius: BASICWIDTH / 2,
        borderColor: 'blue',
        borderWidth: 10
      },
    })
  }

  borderOut() {
    let animated = LayoutAnimation.Presets.linear
    let callback = this.borderIn.bind(this)
    animated.duration = 1000
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      targetRing: {
        height: BASICWIDTH + 40,
        width: BASICWIDTH + 40,
        borderRadius: (BASICWIDTH + 40) / 2,
        borderColor: 'white',
        borderWidth: 25,
      },
    })
  }

  borderIn() {
    let callback = this.finishAnimation.bind(this)
    let animated = LayoutAnimation.Presets.spring
    animated.duration = 2000
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      targetRing: {
        height: BASICWIDTH,
        width: BASICWIDTH,
        borderRadius: BASICWIDTH / 2,
        borderColor: 'blue',
        borderWidth: 10
      }
    })
  }

  finishAnimation() {
    this.setState({ shrinkPupil: true, handlingHit: false })
  }
  // TARGET1 ***

  // LEVEL ***
  handlePressIn() {
    if(this.state.handlingHit) { return }
    this.setState({ txt: '', pressed: true })
  }

  handlePressOut() {
    this.setState({ pressed: false })
  }

  receiveResult(pupilWidth) {
    this.setState({ handlingHit: true })
    let measurement = this.state.targetRing.width - pupilWidth
    let result = measurement < 15 && measurement > -5
    let message = result ? 'Success' : 'Failure'
    if(result) {
      this.setState({ txt: 'Success', handlingHit: true }, this.borderOut.bind(this))
      this.props.updateScore(1)
    }else {
      this.setState({ txt: 'Missed', shrinkPupil: true })
      this.props.updateScore(-1)
    }
  }

  receivePupilFinished() {
    this.setState({ miss: false, shrinkPupil: false, handlingHit: false })
  }

  // LEVEL ***

  render() {
    let targetRing = [styles.target1, this.state.targetRing]
    return (
      <View style={styles.container}>

        <View style={styles.paddingLayer}>
          <Pupil3 pressed={this.state.pressed}
                 sendResult={this.receiveResult.bind(this)}
                 shrinking={this.state.shrinkPupil}
                 pupilFinished={this.receivePupilFinished.bind(this)}/>
        </View>

        <View style={styles.holdOpen}>
          <Text style={styles.boardText}>{this.state.txt || '...'}</Text>
          <Animated.View>
            <TouchableWithoutFeedback>
              <View style={targetRing}>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>

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
  },

  // TARGET1
  target1: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

module.exports = Level1;
