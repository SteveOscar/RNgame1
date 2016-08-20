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
let basicWidth = Dimensions.get('window').width * .75

const DIAMETER = 50

class TargetRing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ringOpened: false,
      hitTracking: false,
      targetRing: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 5,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.hitDetected != this.state.hitTracking) {
      this.setState({ hitTracking: nextProps.hitDetected }, this.borderOut())
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.openRing()
    }, 1000);
  }

  openRing() {
    let callback = this.props.targetOpen;
    let animated = LayoutAnimation.Presets.easeInEaseOut
    animated.duration = 400
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      targetRing: {
        height: basicWidth,
        width: basicWidth,
        borderRadius: basicWidth / 2,
        borderColor: 'blue',
        borderWidth: 5
      },
    })
  }

  borderOut() {
    let callback = this.borderIn.bind(this);
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 500
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
    let callback = this.setState({ handlingHit: false })
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 300
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      targetRing: {
        height: basicWidth,
        width: basicWidth,
        borderRadius: basicWidth/2,
        borderColor: 'blue',
        borderWidth: 5,
      }
    }, this.props.targetDone())
  }

  render() {
    let targetRing = [styles.target1, this.state.targetRing]
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
  target1: {
    flex: 1,
    backgroundColor: 'transparent',
    zIndex: 0
  },
});

module.exports = TargetRing;
