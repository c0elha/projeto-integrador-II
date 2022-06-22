class Loading {
    constructor() {
        this.body = document.getElementsByTagName('body')[0];
    }

    hide() {
        this.body.classList.remove('loading');
    }

    show() {
        this.body.classList.add('loading');
    }
}
export default Loading;