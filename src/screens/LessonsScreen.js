import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { withAppContext } from '../context/AppContext';
import Header from '../components/layout/Header';
import lessons from '../data/lessons';

class LessonsScreen extends React.Component {
  state = {
    lessons: null,
  };

  componentDidMount() {
    this.setState({ lessons });
  }

  renderLessons = () => {
    const { Store } = this.props;
    if (this.state.lessons === null) {
      return false;
    }
    return this.state.lessons.lessons[Store.currentYear].map((
      lesson, index) => {
      const color = { color: `${Store.themeStyle.foreground}` };
      const background = { backgroundColor: `${Store.themeStyle.eventsList.backgroundColor}` };
      return (
        <View key={index} style={{ ...styles.lessonsItem, ...background }}>
          <Text style={{ ...styles.lessonItem__title, ...color }}>{lesson.title}</Text>
          <Text
            style={{ ...styles.lessonItem__info, ...color }}
          >
            {`${lesson.period} périodes - ${lesson.credits} crédits - ${lesson.professor}`}
          </Text>
        </View>
      );
    });
  };

  render() {
    const { Store } = this.props;
    return (
      <SafeAreaView style={{ height: `100%`, backgroundColor: `${Store.themeStyle.background}` }}>
        <Header title="Cours" />
        <ScrollView style={styles.lessonsList}>
          <View style={{ ...styles.lessonsList__container }}>
            {this.renderLessons()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  lessonsList: {
    padding: 20,
    marginBottom: -40,
  },
  lessonsList__container: {
    paddingBottom: 60,
  },
  lessonsItem: {
    marginBottom: 15,
    padding: 20,
    borderRadius: 5,
  },
  lessonItem__title: {
    fontSize: 20,
    fontWeight: `800`,
    marginBottom: 5,
  },
  lessonItem__info: {
    fontSize: 12,
    fontWeight: `600`,
    marginBottom: 5,
  },
  lessonItem__organized: {
    flex: 1,
    flexDirection: `column`,
  },
});
export default withAppContext(LessonsScreen);
