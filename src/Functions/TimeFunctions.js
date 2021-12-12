import React from "react";

export function msToReadableTime(t) {
    // 162695
    var sec = Math.floor(t / 1000)
    // 162
    var min = Math.floor(sec / 60)
    // 2
    var s = Math.floor(sec % (min*60))
    min = String(min)
    if (s<10) {
        s = `0${s}`
    } else {
        s = String(s)
    }
    console.log(`${min}:${s}`)
    return (`${min}:${s}`); 
}