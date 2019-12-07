export const child = {
    props: ['touchPos'],
    methods: {
        enter( element ) {
            // https://www.bennadel.com/blog/3559-animating-elements-in-from-a-mouse-event-location-in-vue-js-2-5-21.htm
            const rect = element.getBoundingClientRect();
            const deltaX = ( this.touchPos.x - rect.left - ( rect.width / 2 ) );
            const deltaY = ( this.touchPos.y - rect.top - ( rect.height / 2 ) );
            
            element.style.transform = `scale(0.5) translate(${deltaX}px, ${deltaY}px)`;
            element.style.transition = "none";
            this.__force_paint__ = document.body.offsetHeight;
            element.style = null;
        },
        
    },
}

export const parent = {
    data:() => ({
        touchPos: null,
    }),
    methods: {
        popItUp(evt) {
            this.touchPos = {
                x: evt.clientX || 20,
                y: evt.clientY || 20
            }
        },
    }
}