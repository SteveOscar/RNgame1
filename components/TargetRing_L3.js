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

class TargetRing_L3 extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.hitDetected != this.state.previousHitDetected) {
      this.setState({ previousHitDetected: nextProps.hitDetected }, this.borderOut())
    }
  }


  render() {

    return (
      console.log('hi')
    );
  }
}

const styles = StyleSheet.create({

});

module.exports = TargetRing_L3;
