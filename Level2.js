import React, { Component } from 'react';
let TargetRing = require('./components/TargetRing')
let TargetRing2 = require('./components/TargetRing2')
let Pupil = require('./components/Pupil')

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


class Level1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      txt: 'Level 2',
      shrinkPupil: false,
      directHit: false
    };
  }

  handlePressIn() {
    this.setState({ txt: '' })
  }

  handlePressOut(result) {
    let message = result ? 'Success' : 'Failure'
    if(result){
      this.setState({ directHit: !this.state.directHit, txt: message })
    } else {
      this.setState({ txt: message })
    }
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

        <View style={styles.holdOpen}>

          <Text style={styles.boardText}>{this.state.txt || '...'}</Text>
          <TargetRing hitDetected={this.state.directHit}
                      updateScore={this.updateScore.bind(this)}/>

                      <View style={styles.paddingLayer}>
                        <TargetRing2/>
                      </View>            

        </View>

        <View style={styles.paddingLayerPupil}>

          <Pupil handlePressIn={this.handlePressIn.bind(this)}
                 handlePressOut={this.handlePressOut.bind(this)}
                 shrinking={this.state.shrinkPupil}
                 successFinished={this.successFinished.bind(this)}/>

        </View>

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
    zIndex: 0
  },
  paddingLayerPupil: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    position: 'absolute',
    zIndex: 10
  },
  boardText: {
    color: 'white',
    position: 'absolute',
    top: screenHeight*.2,
    left: 50,
    fontSize: 18
  }
});

module.exports = Level1;
