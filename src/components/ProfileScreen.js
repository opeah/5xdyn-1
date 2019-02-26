import React from 'react';
import { Text, View } from 'react-native';

import { withThemeContext } from '../context/ThemeContext';
import TopBar from './layout/TopBar';
import lessons from '../data/lessons';

class ProfileScreen extends React.Component {
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
      return (
        <View key={index} style={[{ marginBottom: 20 }]}>
          <Text>
            {lesson.title}
            {lesson.period}
            {lesson.credits}
            {lesson.professor}
          </Text>
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
  },
});
export default withThemeContext(ProfileScreen);
