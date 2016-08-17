let StartScreen = require('./StartScreen')
// let BasicCircle = require('./BasicCircle')
let BasicCircle2 = require('./BasicCircle2')
let LayeredCircle = require('./LayeredCircle')
let BasicSquare = require('./BasicSquare')

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
  Dimensions
} from 'react-native';

const screenHeight = Dimensions.get('window').height

class game1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      level: 1,
      boardLevel: 0,
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

  updateBoardLevel(points) {
    currentLevel = this.state.boardLevel
    this.setState({ boardLevel: currentLevel + points })
  }

  checkScore() {
    console.log('Checking Score: ', this.state.score)
    previousLevel = this.state.level
    if(this.state.score === 2) {
      setTimeout(() => {
        this.setState({ level: previousLevel + 1, boardLevel: 0 });
      }, 1000);
    }
  }



  render() {
    let startScreen = <StartScreen startGame={this.startGame.bind(this)}/>
    let currentBoard = this.state.level === 1 ?
                       <BasicCircle2 updateScore={this.updateScore.bind(this)}
                                    updateBoardLevel={this.updateBoardLevel.bind(this)}
                                    boardLevel={this.state.boardLevel}
                                    checkScore={this.checkScore.bind(this)}/> :
                       <LayeredCircle updateScore={this.updateScore.bind(this)}
                                      updateBoardLevel={this.updateBoardLevel.bind(this)}
                                      boardLevel={this.state.boardLevel}
                                      checkScore={this.checkScore.bind(this)}/>

    let gameState = this.state.gameStarted ? currentBoard : startScreen
    let score = this.state.score
    return (
      <View style={styles.container}>
        {gameState}
        <Text style={styles.text}>Total Score: {score}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkgrey'
  },
  text: {
    color: 'red'
  }
});

AppRegistry.registerComponent('game1', () => game1);
