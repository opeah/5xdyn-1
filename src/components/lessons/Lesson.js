import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Button, Picker } from 'react-native';
import PropTypes from 'prop-types';

import { withAppContext } from '../../context/AppContext';

class Lesson extends Component {
  state = { note: 0, pickers: [], open: false };

  componentDidMount() {
    if (this.props.lesson.note === undefined) {
      this.setState({ note: this.props.note });
    }
    let pickers = [];
    for (let i = 0; i <= 100; i++) {
      pickers.push(<Picker.Item key={i} label={`${i}`} value={i} />);
    }
    this.setState({ pickers: [...pickers] });
  }

  onSubmit = () => {
    this.props.Store.addNoteToLesson(this.props.id, this.state.note);
  };

  renderPicker = () => {
    return this.state.pickers.map(picker => picker);
  };

  render() {
    const { lesson, Store } = this.props;
    const { foreground, eventsList } = Store.themeStyle;

    return (
      <View style={{ ...styles.lessonsItem, backgroundColor: eventsList.backgroundColor }}>
        <Text style={{ ...styles.Lesson__title, color: foreground }}>{lesson.title}</Text>
        <Text style={{ ...styles.Lesson__info, color: foreground }}>
          {`${lesson.period} périodes - ${lesson.credits} crédits - ${lesson.professor}`}
        </Text>
        <View>
          {<Text style={styles.Lesson__note}>{lesson.note !== undefined
            ? lesson.note
            : `Pas encore de note`}</Text>}
        </View>
        <View style={{ display: !this.state.open ? `none` : `flex` }}>
          <Picker
            selectedValue={this.state.note}
            onValueChange={note => this.setState({ note })}
            itemStyle={{ color: foreground }}
            style={{ marginBottom: 20 }}
          >
            {this.renderPicker()}
          </Picker>
          <Button
            onPress={this.onSubmit}
            title={lesson.note === undefined ? `Ajouter votre note` : `Modifier votre note`}
            color={foreground}
            accessibilityLabel="Ajouter une note"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lessonsItem: {
    marginBottom: 15,
    padding: 20,
    borderRadius: 5,
  },
  Lesson__note: {
    color: `white`,
    fontWeight: `800`,
    marginTop: 5,
  },
  Lesson__title: {
    fontSize: 20,
    fontWeight: `800`,
    marginBottom: 5,
  },
  Lesson__info: {
    fontSize: 12,
    fontWeight: `600`,
    marginBottom: 5,
  },
  Lesson__organized: {
    flex: 1,
    flexDirection: `column`,
  },
  Lesson__form: {
    flex: 1,
    flexDirection: `row`,
    alignItems: `center`,
    color: `white`,
  },
  Lesson__form__text: {
    marginRight: 10,
  },
  Lesson__form__input: {
    padding: 5,
  },
});

Lesson.propTypes = {
  lesson: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
};

export default withAppContext(Lesson);
