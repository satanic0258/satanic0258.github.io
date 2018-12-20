class MineCell {
    num: number;
    private readonly posX: number;
    private readonly posY: number;
    private readonly size: number;
    private openFlag: boolean;
    private flaggedFlag: boolean;

    constructor(num: number, posX: number, posY: number, size: number) {
        this.num = num;
        this.posX = posX;
        this.posY = posY;
        this.size = size;
        this.openFlag = false;
        this.flaggedFlag = false;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        if (this.openFlag) {
            ctx.fillStyle = "#ccc";
            ctx.rect(this.posX, this.posY, this.size, this.size);
            ctx.fill();
        }
        else {
            ctx.fillStyle = "#999";
            ctx.rect(this.posX, this.posY, this.size, this.size);
            ctx.fill();
        }
        ctx.closePath();

        ctx.beginPath();
        if (this.openFlag) {
            if (this.num >= 1) { // 数字
                ctx.fillStyle = "#17e";
                ctx.font = "bold " + (this.size / 2) + "px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(String(this.num), this.posX + this.size / 2, this.posY + this.size / 1.5);
                ctx.fill();
            }
            else if (this.num <= -1) { // 地雷
                ctx.fillStyle = "#000";
                ctx.arc(this.posX + this.size / 2, this.posY + this.size / 2, this.size / 3, 0, Math.PI * 2, true);
                ctx.fill();
            }
        }
        else {
            if (this.flaggedFlag) {
                ctx.fillStyle = "#b00";
                ctx.font = "bold " + (this.size / 2) + "px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("F", this.posX + this.size / 2, this.posY + this.size / 1.5);
                ctx.fill();
            }
        }
        ctx.closePath();
    }

    open() {
        this.openFlag = true;
    }

    switchFlag() {
        this.flaggedFlag = !this.flaggedFlag;
    }

    isFlagged() {
        return this.flaggedFlag;
    }

    reset() {
        this.num = 0;
        this.openFlag = false;
        this.flaggedFlag = false;
    }

    isOpen(): boolean {
        return this.openFlag;
    }

    isEnd(): boolean {
        return this.openFlag && this.num < 0;
    }
}

class Minesweeper {
    private readonly rectX: number;
    private readonly rectY: number;
    private readonly rectW: number;
    private readonly rectH: number;
    private w: number;
    private h: number;
    private cellSize: number;
    private numOfMine: number;
    private mineCells: MineCell[];
    private restCell: number;

    constructor(x: number, y: number, w: number, h: number) {
        this.rectX = x;
        this.rectY = y;
        this.rectW = w;
        this.rectH = h;
    }

    setMines() {
        this.restCell = this.w * this.h - this.numOfMine;
        for (let pi = 0; pi < this.w * this.h; ++pi) {
            this.mineCells[pi].reset();
        }

        for (let mi = 0; mi < this.numOfMine; ++mi) {
            let posIdx = -1;
            do {
                posIdx = Math.floor(Math.random() * this.w * this.h);
            } while (this.mineCells[posIdx].num <= -1);
            this.mineCells[posIdx].num = -1;

            const dx8 = new Array(-1, 0, 1, 1, 1, 0, -1, -1);
            const dy8 = new Array(-1, -1, -1, 0, 1, 1, 1, 0);

            for (let di = 0; di < 8; ++di) {
                const dx = Math.floor(posIdx % this.w) + dy8[di];
                const dy = Math.floor(posIdx / this.w) + dx8[di];
                if (dx < 0 || dx >= this.w || dy < 0 || dy >= this.h) continue;
                if (this.mineCells[dy * this.w + dx].num <= -1) continue;
                ++this.mineCells[dy * this.w + dx].num;
            }
        }
    }

    init(w: number, h: number, numOfMine: number) {
        this.w = w;
        this.h = h;
        this.numOfMine = numOfMine;
        this.mineCells = Array.apply(null, Array(h)).map(() => Array(w));
        this.restCell = w * h - numOfMine;

        this.cellSize = Math.min((this.rectW - w - 1) / w, (this.rectH - h - 1) / h);

        for (let hi = 0; hi < h; ++hi) {
            for (let wi = 0; wi < w; ++wi) {
                this.mineCells[hi * w + wi] = new MineCell(0, 1 + (this.cellSize + 1) * wi, 1 + (this.cellSize + 1) * hi, this.cellSize);
                this.mineCells[hi * w + wi].switchFlag();
            }
        }

        this.setMines();
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (let cell of this.mineCells) {
            cell.draw(ctx);
        }
    }

