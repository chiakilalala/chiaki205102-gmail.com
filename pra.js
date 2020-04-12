var app = new Vue({
    el: '#app',
    data: {
        newTodo: '', //使用者新輸入的事項
        startDate: '', //使用者新輸入的日期
        startTime: '', //使用者新輸入的時間
        comment: '', //使用者新輸入的評論
        completed: false,
        seen: true, //第一個輸入匡狀態按了可編緝
        isFile: false,
        addState: false, //第一個輸入匡狀態按了可編緝
        starState: false, //星星狀態
        //在此all是預設值，指全部的頁面會切換showType的狀態，即：全部(all) /進行中(active) /已完成（finished），而class是否會增加active標籤則視visibility的狀態而定。
        // 暫存編輯陣列與標題暫存區 ＆＆＆＆用來預存要編輯的物件及該物件的文字：
        clickNum: -1, //預設點擊區位置   
        catchTodo: {},
        cacheTitle: '',
        catchStartDate: '',
        catchstartTime: '',
        catchStarState: false,
        catchComment: '',
        todos: [{
                id: '345',
                title: '你好',
                completed: false,
                starState: false,
                editState: false,
                startDate: '2020-04-11',
                startTime: '05:15',
                isFile: false,
                comment: '今天完成',
                btndisabled: true
            },
            {
                title: 'go shopping',
                starState: false,
                editState: false,
                startDate: '2020-04-11',
                startTime: '05:15',
                comment: 'hi',
                btndisabled: true
            },
            {
                title: 'go swiming',
                starState: false,
                editState: false,
                startDate: '2020-04-10',
                startTime: '04:15',
                comment: 'hola',
                btndisabled: true
            },
        ],
        showType: 'all'

    },
    methods: {
        addStateActive() {
            this.addState = !this.addState;
            this.seen = false;
        },
        addTask() {
            this.seen = false;
        },
        //task取消按鈕
        cancelBtn() {
            this.seen = true;
            this.reset(); //全部消除
        },
        addTodo() {
            var value = this.newTodo;
            var timestamp = Math.floor(Date.now()); //抓取時間命名id
            var startDate = this.startDate;
            var startTime = this.startTime;
            var comment = this.comment;
            console.log(value, timestamp);
            // 防呆機制
            if (value == '') {
                alert('輸入主題');
            } else if (startDate == ' ' || startTime == '') {
                alert('輸入時間');
            } else {
                this.todos.push({
                    id: timestamp,
                    title: value,
                    completed: false,
                    starState: false,
                    editState: false,
                    startDate: startDate,
                    startTime: startTime,
                    isFile: false,
                    comment: comment,
                    btndisabled: true


                });
                this.reset();
            }
        },
        starActive(index) {
            this.todos[index].starState = !this.todos[index].starState;
        },
        editCheck(todo, index) { ////法1：從todos[]抓出和task.id一樣的item.id的位置，並進行edit
            this.todos[index].editState = !this.todos[index].editState;
            this.todos[index].btndisabled = !this.todos[index].btndisabled;
            if (this.clickNum == index) {
                clickNum = -1;
            } else {
                this.clickNum = index;
            }
            //放入暫存地點 用來預存要編輯的物件及該物件的文字：
            this.catchTodo = todo;
            this.catchTitle = todo.title;
            this.catchStartDate = todo.startDate;
            this.catchstartTime = todo.startTime;
            this.catchStarState = todo.starState;
            this.catchComment = todo.comment;
        },

        saveData(index) {
            this.todos[index].editState = !this.todos[index].editState;
            this.todos[index].btndisabled = !this.todos[index].btndisabled;
        },
        cancelEdit(todo, index) {
            this.todos[index].editState = !this.todos[index].editState;
            this.todos[index].btndisabled = !this.todos[index].btndisabled;
            todo.title = this.catchTitle;
            todo.startDate = this.catchStartState;
            todo.startTime = this.catchstartTime;
            todo.starState = this.catchStarState;
            todo.comment = this.catchComment;
            // 切換到原始時的狀態
            this.cacheTodo = {};
        },
        reset: function() {
            return this.startDate = '',
                this.endDate = '',
                this.startTime = '',
                this.newTodo = '',
                this.addState = false
        },
        removeTodo(item) {
            var vm = this;
            var newIndex = vm.todos.findIndex(function(todo, key) {
                // 這裡的 todo 指的是 todos 裡的元素
                return item.id === todo.id;
            });
            vm.todos.splice(newIndex, 1)
        }
        /*因為不同頁籤就是內容不同的陣列，因此其他頁籤的待辦事項索引值
        會跟在原始陣列 todos 不同，透過修正 removeTodo() 的程式碼，
        去比對在不同頁籤中的待辦事項 id 是否相同，如果 id 相同，
        就回傳它在原始陣列 todos 的索引值，統一從 todos 裡刪除，這樣才不會刪錯。 */


    },
    computed: { //使用computed回傳呈現畫面資料（因為不會進行修改），並修改 v-for的陣列對象
        filter: function() {
            var newTodos = [];
            switch (this.showType) { //要判斷的東西
                case 'InProgress': //條件
                    newTodos = this.todos.filter(function(item) {
                        return !item.completed; //false
                        //過濾出false的item,return到newsTodos
                    });
                    return newTodos
                    break;
                case 'Completed':
                    newTodos = this.todos.filter(function(item) {
                        return item.completed; //true
                        //過濾出true的item,return到newsTodos
                    });
                    return newTodos
                    break;
                case 'all':
                    return this.todos;
                    break;
            }
        }
    }

    // 在 computed 新增方法，目的是計算 todos.completed 為 false 的數量
    // 用 filter() 過濾 todos
    // 取得一個未完成任務組成的陣列
    // 用 compute 方法 return 這個陣列的長度
    // 在 HTML 中用雙花括號插入 compute 方法名

})