import React from 'react';
import { Text, View, Image } from 'react-native';

import { withThemeContext } from '../context/ThemeContext';
import TopBar from './layout/TopBar';
//import dataLessons from '../data/lessons.json';

class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lessons: null,
    };
  }

  componentDidMount () {
    let dataCursus = `../data/lessons.json`;
    fetch(dataCursus)
      .then()

  }

  renderLessons = () => {
    if (this.state.lessons === null) {
      return false;
    }
    return this.state.lessons.items.map(lesson => {
      const style = { color: `${this.props.ThemeProvider.themeStyle.foreground}` };
      const data = dataLessons
      return (
        <View key={lesson.id} style={[{ marginBottom: 20 }]}>
          <Text style={style}>{data.first || data.second}</Text>
          <Text style={style}>{data.first.title || data.second.title}</Text>
          <Text style={style}>{data.first.period || data.second.period}</Text>
          <Text style={style}>{data.first.credits || data.second.credits}</Text>
          <Text style={style}>{data.first.professor || data.second.professor}</Text>
        </View>
      );
    });
  };

  render() {
    return (
      <View>
        <View>
          <TopBar title="Profile" />
        </View>
        <ScrollView style={[
            styles.container,
            { backgroundColor: `${this.props.ThemeProvider.themeStyle.background}` }]}
          >
            {this.renderLessons()}
          </ScrollView>
        <View >
        </View>
      </View>
    );
  }
}

export default withThemeContext(ProfileScreen);
