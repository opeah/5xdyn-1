import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

import { withThemeContext } from '../../context/ThemeContext';
import TopBar from '../layout/TopBar';
import lessons from '../../data/lessons';

class LessonsScreen extends React.Component {
  state = {
    lessons: null,
  };

  componentDidMount() {
    this.setState({
      lessons,
    });
  }

  renderLessons = () => {
    if (this.state.lessons === null) {
      return false;
    }
    return this.state.lessons.lessons[this.props.ThemeProvider.currentYear].map((
      lesson, index) => {
      const color = { color: `${this.props.ThemeProvider.themeStyle.foreground}` };
      const background = { backgroundColor: `${this.props.ThemeProvider.themeStyle.eventsList.backgroundColor}` };
      return (
        <View key={index} style={{ ...styles.lessonItem, ...background }}>
          <View>
            <Text style={{ ...styles.lessonItem__title, ...color }}>{lesson.title}</Text>
          </View>
          <View style={{ ...styles.lessonItem__organized }}>
            <Text style={{ ...styles.lessonItem__info, ...color }}>{`${lesson.period} périodes`}</Text>
            <Text style={{ ...styles.lessonItem__info, ...color }}>{`${lesson.credits} crédits`}</Text>
            <Text style={{ ...styles.lessonItem__info, ...color }}>{lesson.professor}</Text>
          </View>
        </View>
      );
    });
  };

  render() {
    return (
      <View>
        <TopBar title="Liste des cours" />
        <View>
          <ScrollView style={[
            styles.container,
            { backgroundColor: `${this.props.ThemeProvider.themeStyle.background}` }]}
          >
            {this.renderLessons()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: `100%`,
  },
  lessonItem: {
    flex: 1,
    flexDirection: `row`,
    marginBottom: 15,
    padding: 20,
    borderRadius: 5,
    width: `90%`,
  },
  lessonItem__title: {
    fontSize: 16,
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
export default withThemeContext(LessonsScreen);
