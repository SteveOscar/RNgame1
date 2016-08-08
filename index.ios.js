let StartScreen = require('./StartScreen')
let BasicCircle = require('./BasicCircle')
let LayeredCircle = require('./LayeredCircle')
let BasicSquare = require('./BasicSquare')

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
      level: 1,
      gameStarted: false
    };
  }

  startGame() {
    this.setState({ gameStarted: true })
  }

  updateScore(points) {
    currentScore = this.state.score
    this.setState({ score: currentScore + points })
  }

  render() {
    let component = this.state.gameStarted ? <BasicCircle updateScore={this.updateScore.bind(this)}/> : <StartScreen startGame={this.startGame.bind(this)}/>
    let score = this.state.score
    return (
      <View style={styles.container}>
        {/*{component}*/}
        <LayeredCircle updateScore={this.updateScore.bind(this)}/>
        <Text style={styles.text}>Score: {score}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  text: {
    color: 'red'
  }
});

AppRegistry.registerComponent('game1', () => game1);