    open(wi: number, hi: number): boolean {
        if (wi < 0 || wi >= this.w || hi < 0 || hi >= this.h) return true;
        if (this.mineCells[hi * this.w + wi].isOpen()) return true;
        if (this.mineCells[hi * this.w + wi].isFlagged()) return true;
        this.mineCells[hi * this.w + wi].open();
        if (this.mineCells[hi * this.w + wi].num <= -1) return false;
        --this.restCell;
        if (this.mineCells[hi * this.w + wi].num === 0) {
            this.open(wi - 1, hi - 1);
            this.open(wi + 0, hi - 1);
            this.open(wi + 1, hi - 1);
            this.open(wi - 1, hi + 0);
            this.open(wi + 1, hi + 0);
            this.open(wi - 1, hi + 1);
            this.open(wi + 0, hi + 1);
            this.open(wi + 1, hi + 1);
        }
        return true;
    }

    click(x: number, y: number): boolean {
        const wi = Math.floor((x - 1) / (this.cellSize + 1));
        const hi = Math.floor((y - 1) / (this.cellSize + 1));
        return this.open(wi, hi);
    }

    rightClick(x: number, y: number) {
        const wi = Math.floor((x - 1) / (this.cellSize + 1));
        const hi = Math.floor((y - 1) / (this.cellSize + 1));
        if (wi < 0 || wi >= this.w || hi < 0 || hi >= this.h) return;
        this.mineCells[hi * this.w + wi].switchFlag();
    }

    getRestCell(): number {
        return this.restCell;
    }
}

enum Scene {
    WAITING = 'WAITING',
    PLAYING = 'PLAYING',
    FAILED = 'FAILED',
    SUCCEED = 'SUCCEED'
}

class Canvas {
    private readonly cs: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly minesweeper: Minesweeper;
    private scene: Scene;
    private div: HTMLSpanElement;
    private fromDate: Date;
    private elapsed: number;

    constructor(element: HTMLElement, w: number, h:number) {
        // リセットボタンの設定
        let button = document.createElement('button');
        button.textContent = 'Reset';
        button.type = 'button';
        button.onclick = () => {
            this.minesweeper.setMines();
            this.elapsed = 0;
            this.scene = Scene.WAITING;
        };
        element.appendChild(button);

        // 現在の状況テキストの設定
        this.div = document.createElement('div');
        this.div.textContent = 'WAITING';
        element.appendChild(this.div);

        // 経過時間測定系の設定
        this.fromDate = new Date();
        this.elapsed = 0;

        // キャンバスの設定
        this.cs = document.createElement("canvas");
        this.cs.width = w;
        this.cs.height = h;
        element.appendChild(this.cs);
        this.ctx = this.cs.getContext("2d");

        // マインスイーパオブジェクトの設定
        this.minesweeper = new Minesweeper(0, 100, this.cs.width, this.cs.height - 100);
        this.minesweeper.init(15, 15, 35);

        // シーンの設定
        this.scene = Scene.WAITING;

        // クリックイベントの設定
        this.cs.addEventListener('click', (e) => this.onClick(e), false);
        this.cs.addEventListener('contextmenu', (e) => this.onRightClick(e), false);

        // アニメーションさせる
        window.requestAnimationFrame(() => this.render());
    }

    render() {
        this.ctx.clearRect(0, 0, this.cs.width, this.cs.height);
        this.minesweeper.draw(this.ctx);

        // プレイ中なら経過時間更新
        if (this.scene === Scene.PLAYING) {
            this.elapsed = ((new Date()).getTime() - this.fromDate.getTime()) / 1000;
        }

        this.div.textContent = this.scene;
        this.div.textContent += "　　Rest:" + this.minesweeper.getRestCell();
        this.div.textContent += "　　Time:" + this.elapsed;
        window.requestAnimationFrame(() => this.render());
    }

    onClick(e) {
        // プレイ中のみクリック有効
        if (this.scene === Scene.WAITING || this.scene === Scene.PLAYING) {
            // クリック位置の座標(x,y)を取得
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // 最初のクリックだったら必ず通す
            if (this.scene === Scene.WAITING) {
                // 最初にクリックした位置が地雷では無くなるまでループ
                do {
                    if (this.minesweeper.click(x, y)) break;
                    this.minesweeper.setMines();
                } while (true);

                // プレイ開始
                this.scene = Scene.PLAYING;
                this.fromDate = new Date();
            }
            else {
                // 地雷だったら失敗
                if (!this.minesweeper.click(x, y)) {
                    this.scene = Scene.FAILED;
                }
            }
            if (this.minesweeper.getRestCell() === 0) {
                this.scene = Scene.SUCCEED;
            }
        }
    }

    onRightClick(e) {
        // 右クリックメニューを出さない
        e.preventDefault();

        // クリック位置の座標(x,y)を取得
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 旗を切り替える
        this.minesweeper.rightClick(x, y);
    }
}

window.onload = () => {
    new Canvas(document.getElementById('content'), 600, 600);
};