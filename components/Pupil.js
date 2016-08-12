
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Dimensions
} from 'react-native';

let screenHeight = Dimensions.get('window').height
let basicWidth = Dimensions.get('window').width * .75

const DIAMETER = 50

class Pupil extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      cleanSlate: true,
      pupil: {
        height: 50,
        width: 50,
        borderRadius: 25
      },
    };
  }

  handlePressIn() {
    this.setState({ pressed: true, cleanSlate: false }, this.growCircle.bind(this))
    // this.props.handlePressIn()
  }

  handlePressOut() {
    const { basicWidth } = this.props
    const result = (basicWidth - this.state.pupil.width < 10) && (basicWidth - this.state.pupil.width > -5)
    this.setState({ pressed: false })
    this.props.handlePressOut(result)
    if(!result) {
      let callback = console.log('done')
      let animated = LayoutAnimation.Presets.easeInEaseOut
      animated.duration = 300
      LayoutAnimation.configureNext(animated, callback);
      this.setState({
        pupil: {
          height: DIAMETER,
          width: DIAMETER,
          borderRadius: 25
        },
      })
    }
  }

  growCircle() {
    let size = this.state.pupil.height
    let borderRadius = this.state.pupil.borderRadius
    let animated = LayoutAnimation.Presets.linear
    animated.duration = 10
    let callback = this.growMore.bind(this);
    LayoutAnimation.configureNext(animated, callback);
    if(this.state.pressed) {
      this.setState({
        pupil: {
          height: size + 5,
          width: size + 5,
          borderRadius: borderRadius + 2.5
        },
      })
    }
  }

  growMore() {
    if(this.state.pressed) { this.handlePressIn() }
  }

  // shrinkCircle() {
  //   let size = this.state.pupil.height
  //   let borderRadius = this.state.pupil.borderRadius
  //   let animated = LayoutAnimation.Presets.linear
  //   animated.duration = 15
  //   let callback = this.shrinkMore.bind(this);
  //   LayoutAnimation.configureNext(animated, callback);
  //   this.setState({
  //     pupil: {
  //       height: size - 20,
  //       width: size - 20,
  //       borderRadius: borderRadius - 10
  //     }
  //   })
  // }

  // shrinkMore() {
  //   if(this.state.pupil.width > 40) {
  //     this.shrinkCircle()
  //   }else {
  //     if(this.state.layer === 2 && this.state.txt === 'success') {
  //       this.setState({ newRoundState },this.props.updateCompLevel(1))
  //     }else {
  //       this.setState({
  //         cleanSlate: true,
  //         pupil: {
  //           height: DIAMETER,
  //           width: DIAMETER,
  //           borderRadius: 25
  //         }
  //       })
  //       // TODO: implemnt counter to only run pulse if level isnt beat
  //       // this.pulse()
  //     }
  //   }
  // }

  componentDidMount() {
    this.pulse()
  }

  pulse() {
    let callback = this.continuePulse.bind(this);
    let animated = LayoutAnimation.Presets.spring
    let size = this.state.pupil.width
    let newWidth = size > DIAMETER ? DIAMETER : 56
    if(!this.state.targetOpened) { newWidth = 0 }
    animated.duration = Math.floor(Math.random() * 1000) + 400
    LayoutAnimation.configureNext(animated, callback);
    this.setState({
      pupil: {
        height: newWidth,
        width: newWidth,
        borderRadius: size > DIAMETER ? 25 : 25
      },
    })
  }

  continuePulse() {
    if(!this.state.targetOpened) {
      this.setState({
        targetOpened: true,
        targetCircle: {
          height: basicWidth,
          width: basicWidth,
          borderRadius: basicWidth/2,
          borderColor: 'blue',
          borderWidth: 5,
        }
      })
    }
    if(this.state.cleanSlate) { this.pulse() }
  }


  render() {
    let pupil = [styles.pupilStyle, this.state.pupil]
    return (
      <Animated.View style={styles.container}>
        <TouchableWithoutFeedback
          onPressIn={this.handlePressIn.bind(this)}
          onPressOut={this.handlePressOut.bind(this)}>
          <View style={pupil}></View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pupilStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    margin: 25
  },
});

module.exports = Pupil;
