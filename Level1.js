import React, { Component } from 'react';
let TargetRing = require('./components/TargetRing')
let Pupil = require('./components/Pupil')

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


class Level1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      txt: 'Level 1',
      shrinkPupil: false,
      directHit: false
    };
  }

  handlePressIn() {
    console.log('pressed')
    this.setState({ txt: '', pressed: true })
  }

  handlePressOut() {
    this.setState({ txt: '', pressed: false })
    // let message = result ? 'Success' : 'Failure'
    // if(result){
    //   this.setState({ directHit: !this.state.directHit, txt: message })
    // } else {
    //   this.setState({ txt: message })
    // }
  }

  updateScore(points) {
    this.props.updateScore(points)
    this.setState({ shrinkPupil: true })
  }

  successFinished() {
    this.setState({ shrinkPupil: false })
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.paddingLayer}>
          <Pupil pressed={this.state.pressed}
                 handlePressOut={this.handlePressOut.bind(this)}
                 shrinking={this.state.shrinkPupil}
                 successFinished={this.successFinished.bind(this)}/>
        </View>

        <View style={styles.holdOpen}>
          <Text style={styles.boardText}>{this.state.txt || '...'}</Text>
          <TargetRing hitDetected={this.state.directHit}
                      updateScore={this.updateScore.bind(this)}/>
        </View>

        <TouchableWithoutFeedback
          onPressIn={this.handlePressIn.bind(this)}
          onPressOut={this.handlePressOut.bind(this)}>
          <View style={styles.userButton}></View>
        </TouchableWithoutFeedback>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight,
    width: screenWidth,
  },
  holdOpen: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddingLayer: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    position: 'absolute',
    zIndex: 5

  },
  boardText: {
    color: 'white',
    position: 'absolute',
    top: screenHeight*.2,
    left: 50,
    fontSize: 18
  },
  userButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 40,
    left: 40,
    zIndex: 5000
  }
});

module.exports = Level1;
