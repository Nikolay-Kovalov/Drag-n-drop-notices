// const noticeList = document.querySelector('.notice-item');
const addNoticeBtn = document.querySelector('.add-notice');
const mainContainer = document.querySelector('.main');


let isFocused = false;
let noticeCoords = null;
let id = 1;

class Notice {

    static counter = -180;

    constructor(notice, noticeCoords, isFocused) {
        this.isFocused = isFocused;
        this.notice = document.createElement(notice);
        this.noticeCoords = noticeCoords;
        this.count()
        this.addNewTask();
    }

    addNewTask() {
        // this.notice.style.top = `${Notice.counter}px`;
        this.notice.style.left = `${Notice.counter}px`;

    }

    addEventListeners() {
        this.notice.addEventListener('mousedown', (evt) => {
            this.isFocused = true;
            const { top, left } = evt.target.getBoundingClientRect();
            console.log(evt)
            this.noticeCoords = {
                x: evt.clientX - left,
                y: evt.clientY - top,
            }
        })

        this.notice.addEventListener('touchstart', (evt) => {
            alert('Hello')
            this.isFocused = true;
            const { top, left } = evt.target.getBoundingClientRect();
            console.log(evt)
            this.noticeCoords = {
                x: evt.clientX - left,
                y: evt.clientY - top,
            }
        })

        document.addEventListener('mouseup', (evt) => {
            this.isFocused = false;
        })

        document.addEventListener('touchend', (evt) => {
            this.isFocused = false;
        })

        document.addEventListener('mousemove', (evt) => {
            if (this.isFocused) {
                const { x, y } = this.noticeCoords;
                this.notice.style.top = `${evt.clientY - y}px`
                this.notice.style.left = `${evt.clientX - x}px`
            }
        })

        document.addEventListener('touchmove', (evt) => {
            if (this.isFocused) {
                const { x, y } = this.noticeCoords;
                this.notice.style.top = `${evt.clientY - y}px`
                this.notice.style.left = `${evt.clientX - x}px`
            }
        })
    }



    count() {
        Notice.counter += 200;
        console.log(Notice.counter)
    }

}

addNoticeBtn.addEventListener('click', addNotice);


function addNotice() {
    const notice = new Notice('div', null, false);
    notice.addEventListeners();
    notice.notice.classList.add('notice-item');
    notice.notice.dataset.id = id;
    id += 1;
    mainContainer.appendChild(notice.notice);
}