
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

const DIAMETER = 50

class Pupil2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      previousPressState: this.props.pressed,
      previousHitState: this.props.hit,
      previousMissState: this.props.miss,
      cleanSlate: true,
      pupil: {
        height: 0,
        width: 0,
        borderRadius: 0
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    // PressIn, grow or target check coming down
    if(nextProps.pressed) {
      if(nextProps.pressed != this.state.previousPressState) {
        console.log('PRESSED')
        this.setState({ previousPressState: nextProps.pressed })
        this.handlePressIn()
      }
    }
    // PressOut, send size
    if(nextProps.pressed == false) {
      if(nextProps.pressed != this.state.previousPressState) {
        console.log('layer in pupil: ', this.props.layer)
        if(this.props.layer > 1) { return }
        console.log('RELEASED')
        this.setState({ previousPressState: nextProps.pressed })
        // blocks against press out on second target
        if(!this.props.shrinking) { this.props.sendStatus(this.state.pupil.width) }
      }
    }

    if(nextProps.shrinking) {
      // if(this.props.layer === 1) { this.shrinkCircle() }
      // if(this.props.layer === 2) { this.shrinkCircleSlow() }
      this.shrinkCircleSlow()
    }

    if(nextProps.miss == true) {
      if(nextProps.miss != this.state.previousMissState) {
        this.setState({ previousMissState: nextProps.miss })
        this.resetPupilOnMiss()
      }
    }

    // if(nextProps.hit == true) {
    //   if(nextProps.hit != this.state.previousHitState) {
    //     console.log('HIT registered')
    //     // this.setState({ previousHitState: nextProps.hit })
    //     // this.resetPupilOnMiss()
    //   }
    // }
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
    this.setState({ cleanSlate: false })
    if(this.props.shrinking) {
      this.props.sendStatus(this.state.pupil.width)
    }else { this.growCircle() }
  }

  pupilFinished() {
    this.setState({ previousMissState: false })
    this.props.pupilFinished()
  }

  resetPupilOnMiss() {
    let animated = LayoutAnimation.Presets.easeInEaseOut
    animated.duration = 300
    LayoutAnimation.configureNext(animated, this.pupilFinished());
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
    animated.duration = 15
    let callback = this.growMore.bind(this);
    LayoutAnimation.configureNext(animated, callback);
    console.log('hit growCircle()')
    this.setState({
      pupil: {
        height: size + 5,
        width: size + 5,
        borderRadius: borderRadius + 2.5
      },
    })
  }

  growMore() {
    if(this.props.pressed) { this.growCircle() }
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
