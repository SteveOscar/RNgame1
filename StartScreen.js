
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated
} from 'react-native';

class StartScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filler: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} onPress={this.props.startGame}>Press To Start</Text>
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
  text: {
    color: 'white'
  }
});

module.exports = StartScreen;
