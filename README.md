# Circle Growth

This was a program made using JavaScript \(ES 6\) applied onto a canvas object in HTML. It is a screensaver emulator, since it is formatted to run within a browser framework, but could be reapplied later on.

**Project Dates:** November 2018 - present. (Inactive since February 2019)

![Screenshot failed to load](https://raw.githubusercontent.com/jacobkrol/Circle-Growth/master/example-screenshot.png)

*This is a part of my retroactive upload initiative to showcase my personal projects on an open-source platform.*

## About

Circle Growth was one of my first attempts at creating a screensaver-styled javascript program. It loads in a 400px by 400px standard HTML5 canvas object, but is resized to fit the entire available window space by applying a `window.onresize` property on startup. 

Essentially, a `Pen` object is used to trace where `Circle` objects should be placed. The pen drags across the screen, leaving circles, much like ink from a real pen. These circles will automatically and independently resize to fill a pre-designated amount of space as time progresses.

A big advantage to this project is that it allowed me to explore and practice with forms of JavaScript objects. In this case, I created 3 object frameworks. The `Pen` and `Wiper` only have one instance each, but the `Circle` object is replicated many times during runtime, stored in an array to facilitate a loop through all circles present on the canvas.

### Pen


| Property | Type     | Description                                  |
| :--:     | :--:     | :--                                          |
| x        | variable | x-coordinate of pen cursor                   |
| y        | variable | y-coordinate of pen cursor                   |
| angle    | variable | angle the pen is heading over next time step |
| speed    | variable | speed the pen travels across the canvas      |
| color    | variable | color of circle that will spawn next         |

### Wiper

### Circle
