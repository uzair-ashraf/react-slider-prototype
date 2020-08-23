import React, { Component } from 'react'
import Slider from '@material-ui/core/Slider';

export default class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      handlersChangeMetricsFilter: [
        [0, 100],
        [42, 89],
        [32, 1000]
      ]
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e, newValue, i) {
    // Destructures the array from state
    const { handlersChangeMetricsFilter } = this.state
    // Creates a deep copy of the multidimensional array to not prematurely mutate state
    const deepCopy = handlersChangeMetricsFilter.map(range => [...range])
    // assign the new value from the event
    deepCopy[i] = newValue
    //set the new value to update on the dom
    // setState takes a second argument, a callback function that fires off once set state has finished its work, its an asynchonous operation so you want to make sure state updates before you try to console log it.
    this.setState({
      handlersChangeMetricsFilter: deepCopy
    }, () => console.log(this.state.handlersChangeMetricsFilter[i]))
  }
  render() {
    const { handlersChangeMetricsFilter } = this.state
    return (
      <div>
        {
          // map returns a new array with the dom elements
          handlersChangeMetricsFilter.map((range, index) => {
            return (
              <Slider
                // when using an array of dom elements you need a key prop, its bad practice to use index but theres no choice here
                key={index}
                // the range is the array in the multi dimensional array
                value={range}
                // the reason its a nested callback is because we need to grab the index too
                onChange={(e, v) => this.handleChange(e, v, index)}
                // idk what this means LOL
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
              />
            )
          })
        }
      </div>
    )
  }
}
