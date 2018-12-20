var MineCell = /** @class */ (function () {
    function MineCell(num, posX, posY, size) {
        this.num = num;
        this.posX = posX;
        this.posY = posY;
        this.size = size;
        this.openFlag = false;
        this.flaggedFlag = false;
    }
    MineCell.prototype.draw = function (ctx) {
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
    };
    MineCell.prototype.open = function () {
        this.openFlag = true;
    };
    MineCell.prototype.switchFlag = function () {
        this.flaggedFlag = !this.flaggedFlag;
    };
    MineCell.prototype.isFlagged = function () {
        return this.flaggedFlag;
    };
    MineCell.prototype.reset = function () {
        this.num = 0;
        this.openFlag = false;
        this.flaggedFlag = false;
    };
    MineCell.prototype.isOpen = function () {
        return this.openFlag;
    };
    MineCell.prototype.isEnd = function () {
        return this.openFlag && this.num < 0;
    };
    return MineCell;
}());
var Minesweeper = /** @class */ (function () {
    function Minesweeper(x, y, w, h) {
        this.rectX = x;
        this.rectY = y;
        this.rectW = w;
        this.rectH = h;
    }
    Minesweeper.prototype.setMines = function () {
        this.restCell = this.w * this.h - this.numOfMine;
        for (var pi = 0; pi < this.w * this.h; ++pi) {
            this.mineCells[pi].reset();
        }
        for (var mi = 0; mi < this.numOfMine; ++mi) {
            var posIdx = -1;
            do {
                posIdx = Math.floor(Math.random() * this.w * this.h);
            } while (this.mineCells[posIdx].num <= -1);
            this.mineCells[posIdx].num = -1;
            var dx8 = new Array(-1, 0, 1, 1, 1, 0, -1, -1);
            var dy8 = new Array(-1, -1, -1, 0, 1, 1, 1, 0);
            for (var di = 0; di < 8; ++di) {
                var dx = Math.floor(posIdx % this.w) + dy8[di];
                var dy = Math.floor(posIdx / this.w) + dx8[di];
                if (dx < 0 || dx >= this.w || dy < 0 || dy >= this.h)
                    continue;
                if (this.mineCells[dy * this.w + dx].num <= -1)
                    continue;
                ++this.mineCells[dy * this.w + dx].num;
            }
        }
    };
    Minesweeper.prototype.init = function (w, h, numOfMine) {
        this.w = w;
        this.h = h;
        this.numOfMine = numOfMine;
        this.mineCells = Array.apply(null, Array(h)).map(function () { return Array(w); });
        this.restCell = w * h - numOfMine;
        this.cellSize = Math.min((this.rectW - w - 1) / w, (this.rectH - h - 1) / h);
        for (var hi = 0; hi < h; ++hi) {
            for (var wi = 0; wi < w; ++wi) {
                this.mineCells[hi * w + wi] = new MineCell(0, 1 + (this.cellSize + 1) * wi, 1 + (this.cellSize + 1) * hi, this.cellSize);
                this.mineCells[hi * w + wi].switchFlag();
            }
        }
        this.setMines();
    };
    Minesweeper.prototype.draw = function (ctx) {
        for (var _i = 0, _a = this.mineCells; _i < _a.length; _i++) {
            var cell = _a[_i];
            cell.draw(ctx);
        }
    };
    Minesweeper.prototype.open = function (wi, hi) {
        if (wi < 0 || wi >= this.w || hi < 0 || hi >= this.h)
            return true;
        if (this.mineCells[hi * this.w + wi].isOpen())
            return true;
        if (this.mineCells[hi * this.w + wi].isFlagged())
            return true;
        this.mineCells[hi * this.w + wi].open();
        if (this.mineCells[hi * this.w + wi].num <= -1)
            return false;
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
    };
    Minesweeper.prototype.click = function (x, y) {
        var wi = Math.floor((x - 1) / (this.cellSize + 1));
        var hi = Math.floor((y - 1) / (this.cellSize + 1));
        return this.open(wi, hi);
    };
    Minesweeper.prototype.rightClick = function (x, y) {
        var wi = Math.floor((x - 1) / (this.cellSize + 1));
        var hi = Math.floor((y - 1) / (this.cellSize + 1));
        if (wi < 0 || wi >= this.w || hi < 0 || hi >= this.h)
            return;
        this.mineCells[hi * this.w + wi].switchFlag();
    };
    Minesweeper.prototype.getRestCell = function () {
        return this.restCell;
    };
    return Minesweeper;
}());
var Scene;
(function (Scene) {
    Scene["WAITING"] = "WAITING";
    Scene["PLAYING"] = "PLAYING";
    Scene["FAILED"] = "FAILED";
    Scene["SUCCEED"] = "SUCCEED";
})(Scene || (Scene = {}));
var Canvas = /** @class */ (function () {
    function Canvas(element, w, h) {
        var _this = this;
        // リセットボタンの設定
        var button = document.createElement('button');
        button.textContent = 'Reset';
        button.type = 'button';
        button.onclick = function () {
            _this.minesweeper.setMines();
            _this.elapsed = 0;
            _this.scene = Scene.WAITING;
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
        this.cs.addEventListener('click', function (e) { return _this.onClick(e); }, false);
        this.cs.addEventListener('contextmenu', function (e) { return _this.onRightClick(e); }, false);
        // アニメーションさせる
        window.requestAnimationFrame(function () { return _this.render(); });
    }
    Canvas.prototype.render = function () {
        var _this = this;
        this.ctx.clearRect(0, 0, this.cs.width, this.cs.height);
        this.minesweeper.draw(this.ctx);
        // プレイ中なら経過時間更新
        if (this.scene === Scene.PLAYING) {
            this.elapsed = ((new Date()).getTime() - this.fromDate.getTime()) / 1000;
        }
        this.div.textContent = this.scene;
        this.div.textContent += "　　Rest:" + this.minesweeper.getRestCell();
        this.div.textContent += "　　Time:" + this.elapsed;
        window.requestAnimationFrame(function () { return _this.render(); });
    };
    Canvas.prototype.onClick = function (e) {
        // プレイ中のみクリック有効
        if (this.scene === Scene.WAITING || this.scene === Scene.PLAYING) {
            // クリック位置の座標(x,y)を取得
            var rect = e.target.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            // 最初のクリックだったら必ず通す
            if (this.scene === Scene.WAITING) {
                // 最初にクリックした位置が地雷では無くなるまでループ
                do {
                    if (this.minesweeper.click(x, y))
                        break;
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
    };
    Canvas.prototype.onRightClick = function (e) {
        // 右クリックメニューを出さない
        e.preventDefault();
        // クリック位置の座標(x,y)を取得
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        // 旗を切り替える
        this.minesweeper.rightClick(x, y);
    };
    return Canvas;
}());
window.onload = function () {
    new Canvas(document.getElementById('content'), 600, 600);
};
//# sourceMappingURL=app.js.map