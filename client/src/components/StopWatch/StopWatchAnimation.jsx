import React, { useState, useEffect } from "react";
import "./StopWatchAnimation.css"

export const StopWatchAnimation = () => {
    return (

        <form className="stopwatch">
                <input id="start" type="checkbox"/>
                <input id="pause" type="checkbox"/>
                <label className="stopwatch__pause" htmlFor="pause"><span>Pause</span></label>
                <label className="stopwatch__start" htmlFor="start"><span>Start</span></label>
                <button className="stopwatch__reset" id="reset" type="reset"><span>Reset</span></button>
                <div className="stopwatch__restart stopwatch__control">
                        <div className="reset-button"></div>
                </div>
                <div className="stopwatch__stop-start stopwatch__control">
                        <div className="start-button"></div>
                </div>
                <div className="stopwatch__shadows"></div>
                <div className="stopwatch__content">
                        <div className="stopwatch__face">
                                <div className="digit m m--tens">0</div>
                                <div className="digit m m--singles">0</div>
                                <span>:</span>
                                <div className="digit second s s--tens">0</div>
                                <div className="digit second s s--singles">0</div>
                                <span>.</span>
                                <div className="digit digit--small ms ms--tens">0</div>
                                <div className="digit digit--small ms ms--singles">0</div>
                        </div>
                </div>
        </form>
        // <div className="clock_clock1">
        //     <input type="radio" name="timer" id="start"/>
        //     <input type="radio" name="timer" id="stop"/>
        //     <input type="radio" name="timer" id="reset"/>
        //     <label className="clock_btn clock_red" htmlFor="reset"></label>
        //     <span className="clock_ring"></span>
        //     <div className="clock_btn"></div>
        //
        //     <label className="clock_btn clock_right clock_blue" htmlFor="start"></label>
        //     <div className="clock_btn clock_right"></div>
        //
        //     <label className="clock_btn clock_left clock_black" htmlFor="stop"></label>
        //     <div className="clock_btn clock_left"></div>
        //
        //     <span className="clock_axis tiny"></span>
        //     <span className="clock_axis"></span>
        //     <span className="second-hand"></span>
        //     <span className="clock_clock-face clock_twelve"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-1"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-2"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-3"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-4"></span>
        //     <span className="clock_clock-face clock_one"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-6"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-7"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-8"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-9"></span>
        //     <span className="clock_clock-face clock_two"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-11"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-12"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-13"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-14"></span>
        //     <span className="clock_clock-face clock_three"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-16"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-17"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-18"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-19"></span>
        //     <span className="clock_clock-face clock_four"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-21"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-22"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-23"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-24"></span>
        //     <span className="clock_clock-face clock_five"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-26"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-27"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-28"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-29"></span>
        //     <span className="clock_clock-face clock_six"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-31"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-32"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-33"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-34"></span>
        //     <span className="clock_clock-face clock_seven"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-36"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-37"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-38"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-39"></span>
        //     <span className="clock_clock-face clock_eight"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-41"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-42"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-43"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-44"></span>
        //     <span className="clock_clock-face clock_nine"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-46"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-47"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-48"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-49"></span>
        //     <span className="clock_clock-face clock_ten"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-51"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-52"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-53"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-54"></span>
        //     <span className="clock_clock-face clock_eleven"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-56"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-57"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-58"></span>
        //     <span className="clock_clock-face clock_seconds clock_second-59"></span>
        // </div>
    );
};
