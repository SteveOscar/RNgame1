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

let basicWidth = Dimensions.get('window').width / 2

class BasicCircle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      txt: '',
      pressed: false,
      innerCircle: {
        height: 20,
        width: 20,
        borderRadius: 10
      },
      targetCircle: {
        height: basicWidth,
        width: basicWidth,
        borderRadius: basicWidth/2,
        borderColor: 'blue'
      }
    };
  }

  handlePressOut() {
    const result = (basicWidth - this.state.innerCircle.width < 10) && (basicWidth - this.state.innerCircle.width > -5)
    let message = result ? 'success' : ''
    this.setState({ pressed: false, txt: message })
    if(result) {
      this.borderOut()
    }else {
      let callback = console.log('DONE');
      let animated = LayoutAnimation.Presets.easeInEaseOut
      animated.duration = 300
      LayoutAnimation.configureNext(animated, callback);
      this.setState({
        innerCircle: {
          height: 20,
          width: 20,
          borderRadius: 10
        },
      })
    }
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
        borderColor: 'green'
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
        borderColor: 'green'
      }
    })
    this.props.updateScore(1)
  }

  handlePressIn() {
    this.setState({ pressed: true }, this.growCircle.bind(this))
  }

  growCircle() {
    let height = this.state.innerCircle.height
    let width = this.state.innerCircle.width
    let borderRadius = this.state.innerCircle.borderRadius
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 10
    let callback = this.growMore.bind(this);
    LayoutAnimation.configureNext(animated, callback);
    if(this.state.pressed) {
      this.setState({
        innerCircle: {
          height: height + 5,
          width: width + 5,
          borderRadius: borderRadius + 2.5
        },
      })
    }
  }

  shrinkCircle() {
    let height = this.state.innerCircle.height
    let width = this.state.innerCircle.width
    let borderRadius = this.state.innerCircle.borderRadius
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 15
    let callback = this.shrinkMore.bind(this);
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      innerCircle: {
        height: height - 10,
        width: width - 10,
        borderRadius: borderRadius - 5
      },
    })
  }

  growMore() {
    if(this.state.pressed) { this.handlePressIn() }
  }

  shrinkMore() {
    if(this.state.innerCircle.width > 20) { this.shrinkCircle() }
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
              <View style={innerCircle}>

              </View>
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
    backgroundColor: 'black',
    margin: 20
  },
  viewText: {
    color: 'black'
  },
  target1: {
    borderWidth: 5,
    backgroundColor: 'transparent'
  }
});

module.exports = BasicCircle;
