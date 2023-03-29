// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timeLimitMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecrementTimerLimitMinutes = () => {
    const {timeLimitMinutes, isTimerRunning} = this.state
    if (timeLimitMinutes > 1 && isTimerRunning === false) {
      this.setState(prevState => ({
        timeLimitMinutes: prevState.timeLimitMinutes - 1,
      }))
    }
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeLimitMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimitMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onIncreaseTimerLimitMinutes = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning === false) {
      this.setState(prevState => ({
        timeLimitMinutes: prevState.timeLimitMinutes + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeElapsedInSeconds, timeLimitMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimitMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeLimitMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingInSeconds = timeLimitMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingInSeconds / 60)
    const seconds = Math.floor(totalRemainingInSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {timeLimitMinutes} = this.state
    const {isTimerRunning} = this.state
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <div>
          <h1>Digital Timer</h1>
        </div>
        <div className="bg-image-and-bottom-total-container">
          <div className="bg-image">
            <div className="round-circle">
              <h1>{this.getElapsedSecondsInTimeFormat()}</h1>
              <p>{labelText}</p>
            </div>
          </div>
          <div className="bottom-total-container">
            <div className="play-and-reset">
              <button
                type="button"
                onClick={this.onStartOrPauseTimer}
                className="play-icon-and-text"
              >
                <img
                  src={startOrPauseImgUrl}
                  alt={startOrPauseAltText}
                  className="play-icon"
                />
                <p className="pause-text">
                  {isTimerRunning ? 'Pause' : 'Start'}
                </p>
              </button>
              <button
                type="button"
                onClick={this.onResetTimer}
                className="play-icon-and-text"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="play-icon"
                />
                <p className="pause-text">Reset</p>
              </button>
            </div>
            <p className="set-timer-limit">Set Timer limit</p>
            <div className="number-increase-and-decrease">
              <button
                type="button"
                onClick={this.onDecrementTimerLimitMinutes}
                className="minus"
              >
                -
              </button>
              <p className="box-number">{timeLimitMinutes}</p>
              <button
                onClick={this.onIncreaseTimerLimitMinutes}
                type="button"
                className="plus"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
