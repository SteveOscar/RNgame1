import React, { Component } from 'react';
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

let basicWidth = Dimensions.get('window').width * .75

class BasicCircle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      txt: 'Welcome',
      pressed: false,
      ringOpened: false,
      targetCircle: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: 'blue',
        borderWidth: 5,
      }
    };
  }

  componentWillReceiveProps() {
    this.props.checkScore()
  }

  expandRing() {
    this.setState({
      ringOpened: true,
      targetCircle: {
        height: basicWidth,
        width: basicWidth,
        borderRadius: basicWidth/2,
        borderColor: 'blue',
        borderWidth: 5,
      }
    })
  }

  handlePressIn() {
    this.setState({ txt: '', pressed: true })
  }

  handlePressOut(result) {
    let message = result ? 'Success' : 'Failure'
    // this.setState({ pressed: false, txt: message })
    // if(result) {
    //   this.borderOut()
    // }else {
    //   let callback = this.resetTarget.bind(this)
    //   let animated = LayoutAnimation.Presets.easeInEaseOut
    //   animated.duration = 300
    //   LayoutAnimation.configureNext(animated, callback);
    //   this.setState({
    //     txt: 'failiure',
    //     pupil: {
    //       height: pupilDiameter,
    //       width: pupilDiameter,
    //       borderRadius: 25
    //     },
    //     targetCircle: {
    //       height: basicWidth,
    //       width: basicWidth,
    //       borderRadius: basicWidth/2,
    //       borderColor: 'red',
    //       borderWidth: 5,
    //     }
    //   })
    // }
  }

  // resetTarget() {
  //   this.setState({
  //           targetCircle: {
  //             height: basicWidth,
  //             width: basicWidth,
  //             borderRadius: basicWidth/2,
  //             borderColor: 'blue',
  //             borderWidth: 5,
  //           }
  //         });
  // }
  //
  // borderOut() {
  //   let callback = this.borderIn.bind(this);
  //   let animated = LayoutAnimation.Presets.linear
  //   animated.duration = 300
  //   LayoutAnimation.configureNext(animated, callback);
  //   this.setState({
  //     targetCircle: {
  //       height: basicWidth + 20,
  //       width: basicWidth + 20,
  //       borderRadius: (basicWidth + 20) / 2,
  //       borderColor: 'white',
  //       borderWidth: 25,
  //     },
  //   })
  // }
  //
  // borderIn() {
  //   let callback = this.shrinkCircle.bind(this)
  //   let animated = LayoutAnimation.Presets.linear
  //   animated.duration = 100
  //   LayoutAnimation.configureNext(animated, callback);
  //   this.setState({
  //     targetCircle: {
  //       height: basicWidth,
  //       width: basicWidth,
  //       borderRadius: basicWidth/2,
  //       borderColor: 'blue',
  //       borderWidth: 5,
  //     }
  //   })
  //   this.props.updateScore(1)
  //   this.props.updateBoardLevel(1)
  // }



  render() {
    // let pupilStyle = [styles.pupilStyle, this.state.pupil]
    let targetCircle = [styles.target1, this.state.targetCircle]
    return (
      <View>
      <View style={styles.boardTextBox}>
        <Text style={styles.viewText}>{this.state.txt || '...'}</Text>
      </View>

        <View style={styles.container}>
          <View style={targetCircle} >
            <Pupil handlePressIn={this.handlePressIn.bind(this)}
                   handlePressOut={this.handlePressOut}
                   expandRing={this.expandRing.bind(this)}
                   ringOpened={this.state.ringOpened}
                   basicWidth={basicWidth}/>
          </View>
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
  target1: {
    backgroundColor: 'transparent'
  },
  boardTextBox: {

  }
});

module.exports = BasicCircle;
