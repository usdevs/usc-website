import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';

class Calendar extends Component {
    calc = (year, month) => {
        if (this.state.selectedElement) {
            if (this.state.selectedMonth != month || this.state.selectedYear != year) {
                this.state.selectedElement.classList.remove('bg-dark');
            } else {
                this.state.selectedElement.classList.add('bg-dark');
            }
        }
        return {
            firstOfMonth: new Date(year, month, 1),
            daysInMonth: new Date(year, month + 1, 0).getDate()
        };
    }

    componentWillMount() {
        this.setState(this.calc.call(null, this.state.year, this.state.month));
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.onSelect && prevState.selectedDt != this.state.selectedDt) {
            this.props.onSelect.call(this.getDOMNode(), this.state);
        }
    }

    constructor(props) {
      super(props);
      var date = new Date();
      this.state = {
          year: date.getFullYear(),
          month: date.getMonth(),
          selectedYear: date.getFullYear(),
          selectedMonth: date.getMonth(),
          selectedDate: date.getDate(),
          selectedDt: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          startDay: 1,
          weekNumbers: false,
          minDate: this.props.minDate ? this.props.minDate : null,
          disablePast: this.props.disablePast ? this.props.disablePast : false,
          dayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          monthNamesFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          firstOfMonth: null,
          daysInMonth: null
      };
    }

    getPrev = () => {
        var state = {};
        if (this.state.month > 0) {
            state.month = this.state.month - 1;
            state.year = this.state.year;
        } else {
            state.month = 11;
            state.year = this.state.year - 1;
        }
        Object.assign(state, this.calc.call(null, state.year, state.month));
        this.setState(state);
    }

    getNext = () => {
        var state = {};
        if (this.state.month < 11) {
            state.month = this.state.month + 1;
            state.year = this.state.year;
        } else {
            state.month = 0;
            state.year = this.state.year + 1;
        }
        Object.assign(state, this.calc.call(null, state.year, state.month));
        this.setState(state);
    }

    selectDate = (year, month, date, element) => {
        if (this.state.selectedElement) {
            this.state.selectedElement.classList.remove('r-selected');
        }
        element.target.classList.add('r-selected');
        this.setState({
            selectedYear: year,
            selectedMonth: month,
            selectedDate: date,
            selectedDt: new Date(year, month, date),
            selectedElement: element.target
        });
    }

    render() {
      const { monthNamesFull, month, year, dayNames, startDay, weekNumbers, daysInMonth, firstOfMonth, disablePast, minDate } = this.state;
      const { getPrev, getNext, selectDate } = this;

        return (
          <Container>
            <Header monthNames={monthNamesFull} month={month} year={year} onPrev={getPrev} onNext={getNext} />
            <WeekDays dayNames={dayNames} startDay={startDay} weekNumbers={weekNumbers} />
            <MonthDates month={month} year={year} daysInMonth={daysInMonth} firstOfMonth={firstOfMonth} startDay={startDay} onSelect={selectDate} weekNumbers={weekNumbers} disablePast={disablePast} minDate={minDate} />
          </Container>
        );
    }
}

class Header extends Component {
    render() {
        return (
          <Row className="text-center align-items-center">
            <Col>
              <Button onClick={this.props.onPrev.bind(this)}>{'< Previous'}</Button>
            </Col>
            <Col>
              <h5 className="display-4">
                { this.props.monthNames[this.props.month] }, <small className="text-muted">{ this.props.year } </small>
              </h5>
            </Col>
            <Col>
              <Button onClick={this.props.onNext.bind(this)}>{'Next >'}</Button>
            </Col>
          </Row>
        );
    }
}

class WeekDays extends Component {
    render() {
        const { dayNames } = this.props;

        return (
          <Row>
            {
              dayNames.map((day) =>
                <Col key={day} className="text-center">
                  <p>{day}</p>
                </Col>
              )
            }
          </Row>
        );
    }
};

class MonthDates extends Component {
    render() {
        var haystack,
            day,
            d,
            current,
            onClick,
            isDate,
            className,
            weekStack = Array.apply(null, { length: 7 }).map(Number.call, Number),
            that = this,
            startDay = this.props.firstOfMonth.getUTCDay(),
            first = this.props.firstOfMonth.getDay(),
            janOne = new Date(that.props.year, 0, 1),
            rows = 6;

        return (<h1>test</h1>);
    }
};

export default Calendar;
