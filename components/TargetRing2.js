let Pupil = require('./Pupil')
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Dimensions
} from 'react-native';

let screenHeight = Dimensions.get('window').height
let basicWidth = Dimensions.get('window').width * .3

const DIAMETER = 50

class TargetRing2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      previousHitDetected: false,
      targetRing: {
        height: 70,
        width: 70,
        borderRadius: 35,
        borderColor: 'white',
        borderWidth: 5,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.hitDetected && nextProps.hitDetected != this.state.previousHitDetected) {
      console.log('Target2 Hit DETECTED, UGH')
      this.setState({ previousHitDetected: nextProps.hitDetected }, this.borderOut())
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.openRing()
    }, 1200);
  }

  openRing() {
    let callback = this.props.targetOpen;
    let animated = LayoutAnimation.Presets.spring
    animated.duration = 500
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      targetRing: {
        height: basicWidth,
        width: basicWidth,
        borderRadius: basicWidth / 2,
        borderColor: 'orange',
        borderWidth: 5
      },
    })
  }

  borderOut() {
    let callback = this.borderIn.bind(this);
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 300
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      targetRing: {
        height: basicWidth + 40,
        width: basicWidth + 40,
        borderRadius: (basicWidth + 40) / 2,
        borderColor: 'white',
        borderWidth: 25,
      },
    })
  }

  borderIn() {
    let callback = this.setState({ previousHitDetected: false }, this.props.targetDone())
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 300
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      targetRing: {
        height: basicWidth,
        width: basicWidth,
        borderRadius: basicWidth/2,
        borderColor: 'orange',
        borderWidth: 5,
      }
    })
  }

  render() {
    let targetRing = [styles.target, this.state.targetRing]
    return (
      <Animated.View>
        <TouchableWithoutFeedback>
          <View style={targetRing}>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  target: {
    flex: 1,
    backgroundColor: 'transparent',
    zIndex: 100
  },
});

module.exports = TargetRing2;
