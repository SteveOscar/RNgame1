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
      viewStyle: {
        height: 20,
        width: 20,
        borderRadius: 10
      }
    };
  }

  handlePressOut() {
    console.log('unPRESSED')
    this.setState({ pressed: false })
  }

  handlePressIn() {
    this.setState({ pressed: true }, this.updateAnimation.bind(this))
  }

  updateAnimation() {
    let height = this.state.viewStyle.height
    let width = this.state.viewStyle.width
    let borderRadius = this.state.viewStyle.borderRadius
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 15
    let callback = this.growMore.bind(this);
    console.log('pressed? ' + this.state.pressed);
    LayoutAnimation.configureNext(animated, callback);
    if(this.state.pressed) {
      this.setState({
        viewStyle: {
          height: height + 5,
          width: width + 5,
          borderRadius: borderRadius + 2.5
        }
      })
    }
  }

  growMore() {
    console.log(this.state.pressed + '  state check')
    if(this.state.pressed) { this.handlePressIn() }
  }

  render() {
    let viewStyle = [styles.view1, this.state.viewStyle]
    return (
      <View style={styles.container}>



        <View style={styles.target1} >
          <Animated.View style={styles.container}>
            <TouchableWithoutFeedback
              onPressIn={this.handlePressIn.bind(this)}
              onPressOut={this.handlePressOut.bind(this)}>
              <View style={viewStyle}>
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
    backgroundColor: 'transparent',
    width: 100,
    height: 100,
    borderRadius: 50
  }
});

AppRegistry.registerComponent('game1', () => game1);
