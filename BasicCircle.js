import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker,
  TouchableHighlight,
  LayoutAnimation,
  TouchableWithoutFeedback,
  Animated,
  Dimensions
} from 'react-native';

let basicWidth = Dimensions.get('window').width * .75

class BasicCircle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      txt: '',
      pressed: false,
      cleanSlate: true,
      tagetOpened: false,
      innerCircle: {
        height: 0,
        width: 0,
        borderRadius: 0
      },
      targetCircle: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: 'blue',
        borderWidth: 5,
      }
    };
  }

  componentDidMount() {
    this.pulse()
  }

  pulse() {
    let callback = this.continuePulse.bind(this);
    let animated = LayoutAnimation.Presets.spring
    let size = this.state.innerCircle.width
    let newWidth = size > 40 ? 40 : 46
    if(!this.state.targetOpened) { newWidth = 0 }
    animated.duration = Math.floor(Math.random() * 1000) + 400
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      innerCircle: {
        height: newWidth,
        width: newWidth,
        borderRadius: size > 40 ? 20 : 23
      },
    })
  }

  continuePulse() {
    if(!this.state.targetOpened) {
      this.setState({
        targetOpened: true,
        targetCircle: {
          height: basicWidth,
          width: basicWidth,
          borderRadius: basicWidth/2,
          borderColor: 'blue',
          borderWidth: 5,
        }
      })
    }
    if(this.state.cleanSlate) { this.pulse() }
  }

  handlePressOut() {
    const result = (basicWidth - this.state.innerCircle.width < 10) && (basicWidth - this.state.innerCircle.width > -5)
    let message = result ? 'success' : ''
    this.setState({ pressed: false, txt: message })
    if(result) {
      this.borderOut()
    }else {
      let callback = this.resetTarget.bind(this)
      let animated = LayoutAnimation.Presets.easeInEaseOut
      animated.duration = 300
      LayoutAnimation.configureNext(animated, callback);
      this.setState({
        txt: 'failiure',
        innerCircle: {
          height: 40,
          width: 40,
          borderRadius: 20
        },
        targetCircle: {
          height: basicWidth,
          width: basicWidth,
          borderRadius: basicWidth/2,
          borderColor: 'red',
          borderWidth: 5,
        }
      })
    }
  }

  resetTarget() {
    this.setState({
            targetCircle: {
              height: basicWidth,
              width: basicWidth,
              borderRadius: basicWidth/2,
              borderColor: 'blue',
              borderWidth: 5,
            }
          });
  }

  borderOut() {
    let callback = this.borderIn.bind(this);
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 300
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      targetCircle: {
        height: basicWidth + 20,
        width: basicWidth + 20,
        borderRadius: (basicWidth + 20) / 2,
        borderColor: 'white',
        borderWidth: 25,
      },
    })
  }

  borderIn() {
    let callback = this.shrinkCircle.bind(this)
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 100
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      targetCircle: {
        height: basicWidth,
        width: basicWidth,
        borderRadius: basicWidth/2,
        borderColor: 'blue',
        borderWidth: 5,
      }
    })
    this.props.updateScore(1)
  }

  handlePressIn() {
    this.setState({ pressed: true, cleanSlate: false, txt: '' }, this.growCircle.bind(this))
  }

  growCircle() {
    let size = this.state.innerCircle.height
    let borderRadius = this.state.innerCircle.borderRadius
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 10
    let callback = this.growMore.bind(this);
    LayoutAnimation.configureNext(animated, callback);
    if(this.state.pressed) {
      this.setState({
        innerCircle: {
          height: size + 5,
          width: size + 5,
          borderRadius: borderRadius + 2.5
        },
      })
    }
  }

  shrinkCircle() {
    let size = this.state.innerCircle.height
    let borderRadius = this.state.innerCircle.borderRadius
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 15
    let callback = this.shrinkMore.bind(this);
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      innerCircle: {
        height: size - 20,
        width: size - 20,
        borderRadius: borderRadius - 10
      }
    })
  }

  growMore() {
    if(this.state.pressed) { this.handlePressIn() }
  }

  shrinkMore() {
    if(this.state.innerCircle.width > 40) {
      this.shrinkCircle()
    }else {
      this.setState({
        cleanSlate: true,
        innerCircle: {
          height: 40,
          width: 40,
          borderRadius: 20
        }
      })
      this.pulse()
    }
  }

  render() {
    let innerCircle = [styles.view1, this.state.innerCircle]
    let targetCircle = [styles.target1, this.state.targetCircle]
    return (
      <View style={styles.container}>
        <Text style={styles.viewText}>{this.state.txt}</Text>

        <View style={targetCircle} >
          <Animated.View style={styles.container}>
            <TouchableWithoutFeedback
              onPressIn={this.handlePressIn.bind(this)}
              onPressOut={this.handlePressOut.bind(this)}>
              <View style={innerCircle}></View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>

      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  targetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  view1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    margin: 20
  },
  viewText: {
    color: 'yellow'
  },
  target1: {
    backgroundColor: 'transparent'
  }
});

module.exports = BasicCircle;
