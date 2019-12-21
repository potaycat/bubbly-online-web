export const textareaAutoResize = {
    mounted() {
        const txA = document.getElementsByTagName('textarea');
        for (let i = 0; i < txA.length; i++) {
            txA[i].setAttribute('style', 'height:' + (txA[i].scrollHeight) + 'px');
            txA[i].addEventListener("input", OnInput, false);
        }
        function OnInput() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        }
    }
}

export const loggedInRedirect = {
    beforeCreate() {
        if (this.$store.state.auth.my_profile) {
            this.$router.push('/home')
        }
    }
}