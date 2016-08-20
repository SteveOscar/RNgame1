
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

const screenHeight = Dimensions.get('window').height
const target1Width = Dimensions.get('window').width * .75
let target2Width = Dimensions.get('window').width * .3

const DIAMETER = 50

class Pupil extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cleanSlate: true,
      handlingPressOut: false,
      pupil: {
        height: 0,
        width: 0,
        borderRadius: 0
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    // grow or target check coming down
    if(nextProps.pressed) {
      this.setState({ handlingPressOut: false}, this.handlePressIn())
    }
    // target check coming down
    if(nextProps.pressed == false) {
      this.setState({ handlingPressOut: true })
      this.checkTarget1()
    }
    if(nextProps.shrinking) {
      if(this.props.layer === 1) { this.shrinkCircle() }
      if(this.props.layer === 2) { this.shrinkCircleSlow() }
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.pulse()
    }, 1100);
  }

  pulse() {
    let callback = this.continuePulse.bind(this);
    let animated = LayoutAnimation.Presets.spring
    let size = this.state.pupil.width
    let newWidth = size > DIAMETER ? DIAMETER : 56
    animated.duration = Math.floor(Math.random() * 1000) + 400
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      pupil: {
        height: newWidth,
        width: newWidth,
        borderRadius: size > DIAMETER ? 25 : 25
      },
    })
  }

  continuePulse() {
    if(this.state.cleanSlate) { this.pulse() }
  }

  handlePressIn() {
    console.log('Pupil Layer: ', this.props.layer)
    this.setState({ cleanSlate: false })
    if(this.props.layer === 2) { this.checkTarget2() }
    if(this.props.layer === 1) { this.growCircle() }
  }

  checkTarget2() {
    console.log('Checking Layer 2')
    const result = (target2Width - this.state.pupil.width < 10) && (target2Width - this.state.pupil.width > -5)
    if(!result) { this.resetPupilOnMiss() }
    this.props.sendResult(result)
  }

  checkTarget1() {
    if(this.state.handlingPressOut) { return }
    const result = (target1Width - this.state.pupil.width < 10) && (target1Width - this.state.pupil.width > -5)
    if(!result) { this.resetPupilOnMiss() }
    this.props.sendResult(result)
  }

  resetPupilOnMiss() {
    let callback = console.log('Missed in PressOut Pupil')
    let animated = LayoutAnimation.Presets.easeInEaseOut
    animated.duration = 300
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      pupil: {
        height: DIAMETER,
        width: DIAMETER,
        borderRadius: 25,
      }
    })
  }

  growCircle() {
    let size = this.state.pupil.height
    let borderRadius = this.state.pupil.borderRadius
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 10
    let callback = this.growMore.bind(this);
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      pupil: {
        height: size + 5,
        width: size + 5,
        borderRadius: borderRadius + 2.5
      },
    })
  }

  growMore() {
    if(!this.state.handlingPressOut) { this.growCircle() }
  }

  shrinkCircle() {
    let size = this.state.pupil.height
    let borderRadius = this.state.pupil.borderRadius
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 10
    let callback = this.shrinkMore.bind(this);
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      pupil: {
        height: size - 5,
        width: size - 5,
        borderRadius: borderRadius - 2.5
      }
    })
  }

  shrinkCircleSlow() {
    let size = this.state.pupil.height
    let borderRadius = this.state.pupil.borderRadius
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 15
    let callback = this.shrinkMore.bind(this);
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      pupil: {
        height: size - 20,
        width: size - 20,
        borderRadius: borderRadius - 10
      }
    })
  }

  shrinkMore() {
    if(this.state.pupil.width > 40) {
      this.shrinkCircle()
    }else {
      this.setState({
        cleanSlate: true,
        pupil: {
          height: DIAMETER,
          width: DIAMETER,
          borderRadius: 25
        },
      })
      this.props.successFinished()
      this.pulse()
      console.log('Should pulse')
    }
  }


  render() {
    let pupil = [styles.pupilStyle, this.state.pupil]
    return (
      <Animated.View style={styles.pupilContainer}>
        <View style={pupil}></View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  pupilStyle: {
    backgroundColor: 'red',
    zIndex: 0
  },
});

module.exports = Pupil;
