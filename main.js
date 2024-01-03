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

            this.noticeCoords = {
                x: evt.clientX - left,
                y: evt.clientY - top,
            }

        })

        this.notice.addEventListener('touchstart', (evt) => {

            this.isFocused = true;
            console.log(this.isFocused)
            const { top, left } = evt.target.getBoundingClientRect();
            console.log(top)
            console.log(left)
            console.log(evt.changedTouches[0].clientX)

            this.noticeCoords = {
                x: evt.changedTouches[0].clientX - left,
                y: evt.changedTouches[0].clientY - top,
            }
            console.log(this.noticeCoords)
        })

        document.addEventListener('mouseup', (evt) => {
            this.isFocused = false;

        })

        document.addEventListener('touchend', (evt) => {
            this.isFocused = false;
            console.log(this.isFocused)
        })

        document.addEventListener('mousemove', (evt) => {
            if (this.isFocused) {

                const { x, y } = this.noticeCoords;
                console.log(this.noticeCoords)
                console.log(x)
                console.log(y)
                this.notice.style.top = `${evt.clientY - y}px`
                this.notice.style.left = `${evt.clientX - x}px`

            }
        })

        document.addEventListener('touchmove', (evt) => {
            if (this.isFocused) {
                const { x, y } = this.noticeCoords;
                // console.log(x)
                // console.log(y)
                this.notice.style.top = `${evt.changedTouches[0].clientY  - y}px`
                this.notice.style.left = `${evt.changedTouches[0].clientX  - x}px`
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