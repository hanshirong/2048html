
var arr = [];
function $(id) {
    return document.getElementById(id);
}
function C(cls) {
    return document.getElementsByClassName(cls);
}
var obj = {
    ROW: 4,
    CELL: 4,
    r: 0,
    c: 0,
    f: 0, //r�� c�� f���ҵ���һλ��
    keyCd: 0,
    score: 0,
    createEle: 0, //�Ƿ���Ҫ����Ԫ��
    eleFragment: "", //�ĵ�Ƭ�α���
    //��Ϸ��ʼ
    gameStart: function () {
        obj.init();
        document.onkeydown = function (e) { //�Զ�����¼�����
            switch (e.keyCode) { //�жϰ�����
                case 37:
                    obj.keyCd = 1;
                    obj.moveLeft();
                    break;
                case 38:
                    obj.keyCd = 2;
                    obj.moveUp();
                    break;
                case 39:
                    obj.keyCd = 1;
                    obj.moveRight();
                    break;
                case 40:
                    obj.keyCd = 2;
                    obj.moveDown();
                    break;
            }
            $("score").innerHTML = obj.score; //���·���
        }
    },
    //��ʼ��
    init: function () {
        obj.eleFragment = document.createDocumentFragment();
        for (r = 0; r < obj.ROW; r++) {
            arr.push([]);
            for (c = 0; c < obj.CELL; c++) {
                arr[r][c] = 0;
                if (obj.createEle == 1) {
                    obj.create(r, c);
                }
            }
        }
        if (obj.createEle == 1) {
            obj.createEle = 0;
            $("gridPanel").innerHTML = ""; //���ԭ�е�Ԫ��
            $("gridPanel").appendChild(obj.eleFragment); //���Ԫ��
        }
        obj.score = 0;
        $("score").innerHTML = obj.score;
        $("game").style.display = "none";
        $("gameover").style.display = "none";
        obj.random(); //��ʼ��Ϸ�������������
        obj.random();
        obj.updateView();
    },
    //����divԪ�أ���ӵ�gridPanel��
    create: function (r, c) {
        var grid, cell;
        var increment = 14,
            grWidth, grHeight, grMarginTop, grMarginLeft, ceWidth, ceHight;
        grid = document.createElement("div");
        cell = document.createElement("div");
        grid.id = "g" + r + c;
        grid.className = "grid";
        cell.id = "c" + r + c;
        cell.className = "cell";

        if (obj.ROW == 3) {
            increment = 24;
        } else if (obj.ROW == 4) {
            increment = 18;
        }
        grWidth = grHeight = ceWidth = ceHight = 66 + (6 - obj.ROW) * increment; //�Ż���
        grMarginTop = grMarginLeft = (480 - grWidth * obj.ROW) / (obj.ROW + 1);
        grid.style.width = grWidth + "px";
        grid.style.height = grHeight + "px";
        grid.style.marginTop = grMarginTop + "px";
        grid.style.marginLeft = grMarginLeft + "px";
        cell.style.width = ceWidth + "px";
        cell.style.height = ceHight + "px";
        cell.style.top = grMarginTop + r * (grMarginTop + ceWidth) + "px";
        cell.style.left = grMarginLeft + c * (grMarginLeft + ceHight) + "px";
        cell.style.lineHeight = ceHight + "px";
        cell.style.fontSize = 30 + (6 - obj.ROW) * 10 + "px";
        obj.eleFragment.appendChild(grid);
        obj.eleFragment.appendChild(cell);
    },
    //�������һ���µ���
    random: function () {
        while (1) {
            var row = Math.floor(Math.random() * obj.ROW);
            var cell = Math.floor(Math.random() * obj.CELL);
            if (arr[row][cell] == 0) { //�ж����ɵ������λ��Ϊ0���������2��4
                arr[row][cell] = (Math.random() > 0.5) ? 4 : 2;
                break;
            }
        }

    },
    //����ҳ��
    updateView: function () {
        var win = 0;
        for (r = 0; r < obj.ROW; r++) {
            for (c = 0; c < obj.CELL; c++) {
                if (arr[r][c] == 0) { //ֵΪ0�Ĳ���ʾ
                    $("c" + r + c).innerHTML = ""; //0����ʾ
                    $("c" + r + c).className = "cell" //�����ʽ
                } else {
                    $("c" + r + c).innerHTML = arr[r][c];
                    $("c" + r + c).className = "cell n" + arr[r][c]; //��Ӳ�ͬ���ֵ���ɫ
                    if (obj.ROW == 3 && arr[r][c] == 1024) {
                        win = 1;
                    } else if (obj.ROW == 4 && arr[r][c] == 2048) {
                        win = 1;
                    } else if (obj.ROW == 5 && arr[r][c] == 4096) {
                        win = 1;
                    } else if (obj.ROW == 6 && arr[r][c] == 8192) {
                        win = 1;
                    }
                }
            }
        }
        if (win == 1) { //ͨ��
            $("game").style.display = "block";
            $("gameover").style.display = "block";
            $("Score").innerHTML = "You win!<br>Score:" + obj.score;
        }
        if (obj.isGameOver()) { //��Ϸʧ��
            $("game").style.display = "block";
            $("gameover").style.display = "block";
            $("Score").innerHTML = "GAME OVER!<br>Score:" + obj.score;
            console.log("gameover");
        }
    },
    //��Ϸʧ��
    isGameOver: function () {
        for (r = 0; r < obj.ROW; r++) {
            for (c = 0; c < obj.CELL; c++) {
                if (arr[r][c] == 0) { //��0������gameover
                    return false;
                } else if (c != obj.CELL - 1 && arr[r][c] == arr[r][c + 1]) { //������ ǰһ������һ�������
                    return false;
                } else if (r != obj.ROW - 1 && arr[r][c] == arr[r + 1][c]) { //������ ��һ������һ�������
                    return false;
                }
            }
        }
        return true;
    },
    //������һ����Ϊ0����ֵ��λ��
    find: function (r, c, start, condition, direction) {
        if (obj.keyCd == 2) { //���°���
            if (direction == 1) { //���ϰ��� f++
                for (var f = start; f < condition; f += direction) {
                    if (arr[f][c] != 0) {
                        return f;
                    }
                }
            } else { //���°��� f--
                for (var f = start; f >= condition; f += direction) {
                    if (arr[f][c] != 0) {
                        return f;
                    }
                }
            }
        } else { //���Ұ���
            if (direction == 1) { //�󰴼� f++
                for (var f = start; f < condition; f += direction) {
                    if (arr[r][f] != 0) {
                        return f;
                    }
                }
            } else { //�Ұ��� f--
                for (var f = start; f >= condition; f += direction) {
                    if (arr[r][f] != 0) {
                        return f;
                    }
                }
            }
        }
        return null; //ѭ��������Ȼû���ҵ���=0����ֵ������null
    },
    //�󰴼��Ĵ���
    dealToLeft: function (r) {
        var next;
        for (c = 0; c < obj.ROW; c++) {
            next = obj.find(r, c, c + 1, obj.CELL, 1); //�ҳ���һ����Ϊ0��λ��
            if (next == null) break; //û���ҵ��ͷ���
            //�����ǰλ��Ϊ0
            if (arr[r][c] == 0) {
                arr[r][c] = arr[r][next]; //���ҵ��Ĳ�Ϊ0����ֵ�滻Ϊ��ǰλ�õ�ֵ
                arr[r][next] = 0; //�ҵ���λ����0
                c--; //�ٴ�ѭ����һ�Σ��鿴�������ֵ���滻���ֵ��ͬ��
            } else if (arr[r][c] == arr[r][next]) { //�����ǰλ�����ҵ���λ����ֵ��ȣ������
                arr[r][c] *= 2;
                arr[r][next] = 0;
                obj.score += arr[r][c];
            }
        }
    },
    move: function (itertor) {
        var before, //û����ǰ
            after; //after�����
        before = arr.toString();
        itertor(); //ִ��for����
        after = arr.toString();
        if (before != after) { //ǰ��Աȣ������ͬ��update
            obj.random();
            obj.updateView();
        }
    },
    moveLeft: function () {
        obj.move(function () {
            for (r = 0; r < obj.ROW; r++) {
                obj.dealToLeft(r);
            }
        })

    },
    //�Ұ�������
    dealToRight: function (r) {
        var next;
        for (c = obj.CELL - 1; c >= 0; c--) {
            next = obj.find(r, c, c - 1, 0, -1); //�ҳ���һ����Ϊ0��λ��
            if (next == null) break; //û���ҵ��ͷ���
            //�����ǰλ��Ϊ0
            if (arr[r][c] == 0) {
                arr[r][c] = arr[r][next]; //���ҵ��Ĳ�Ϊ0����ֵ�滻Ϊ��ǰλ�õ�ֵ
                arr[r][next] = 0; //�ҵ���λ����0
                c++; //�ٴ�ѭ����һ�Σ��鿴�������ֵ���滻���ֵ��ͬ��
            } else if (arr[r][c] == arr[r][next]) { //�����ǰλ�����ҵ���λ����ֵ��ȣ������
                arr[r][c] *= 2;
                arr[r][next] = 0;
                obj.score += arr[r][c];
            }
        }
    },
    moveRight: function () {
        obj.move(function () {
            for (r = 0; r < obj.ROW; r++) {
                obj.dealToRight(r);
            }
        })
    },
    //�ϰ�������
    dealToUp: function (c) {
        var next;
        for (r = 0; r < obj.ROW; r++) {
            next = obj.find(r, c, r + 1, obj.ROW, 1); //�ҳ���һ����Ϊ0��λ��
            if (next == null) break;
            //�����ǰλ��Ϊ0
            if (arr[r][c] == 0) {
                arr[r][c] = arr[next][c]; //���ҵ��Ĳ�Ϊ0����ֵ�滻Ϊ��ǰλ�õ�ֵ
                arr[next][c] = 0; //�ҵ���λ����0
                r--; //�ٴ�ѭ����һ�Σ��鿴�������ֵ���滻���ֵ��ͬ
            } else if (arr[r][c] == arr[next][c]) { //�����ǰλ�����ҵ���λ����ֵ��ȣ������
                arr[r][c] *= 2;
                arr[next][c] = 0;
                obj.score += arr[r][c];
            }
        }
    },
    moveUp: function () {
        obj.move(function () {
            for (c = 0; c < obj.CELL; c++) {
                obj.dealToUp(c);
            }
        })
    },
    //�°�������
    dealToDown: function (c) {
        var next;
        for (r = obj.ROW - 1; r >= 0; r--) {
            next = obj.find(r, c, r - 1, 0, -1); //�ҳ���һ����Ϊ0��λ��
            if (next == null) {
                break;
            }
            //�����ǰλ��Ϊ0
            if (arr[r][c] == 0) {
                arr[r][c] = arr[next][c]; //���ҵ��Ĳ�Ϊ0����ֵ�滻Ϊ��ǰλ�õ�ֵ
                arr[next][c] = 0; //�ҵ���λ����0
                r++; //�ٴ�ѭ����һ�Σ��鿴�������ֵ���滻���ֵ��ͬ
            } else if (arr[r][c] == arr[next][c]) { //�����ǰλ�����ҵ���λ����ֵ��ȣ������
                arr[r][c] *= 2;
                arr[next][c] = 0;
                obj.score += arr[r][c];
            }
        }
    },
    moveDown: function () {
        obj.move(function () {
            for (c = 0; c < obj.CELL; c++) {
                obj.dealToDown(c);
            }
        })
    }
}
window.onload = function () {
    obj.createEle = 1;
    obj.gameStart();
}
//�л�ģʽ
function getModel(e) { //�¼�ð�ݻ�ȡaԪ��
    var a = e.target,
        modelValue = 4;
    obj.ROW = obj.CELL = modelValue;
    obj.createEle = 1; //��Ҫ��������divԪ�صı�־
    obj.gameStart();
}
