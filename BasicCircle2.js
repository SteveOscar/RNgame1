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
    this.setState({ pressed: false, txt: message })
  }

  updateScore(points) {
    this.props.updateScore(points)
  }

  render() {
    return (
      <View>

        <View style={styles.targetContainer}>
          <TargetRing expandRing={this.state.expandRing}
                      directHit={this.state.directHit}>
          </TargetRing>
        </View>
        <View style={styles.pupilView}>
          <Pupil handlePressIn={this.handlePressIn.bind(this)}
                 handlePressOut={this.handlePressOut.bind(this)}
                 shrinking={this.state.shrinkPupil}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  targetContainer: {
    position: 'absolute',
    top: 50
  },
  viewText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 15
  },
  pupilView: {
    position: 'absolute',
    top: 50,
  }
});

module.exports = BasicCircle;
