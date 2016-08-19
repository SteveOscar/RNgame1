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

class TargetRing2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ringOpened: false,
      hitTracking: false,
      targetRing: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderColor: 'orange',
        borderWidth: 5,
      },
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.hitDetected != this.state.hitTracking) {
  //     console.log('Hit DETECTED, UGH')
  //     this.setState({ hitTracking: nextProps.hitDetected }, this.borderOut())
  //   }
  // }

  componentDidMount() {
    // setTimeout(() => {
    //   this.openRing()
    // }, 1000);
  }

  openRing() {
    let callback = this.props.targetOpen;
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 300
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
    }, this.props.updateScore(1))
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
