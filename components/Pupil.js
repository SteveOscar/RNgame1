
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
const basicWidth = Dimensions.get('window').width * .75

const DIAMETER = 50

class Pupil extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      cleanSlate: true,
      pupil: {
        height: 0,
        width: 0,
        borderRadius: 0
      },
    };
  }

  componentWillReceiveProps() {
    if(this.props.shrinking) { this.shrinkCircle() }
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
    this.setState({ pressed: true, cleanSlate: false }, this.growCircle.bind(this))
    this.props.handlePressIn()
  }

  handlePressOut() {
    const result = (basicWidth - this.state.pupil.width < 10) && (basicWidth - this.state.pupil.width > -5)
    this.setState({ pressed: false })
    this.props.handlePressOut(result)
    if(!result) {
      let callback = console.log('Missed')
      let animated = LayoutAnimation.Presets.easeInEaseOut
      animated.duration = 300
      LayoutAnimation.configureNext(animated, callback);
      this.setState({
        pupil: {
          height: DIAMETER,
          width: DIAMETER,
          borderRadius: 25
        },
      })
    }
  }

  growCircle() {
    let size = this.state.pupil.height
    let borderRadius = this.state.pupil.borderRadius
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 10
    let callback = this.growMore.bind(this);
    LayoutAnimation.configureNext(animated, callback);
    if(this.state.pressed) {
      this.setState({
        pupil: {
          height: size + 5,
          width: size + 5,
          borderRadius: borderRadius + 2.5
        },
      })
    }
  }

  growMore() {
    this.setState({ cleanSlate: false })
    if(this.state.pressed) { this.growCircle() }
  }

  shrinkCircle() {
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
      if(this.state.layer === 2 && this.state.txt === 'success') {
        this.setState({ newRoundState },this.props.updateCompLevel(1))
      }else {
        this.setState({
          pressed: false,
          cleanSlate: true,
          pupil: {
            height: DIAMETER,
            width: DIAMETER,
            borderRadius: 25
          },
        })
        // TODO: implemnt counter to only run pulse if level isnt beat
        this.pulse()
        console.log('Should pulse')
      }
    }
  }


  render() {
    let pupil = [styles.pupilStyle, this.state.pupil]
    return (
      <Animated.View style={styles.pupilContainer}>
        <TouchableWithoutFeedback
          onPressIn={this.handlePressIn.bind(this)}
          onPressOut={this.handlePressOut.bind(this)}>
          <View style={pupil}></View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  pupilStyle: {
    backgroundColor: 'red',
    margin: 25,
  },
  pupilContainer: {
  }
});

module.exports = Pupil;
