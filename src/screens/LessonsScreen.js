import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import Header from '../components/layout/Header';
import Lesson from '../components/lessons/Lesson';

import { withAppContext } from '../context/AppContext';

class LessonsScreen extends Component {
  state = {
    average: null,
  };

  componentDidMount() {
    this.calculateAverage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.Store.lessons !== this.props.Store.lessons) {
      this.calculateAverage();
    }
    if (prevProps.Store.currentYear !== this.props.Store.currentYear) {
      this.calculateAverage();
    }
  }

  renderLessons = () => {
    const { Store } = this.props;
    if (Store.lessons === null) {
      return false;
    }
    return Store.lessons[Store.currentYear].map((lesson, index) =>
      <Lesson lesson={lesson} key={index} id={index} />);
  };

  calculateAverage = () => {
    const { Store } = this.props;
    const notes = [];
    Store.lessons[Store.currentYear].map(lesson => {
      if (lesson.note !== undefined) {
        notes.push(lesson.note);
      }
    });
    if (notes.length > 0) {
      const sum = notes.reduce((item, a) => item + a);
      const average = sum / (notes.length);
      this.setState({ average });
    } else {
      this.setState({ average: null });
    }
  };

  render() {
    let { Store } = this.props;

    return (
      <SafeAreaView style={{ height: `100%`, backgroundColor: `${Store.themeStyle.background}` }}>
        <Header title="Cours" />
        <ScrollView style={styles.lessonsList}>
          <View style={styles.Lessons__average}>
            <Text style={{
              ...styles.Lessons__average__text,
              color: `${Store.themeStyle.foreground}`,
            }}>
              {this.state.average !== null
                ? `Moyenne : ${this.state.average} %`
                : `Entrez une note`}
            </Text>
          </View>
          <View style={{ ...styles.lessonsList__container }}>
            {this.renderLessons()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

LessonsScreen.propTypes = { Store: PropTypes.any };

const styles = StyleSheet.create({
  Lessons__average: {
    marginBottom: 20,
  },
  Lessons__average__text: {
    textAlign: `center`,
    fontWeight: `800`,
    fontSize: 20,
  },
  lessonsList: {
    padding: 20,
    marginBottom: -40,
  },
  lessonsList__container: {
    paddingBottom: 60,
  },

});
export default withAppContext(LessonsScreen);
