const GAME_OBJECT = [];

export class GameObject {
    constructor() {
        this.timeDelta = 0;
        this.calledStart = false;
        GAME_OBJECT.push(this);
    }
    start() { // only called once

    }
    update() { // called every frame (60fps)

    }
    onDestroy() { // called when destroy() is called
    }
    destroy() {
        this.onDestroy();
        GAME_OBJECT.splice(GAME_OBJECT.indexOf(this), 1);
    }
}
let lastTime = 0;
const step = (timestamp) => {
    GAME_OBJECT.forEach((gameObject) => {
        if (!gameObject.calledStart) {
            gameObject.start();
            gameObject.calledStart = true;
        }else{
            gameObject.timeDelta = timestamp - lastTime;
            gameObject.update();
        }
    });
    lastTime = timestamp;
    window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);

// let last_timestamp;  // 上一次执行的时刻
// const step = timestamp => {
//     for (let obj of GAME_OBJECT) {
//         if (!obj.calledStart) {
//             obj.calledStart = true;
//             obj.start();
//         } else {
//             obj.timeDelta = timestamp - last_timestamp;
//             obj.update();
//         }
//     }
//     last_timestamp = timestamp;
//     requestAnimationFrame(step)
// }
// requestAnimationFrame(step)
