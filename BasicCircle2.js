import React, { Component } from 'react';
let TargetRing = require('./components/TargetRing')
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

let basicWidth = Dimensions.get('window').width * .75

class BasicCircle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      txt: 'Welcome',
      pressed: false,
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
      <View style={styles.boardTextBox}>
        <Text style={styles.viewText}>{this.state.txt || '...'}</Text>
      </View>
        <View style={styles.container}>
          <TargetRing handlePressIn={this.handlePressIn.bind(this)}
                      handlePressOut={this.handlePressOut.bind(this)}
                      updateScore={this.updateScore.bind(this)}>
          </TargetRing>
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
  viewText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 15
  },
  boardTextBox: {

  }
});

module.exports = BasicCircle;
