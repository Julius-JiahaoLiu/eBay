import { GameObject } from './GameObject.js';
import { Wall }  from './Wall.js';

export class GameMap extends GameObject {
    constructor(ctx, parent){
        super();
        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;
        this.rows = 15;
        this.cols = 15;
        this.inner_walls_count = 20;
        this.walls = [];
        this.status = [];
    }
    // checking connectivity from (sx, sy) to (tx, ty)
    floodFill(st, sx, sy, tx, ty){
        if(sx == tx && sy == ty) return true;
        st[sx][sy] = true;
        let dx = [0, 0, 1, -1], dy = [1, -1, 0, 0];
        for(let i = 0; i < 4; i++){
            let nx = sx + dx[i], ny = sy + dy[i];
            if(!st[nx][ny] && this.floodFill(st, nx, ny, tx, ty)) return true;
        }
        return false;
    }
    createWalls(){
        for(let i = 0; i < this.rows; i++){
            this.status[i] = [];
            for(let j = 0; j < this.cols; j++){
                this.status[i][j] = false;
            }
        }
        for(let i = 0; i < this.cols; i++){
            this.status[0][i] = this.status[this.rows - 1][i] = true;
            this.status[i][0] = this.status[i][this.cols - 1] = true;
        }
        // create symmetric random inner walls 
        for(let i = 0; i < this.inner_walls_count / 2; i++){
            for(let j = 0; j < 1000; j++){
                const r = parseInt(Math.random() * (this.rows - 2) + 1);
                const c = parseInt(Math.random() * (this.cols - 2) + 1);
                if(this.status[r][c] || this.status[c][r]) continue;
                this.status[r][c] = this.status[c][r] = true;
                break;
            }
        }
        const cp_status = JSON.parse(JSON.stringify(this.status));
        if(!this.floodFill(cp_status, this.rows - 2, 1, 1, this.cols - 2)) return false;
        // for(let i = 0; i < this.rows; i++){
        //     for(let j = 0; j < this.cols; j++){
        //         if(this.status[i][j]){
        //             this.walls.push(new Wall(i, j, this));
        //         }
        //     }
        // }
        return true;
    }
    start(){
        for(let i = 0; i < 1000; i++){
            if(this.createWalls()) break;
        }
    }
    update() {
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
        const color_even = "#AAD751", color_odd = "#A2D149";
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                if(this.status[i][j]){
                    new Wall(i, j, this);
                }else{
                    this.ctx.fillStyle = (i + j) % 2 ? color_even : color_odd;
                    this.ctx.fillRect(j * this.L, i * this.L, this.L, this.L);
                }
            }
        }
    }
}