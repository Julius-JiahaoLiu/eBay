import { GameObject } from "./GameObject";

export class Wall extends GameObject {
    constructor(r, c, gamemap){
        super();
        this.r = r;
        this.c = c;
        this.ctx = gamemap.ctx;
        this.L = gamemap.L;
        this.color = "#B37226";
    }
    update() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.r * this.L, this.c * this.L, this.L, this.L);
    }
}