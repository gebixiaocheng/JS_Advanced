var that;
class Tab {
    constructor(id) {
            that = this;
            this.main = document.querySelector(id);

            // 获取添加按钮的元素
            this.add = this.main.querySelector(".tabadd");
            // 获取li的父元素
            this.ul = this.main.querySelector(".fisrstnav ul:first-child");
            // 获取section的父元素
            this.fsection = this.main.querySelector(".tabscon");
            this.init();
        }
        // 初始化操作，让相关的元素绑定事件
    init() {
            this.updateNode();
            // 为+绑定添加事件
            this.add.onclick = this.addTab;
            // 为li绑定切换事件
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab;
                this.guanbis[i].index = i;
                this.guanbis[i].onclick = this.deleteTab;
                // 绑定双击事件
                this.spans[i].ondblclick = this.editTab;
            }
            // 为关闭按钮绑定关闭事件，简化为上诉操作
            // for (var i = 0; i < this.guanbis.length; i++) {
            //     this.guanbis[i].index = i;
            //     this.guanbis[i].onclick = this.deleteTab;
            // }
        }
        // 重新获取lis和sections
    updateNode() {
            this.lis = this.main.querySelectorAll("li");
            this.sections = this.main.querySelectorAll("section");
            // 获取所有的关闭元素
            this.guanbis = this.main.querySelectorAll(".icon-guanbi");

            this.spans = this.main.querySelectorAll('fisrstnav li span:first-child')
        }
        // 切换功能
    toggleTab() {
            // 该函数的调用者为li,所以函数内部的this指向的都是li元素，clearClass函数是实例对象的函数，所有只能通过that调用
            that.clearClass();
            // 普通函数中的this指向的是调用者，该调用者是li元素，所有可以通过this.index获取到值
            console.log("tab" + this.index);
            this.className = "liactive";
            that.sections[this.index].className = "conactive";
            // console.log(document.querySelector(".conactive"));
        }
        //清除所有样式
    clearClass() {
            // 由上面可知，调用该函数的为实例对象，则此时的this指向的就是该实例对象,所有应该用this.lis.length
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = "";
                this.sections[i].className = "";
            }
        }
        // 添加功能
    addTab() {
            that.clearClass();
            // 添加tab和section
            var random = Math.random();
            var newTab =
                '<li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>';
            var newSection = `<section class="conactive">测试${random}</section>`;
            that.ul.insertAdjacentHTML("beforeend", newTab);
            that.fsection.insertAdjacentHTML("beforeend", newSection);

            // 重新获取lis和sections元素，并绑定事件
            that.init();
        }
        // 删除功能
    deleteTab(e) {
        // 由于父元素绑定了切换事件，所有应该阻止冒泡
        e.stopPropagation();
        console.log("delete" + this.index);
        var index = this.index;
        // 删除对应的li和section和guanbi
        that.lis[index].remove();
        that.sections[index].remove();
        that.guanbis[index].remove();

        // 若删除的是当前元素，则if判断为空，然后继续后面的操作，会自动切换至上一个元素
        // 若删除的不是当前元素，则if判断为真，则不会切换至上一个元素
        if (document.querySelector(".conactive")) {
            that.init();
            return;
        }

        // 若删除的是第一个元素，则会选择第二个元素，且只有第二个元素存在时，才进行操作
        // 若删除的不是第一个元素，则会选择上一个元素
        index === 0 ?
            that.lis[1] && that.lis[1].click() :
            that.lis[--index].click();

        // 删除后重新初始化
        that.init();
    }
    editTab() {
        alert(22)
    }
}
var tab = new Tab("#tab");