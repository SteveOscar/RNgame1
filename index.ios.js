/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  LayoutAnimation,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';

class game1 extends Component {

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
        height: 100,
        width: 100,
        borderRadius: 50
      }
    };
  }

  handlePressOut() {
    console.log('unPRESSED')
    const result = (100 - this.state.innerCircle.width < 10) && (100 - this.state.innerCircle.width > -5)
    let message = result ? 'success' : ''
    this.setState({ pressed: false, txt: message })
    if(result) {
      this.borderOut()
    }else {
      let callback = console.log('DONE');
      let animated = LayoutAnimation.Presets.spring
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
        height: 120,
        width: 120,
        borderRadius: 60
      },
    })
  }

  borderIn() {
    let animated = LayoutAnimation.Presets.spring
    animated.duration = 500
    LayoutAnimation.configureNext(animated, console.log('done'));
    this.setState({
      targetCircle: {
        height: 100,
        width: 100,
        borderRadius: 50
      },
    })
  }

  handlePressIn() {
    this.setState({ pressed: true }, this.updateAnimation.bind(this))
  }

  updateAnimation() {
    let height = this.state.innerCircle.height
    let width = this.state.innerCircle.width
    let borderRadius = this.state.innerCircle.borderRadius
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 15
    let callback = this.growMore.bind(this);
    console.log('pressed? ' + this.state.pressed);
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

  growMore() {
    console.log(this.state.pressed + '  state check')
    if(this.state.pressed) { this.handlePressIn() }
  }

  render() {
    let innerCircle = [styles.view1, this.state.innerCircle]
    let targetCircle = [styles.target1, this.state.targetCircle]
    return (
      <View style={styles.container}>

        <View style={targetCircle} >

          <Animated.View style={styles.container}>
            <TouchableWithoutFeedback
              onPressIn={this.handlePressIn.bind(this)}
              onPressOut={this.handlePressOut.bind(this)}>
              <View style={innerCircle}>
                <Text style={styles.viewText}>{this.state.txt}</Text>
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
    color: 'white'
  },
  target1: {
    borderColor: 'red',
    borderWidth: 3,
    backgroundColor: 'transparent'
  }
});

AppRegistry.registerComponent('game1', () => game1);
