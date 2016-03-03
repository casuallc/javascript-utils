var CC = {};

(function() {
    var cSort = function() {
        this.sortList = {};
        this.clickTaskId;

        this.curTask = 0; // 1 click, 2 dblclick

        this.sortFunc = function(){};
        this.curOrder = 1;
    };

    var Field = function(field, order) {
        this.field = field;
        this.sort = 0; // 0 asc, 1 desc
        this.order = order;
        this.lock = 0; // 0 unlock, 1 lock
        this.sortImg = "";
        this.lockImg = "";
    };

    cSort.prototype = {
        sortImg : [],
        lockImg : [],
        delay : 500,
        click : function(field, str) {
            var sort = this;
            if ("db" == str) {
                sort.dbclick(field);
            } else {
                sort.clickTaskId = setTimeout(function() {
                    // 有正在执行的排序
                    if(sort.curTask != 0)
                        return;

                    var o = sort.sortList[field];
                    // lock状态
                    if(o.lock == 1)
                        return;

                    sort.curTask = 1;
                    o.sort = 1 - o.sort;
                    //o.lockImg = cSort.sortImg[o.sort];
                    sort.sortFunc();
                    o.order = sort.curOrder ++;
                    sort.curTask = 0;

                }, cSort.delay);
            }
        },

        dbclick : function(field) {
            var sort = this;
            if(sort.curTask != 0)
                return;

            clearTimeout(sort.clickTaskId);
            sort.curTask = 2;
            var o = sort.sortList[field];
            o.lock = 1 - o.lock;
        //  o.lockImg = cSort.lockImg[o.lock];
            // 执行排序
            sort.sortFunc();
            o.order = sort.curOrder ++;
            sort.curTask = 0;
        },

        add : function(field, order) {
            var obj = new Field(field, order);
            this.sortList[field] = obj;
            return this;
        },

        addDone : function() {
            for(key in this.sortList) {
                this.curOrder ++;
            }
        },

        setSortFunc : function(func) {
            this.sortFunc = func;
        },

        getSortResult : function() {
            var list = this.sortList;
            var result = "";
            var lastMax = 999999;
            var temp;
            var temp2;
            // 遍历list.length的次数，每次取出剩余中order最大的
            for(key in list) {
                // 初始化order为最小值
                temp = new Field("-1", "-1");
                // 依次和list中的元素比较，如果list中的元素的order值小于lastMax（上一次取出的最大值），则赋给temp
                for(key2 in list) {
                    temp2 = list[key2].order;
                    if(temp2 < lastMax && temp2 > temp.order)
                        temp = list[key2];
                }
                // temp是剩余中order最大的元素
                lastMax = temp.order;
                // 设置返回的字符串格式
                result += temp.field + "," + temp.order + "," + temp.lock + ";";
            }
            return result;
        }
    }

    // ba yin yong gei wai bu bian liang
    CC.initSort = function(v) {
        return new cSort();
    }

})();

function cprint(info) {
    console.log(info);
}

function demo() {
    //<a id="11" onclick="CSORT.click('11')" ondblclick="CSORT.click('11', 'db')">11</a>
    var CSORT = CC.initSort(); 
    CSORT.add("11", 1).add("22", 2).add("33", 3).addDone();
    CSORT.setSortFunc(function(){});

    CSORT.getSortResult(); // 格式：field,order,lock;
}
