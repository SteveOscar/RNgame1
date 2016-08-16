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
      shrinkPupil: false,
      ringOpened: false,
      targetRing: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: 'blue',
        borderWidth: 5,
      },
    };
  }

  componentWillReceiveProps() {
    if(this.props.expandRing) { this.expandRing() }
    if(this.props.directHit) { this.directHit() }
  }

  componentDidMount() {
    setTimeout(() => {
      this.openRing()
    }, 1000);
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

  expandRing() {
    this.setState({
      ringOpened: true,
      targetRing: {
        height: basicWidth,
        width: basicWidth,
        borderRadius: basicWidth/2,
        borderColor: 'blue',
        borderWidth: 5,
      }
    })
  }

  resetTarget() {
    this.setState({
            targetRing: {
              height: basicWidth,
              width: basicWidth,
              borderRadius: basicWidth/2,
              borderColor: 'blue',
              borderWidth: 5,
            }
          });
  }

  directHit() {
    this.borderOut()
  }

  resetState() {
    this.setState({ shrinking: false })
  }

  borderOut() {
    let callback = this.borderIn.bind(this);
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 300
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      targetRing: {
        height: basicWidth + 20,
        width: basicWidth + 20,
        borderRadius: (basicWidth + 20) / 2,
        borderColor: 'white',
        borderWidth: 25,
      },
    })
  }

  borderIn() {
    let callback = this.setState({ shrinkPupil: true })
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 100
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      targetRing: {
        height: basicWidth,
        width: basicWidth,
        borderRadius: basicWidth/2,
        borderColor: 'blue',
        borderWidth: 5,
      }
    })
    this.props.updateScore(1)
    // this.props.updateBoardLevel(1)
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
    backgroundColor: 'transparent'
  },
});

module.exports = TargetRing;
