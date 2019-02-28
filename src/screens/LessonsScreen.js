import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import Header from '../components/layout/Header';
import Lesson from '../components/lessons/Lesson';

import { withAppContext } from '../context/AppContext';

const LessonsScreen = ({ Store }) => {
  const renderLessons = () => {
    if (Store.lessons === null) {
      return false;
    }
    return Store.lessons[Store.currentYear].map((lesson, index) =>
      <Lesson lesson={lesson} key={index} id={index} />);
  };

  return (
    <SafeAreaView style={{ height: `100%`, backgroundColor: `${Store.themeStyle.background}` }}>
      <Header title="Cours" />
      <ScrollView style={styles.lessonsList}>
        <View style={{ ...styles.lessonsList__container }}>
          {renderLessons()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lessonsList: {
    padding: 20,
    marginBottom: -40,
  },
  lessonsList__container: {
    paddingBottom: 60,
  },

});
export default withAppContext(LessonsScreen);
