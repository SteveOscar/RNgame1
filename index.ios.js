let BasicCircle = require('./BasicCircle')

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated
} from 'react-native';

class game1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      score: 0,
    };
  }

  updateScore(points) {
    currentScore = this.state.score
    this.setState({ score: currentScore + points })
  }

  render() {
    let score = this.state.score
    return (
      <View style={styles.container}>
        <BasicCircle updateScore={this.updateScore.bind(this)}/>
        <Text>Score: {score}</Text>
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
});

AppRegistry.registerComponent('game1', () => game1);
