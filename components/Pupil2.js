
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

class Pupil2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      previousPressState: this.props.pressed,
      cleanSlate: true,
      handlingPressOut: false,
      handlingPressIn: false,
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
      if(nextProps.pressed != this.state.previousPressState) {
        console.log('press change state detected: PRESSED')
        this.setState({ previousPressState: nextProps.pressed })
      }
      // console.log('still handling press in?: ', this.state.handlingPressIn)
      if(this.state.handlingPressIn) { return }
      // console.log('pupil trying to handle Press')
      this.setState({ handlingPressOut: false, handlingPressIn: true}, this.handlePressIn())
    }
    // target check coming down
    if(nextProps.pressed == false) {
      if(nextProps.pressed != this.state.previousPressState) {
        console.log('press change state detected: RELEASED')
        this.setState({ previousPressState: nextProps.pressed })
      }
      this.setState({ handlingPressOut: true, handlingPressIn: false })
      if(this.props.layer > 2) { return }
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
    console.log('Pupil2 Layer: ', this.props.layer)
    this.setState({ cleanSlate: false })
    if(this.props.layer === 1) { this.growCircle() }
    if(this.props.layer === 2) { this.checkTarget2() }
  }

  checkTarget2() {
    console.log('Checking Layer 2 in pupil')
    const result = (target2Width - this.state.pupil.width < 10) && (target2Width - this.state.pupil.width > -5)
    if(!result) { this.resetPupilOnMiss() }
    this.props.sendResult(result)
    this.props.successFinished(1)
  }

  checkTarget1() {
    if(this.state.handlingPressOut) { return }
    const result = (target1Width - this.state.pupil.width < 10) && (target1Width - this.state.pupil.width > -5)
    if(!result) { this.resetPupilOnMiss() }
    this.props.sendResult(result)
  }

  resetPupilOnMiss() {

    let animated = LayoutAnimation.Presets.easeInEaseOut
    animated.duration = 300
    LayoutAnimation.configureNext(animated);
    this.setState({
      handlingPressIn: false,
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
    animated.duration = 15
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
        handlingPressIn: false,
        cleanSlate: true,
        pupil: {
          height: DIAMETER,
          width: DIAMETER,
          borderRadius: 25
        },
      })
      // this.props.successFinished(-1)
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

module.exports = Pupil2;
