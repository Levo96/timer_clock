import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


window.onload = () => {
  // Timer Clock ---------------------
  let content_box = document.getElementById("content_box");
  
  class PomodoroClock extends React.Component {
    constructor(props)
    {
      super(props);
      this.state = {
        timerId: 0,
        cycle: "-----",
        currentTime: "25 : 00",
        workTime: 25,
        breakTime: 5,
        button_state: "start"
      }
      
      
      this.incrementWorkTime = this.incrementWorkTime.bind(this);
      this.decrementWorkTime = this.decrementWorkTime.bind(this);
      this.incrementBreakTime = this.incrementBreakTime.bind(this);
      this.decrementBreakTime = this.decrementBreakTime.bind(this);
      this.handleWorkIncrement = this.handleWorkIncrement.bind(this);
      this.handleWorkDecrement = this.handleWorkDecrement.bind(this);
      this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
      this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
      this.disableButtons = this.disableButtons.bind(this);
      this.enableButtons = this.enableButtons.bind(this);
      this.timer = this.timer.bind(this);
      this.resetTimer = this.resetTimer.bind(this);
      this.startWorkTimer = this.startWorkTimer.bind(this);
      this.startBreakTimer = this.startBreakTimer.bind(this);
      this.timerColorSetter = this.timerColorSetter.bind(this);
    }
    
    timerColorSetter(color = "white", stat="-----"){
      let display_elements = document.getElementsByClassName("display_clock_container")[0].children;
      
      for(let i = 0; i < display_elements.length; i++)
        {
          display_elements[i].style.color = color;
        }
      
      this.setState({cycle: stat});
    }
    
    resetTimer(){
      let minutes = this.state["workTime"];
      this.setState({
        currentTime: (minutes < 10 ? "0" + minutes : minutes) + " : " + "00"
      });
      this.timerColorSetter();
    }
    
    startWorkTimer(){
      
      let minutes = this.state["workTime"];
      let seconds = 60;
      minutes -= 1;
      this.timerColorSetter("limegreen", "session");
      
      let runningTime = setInterval(()=> {
        this.setState({timerId: runningTime});
        
        if(minutes == 0 && seconds == 0)
          {
            seconds = 0;
            minutes = 0;
            clearInterval(this.state.timerId);
            this.startBreakTimer();
          }
        if(seconds == 0)
          {
            if(minutes > 0)
              {
                minutes -= 1;
                seconds = 60;
              }
            else
              {
                seconds = 60;
              }
          }
        if(seconds > 0)
          {
            seconds -=1;
            this.setState({
              currentTime: (minutes < 10 ? ("0" + minutes) : minutes ) + " : " + (seconds < 10 ? ("0" + seconds) : seconds )
            });
          }
      }, 1000);
    }
    
    startBreakTimer(){
      let minutes = this.state["breakTime"];
      let seconds = 60;
      minutes -= 1;
      this.timerColorSetter("red", "break");
      
      let runningTime = setInterval(()=> {
        this.setState({timerId: runningTime});
        
        if(minutes == 0 && seconds == 0)
          {
            
            seconds = 0;
            minutes = 0;
            clearInterval(this.state.timerId);
            this.startWorkTimer();
          }
        if(seconds == 0)
          {
            if(minutes > 0)
              {
                minutes -= 1;
                seconds = 60;
              }
            else
              {
                seconds = 60;
              }
          }
        if(seconds > 0)
          {
            seconds -=1;
            this.setState({
              currentTime: (minutes < 10 ? ("0" + minutes) : minutes ) + " : " + (seconds < 10 ? ("0" + seconds) : seconds )
            });
          }
      }, 1000);
    }
   
  
    disableButtons()
    {
      let wt_increment_button = document.getElementsByClassName("increase_session_button")[0];
      let wt_decrement_button = document.getElementsByClassName("decrease_session_button")[0];
      let bt_increment_button = document.getElementsByClassName("increase_break_button")[0];
      let bt_decrement_button = document.getElementsByClassName("decrease_break_button")[0];
      
      wt_increment_button.disabled = true;
      wt_decrement_button.disabled = true;
      bt_increment_button.disabled = true;
      bt_decrement_button.disabled = true;
      
      this.setState({button_state: "reset"});
      
      return;
    }
    
    enableButtons(){
      let wt_increment_button = document.getElementsByClassName("increase_session_button")[0];
      let wt_decrement_button = document.getElementsByClassName("decrease_session_button")[0];
      let bt_increment_button = document.getElementsByClassName("increase_break_button")[0];
      let bt_decrement_button = document.getElementsByClassName("decrease_break_button")[0];
      
      wt_increment_button.disabled = false;
      wt_decrement_button.disabled = false;
      bt_increment_button.disabled = false;
      bt_decrement_button.disabled = false;
      
      this.setState({button_state: "start"});
      
      return;
    }
    
    
    incrementWorkTime(){
      let tmp = this.state["workTime"] + 1;
      if(tmp >= 1 && tmp <= 60)
        {
          this.setState({
            workTime: tmp,
            currentTime: (tmp < 10 ? "0" + tmp : tmp) + " : " + "00" 
          });    
        }
    }
    
    decrementWorkTime(){
      let tmp = this.state["workTime"] - 1;
      if(tmp >= 1 && tmp <= 60)
        {
          this.setState({
            workTime: tmp,
            currentTime: (tmp < 10 ? "0" + tmp : tmp) + " : " + "00" 
          });    
        }
    }
    
    incrementBreakTime(){
      let tmp = this.state["breakTime"] + 1;
      if(tmp >= 1 && tmp <= 60)
        {
          this.setState({
            breakTime: tmp, 
          });    
        }
    }
    
    decrementBreakTime(){
      let tmp = this.state["breakTime"] - 1;
      if(tmp >= 1 && tmp <= 60)
        {
          this.setState({
            breakTime: tmp, 
          });    
        }
    }
    
    handleWorkIncrement(){
      this.incrementWorkTime();
    }
    
    handleWorkDecrement(){
      let tmp = this.state["workTime"];
      if(tmp > 0)
        {
          this.decrementWorkTime();    
        }
    }
    
    handleBreakIncrement(){
      this.incrementBreakTime();
    }
    
    handleBreakDecrement(){
      let tmp = this.state["breakTime"];
      if(tmp > 0)
        {
          this.decrementBreakTime();    
        }
    }
    
    timer(){
      
      if(this.state.button_state == "start")
        {
          this.disableButtons();
          this.startWorkTimer();
        }
      else if(this.state.button_state == "reset")
        {
          this.enableButtons();
          clearInterval(this.state.timerId);
          this.resetTimer();
        }  
    }
    
    
    
    render()
    {
      return(
       <div className="app_container">
          <div className="title_container">
            <h2>Timer Clock</h2>
          </div>  
          <div className="display_clock_container">
            <h2>{this.state.currentTime}</h2>
            <h3>{this.state.cycle}</h3>
          </div>
          <div className="sessions_settingsC_container">
            <div className="left_sessions_settings_container">
              <div className="lssc_display_container">
                <h4>Session Settings</h4>
                <h3>{this.state.workTime}</h3>
              </div>
              <div className="lssc_buttons_container">
                <button className="increase_session_button" onClick ={this.handleWorkIncrement}>+</button>
                <button className="decrease_session_button" onClick={this.handleWorkDecrement}>-</button>
              </div>
            </div>
            <div className="right_sessions_settings_container">
              <div className="rssc_display_container">
                <h4>Break Settings</h4>
                <h3>{this.state.breakTime}</h3>
              </div>
              <div className="rssc_buttons_container">
                <button className="increase_break_button" onClick={this.handleBreakIncrement}>+</button>
                <button className="decrease_break_button" onClick={this.handleBreakDecrement}>-</button>
              </div>
            </div>
          </div>
          <div className="start_button_container">
            <button onClick={this.timer}>{this.state.button_state}</button>
          </div>
       </div>    
      );
    }
  }
  ReactDOM.render(<PomodoroClock />, content_box);
}//------------------------------------

