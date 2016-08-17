import React, { Component } from 'react';
let TargetRing = require('./components/TargetRing')
let Pupil = require('./components/Pupil')
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

const basicWidth = Dimensions.get('window').width * .75
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


class BasicCircle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      txt: 'Welcome',
      pressed: false,
      shrinkPupil: false,
      directHit: false
    };
  }

  componentWillReceiveProps() {
    this.props.checkScore()
  }

  handlePressIn() {
    this.setState({ txt: '', pressed: true })
  }

  handlePressOut(result) {
    let message = result ? 'Success' : 'Failure'
    if(result){
      this.setState({ directHit: true, pressed: false, txt: message })
    } else {
      this.setState({ pressed: false, txt: message })
    }
  }

  updateScore(points) {
    this.props.updateScore(points)
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.paddingLayer}>
          <Pupil handlePressIn={this.handlePressIn.bind(this)}
                 handlePressOut={this.handlePressOut.bind(this)}
                 shrinking={this.state.shrinkPupil}/>
        </View>

        <View style={styles.holdOpen}>
          <Text style={styles.boardText}>{this.state.txt || '...'}</Text>
          <TargetRing hitDetected={this.state.directHit}
                      updateScore={this.updateScore.bind(this)}/>
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
  targetView: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0
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
  viewText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 15
  },
  pupilView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'red',
  },
  boardText: {
    color: 'white',
    position: 'absolute',
    top: screenHeight*.2,
    left: 50,
    fontSize: 18
  }
});

module.exports = BasicCircle;
