import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, Picker } from 'react-native';
import PropTypes from 'prop-types';

import { withAppContext } from '../../context/AppContext';

class Lesson extends Component {
  state = { note: 0, pickers: [], open: false };

  componentDidMount() {
    this.createPickers();
    if (this.props.lesson.note !== undefined) {
      this.setState({ note: this.props.lesson.note });
    } else {
      this.setState({ note: 0 });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lesson.note !== this.props.lesson.note) {
      if (this.props.lesson.note !== undefined) {
        this.setState({ note: this.props.lesson.note });
      }
    }
    if (prevProps.Store.currentYear !== this.props.Store.currentYear) {
      if (this.props.lesson.note === undefined) {
        this.setState({ note: 0 });
      }
    }
    if (prevProps.Store.darkMode !== this.props.Store.darkMode) {
      this.createPickers();
    }
  }

  onSubmit = () => {
    this.props.Store.addNoteToLesson(this.props.id, this.state.note);
  };

  createPickers = () => {
    let pickers = [];
    for (let i = 0; i <= 100; i++) {
      pickers.push(<Picker.Item key={i} label={`${i}`} value={i} />);
    }
    this.setState({ pickers });
  };

  renderPickers = () => {
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
          {<Text style={{ ...styles.Lesson__note, color: foreground }}>{
            lesson.note !== undefined
              ? `${lesson.note} / 100`
              : `Pas encore de note`}</Text>}
        </View>
        <View style={{ display: !this.state.open ? `none` : `flex` }}>
          <Picker
            selectedValue={this.state.note}
            onValueChange={note => this.setState({ note })}
            itemStyle={{ color: foreground }}
            style={{ marginBottom: 20 }}
          >
            {this.renderPickers()}
          </Picker>
        </View>
        <View style={{ ...styles.Lesson__submit, display: !this.state.open ? `none` : `flex` }}>
          <Button
            onPress={() => {
              this.onSubmit();
              this.setState({ open: !this.state.open });
            }}
            title={lesson.note === undefined ? `Ajouter` : `Modifier`}
            color={foreground}
            accessibilityLabel="Ajouter ou modifier une note"
          />
        </View>
        <View style={{ ...styles.Lesson__submit, display: this.state.open ? `none` : `flex` }}>
          <Button
            onPress={() => {
              this.setState({ open: !this.state.open });
            }}
            title={lesson.note === undefined ? `Ajouter` : `Modifier`}
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
  Lesson__submit: {
    marginTop: 10,
  },
});

Lesson.propTypes = {
  lesson: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
};

export default withAppContext(Lesson);
