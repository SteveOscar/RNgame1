
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
      previousPressState: false,
      previousMissState: false,
      previousShrinkingState: false,
      previousSuccessState: false,
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
        console.log('PRESSED, layer: ', this.props.layer)
        this.setState({ previousPressState: nextProps.pressed, cleanSlate: false }, this.handlePressIn())
      }
    }
    // PressOut, send size
    if(!nextProps.pressed) {
      if(nextProps.pressed != this.state.previousPressState) {
        this.setState({ previousPressState: nextProps.pressed })
        console.log('RELEASED, layer: ', this.props.layer)
        if(this.props.layer > 1 || this.state.cleanSlate) { return }
        // blocks against press out on second target
        if(!this.props.shrinking) { this.props.sendStatus(this.state.pupil.width) }
      }
    }

    if(nextProps.shrinking) {
      if(nextProps.shrinking != this.state.previousShrinkingState) {
        this.setState({ previousShrinkingState: nextProps.shrinking })
        console.log('HIT nextProps SHRINKING')
        this.shrinkCircle()
      }
    }

    // maybe delete this?
    if(nextProps.handlingSuccess) {
      if(nextProps.handlingSuccess != this.state.previousSuccessState) {
        this.setState({ previousShrinkingState: nextProps.shrinking })
        console.log('SUCCESS DETECTED')
        this.resetSelf()
      }
    }

    if(nextProps.miss == true) {
      if(nextProps.miss != this.state.previousMissState) {
        this.setState({ previousMissState: nextProps.miss })
        console.log('MISS DETECTED')
        this.resetSelf()
      }
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
    console.log('Should pulse, cleanSlate: ', this.state.cleanSlate)
    if(this.state.cleanSlate) { this.pulse() }
  }

  handlePressIn() {
    if(this.props.shrinking && this.props.layer > 1) {
      this.props.sendStatus(this.state.pupil.width)
    }else { this.growCircle() }
  }

  pupilFinished() {
    this.props.pupilFinished()
    this.pulse()
  }

  resetSelf() {
    let animated = LayoutAnimation.Presets.easeInEaseOut
    animated.duration = 300
    LayoutAnimation.configureNext(animated, this.pupilFinished());
    this.setState({
      previousMissState: false,
      previousShrinkingState: false,
      cleanSlate: true,
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

  shrinkMore() {
    if(this.state.pupil.width > 40 && this.props.shrinking) {
      this.shrinkCircle()
    }else {
      // figure this shit out
      if(this.props.layer == 2){
        this.props.sendStatus(this.state.pupil.width)
      }
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
