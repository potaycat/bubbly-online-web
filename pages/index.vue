<template>
    <div>
        <section class="first-impression">
            <header>
                <div class="wavy"/>
            </header>
            <h1 class="title">
                Hello!
            </h1>
            <h2 class="subtitle">
                You're at 
                <strong><img class="inline-logo" src="~assets/logo.png">Bubbly</strong>
            </h2>
            <div class="links">
                <Button class="auth-form__btn" style="margin-right:10px"
                    text="Login" @clicked="$router.push('/auth/login')" />
                <Button class="auth-form__btn" 
                    text="Register" @clicked="$router.push('/auth/register')" fill />
            </div>
        </section>
        <section class="about">
            YAAAA
        </section>
    </div>
</template>

<script>
import Button from '@/components/misc/Button'
export default {
    layout: 'blank',
    components: {Button},
}
</script>

<style>
.first-impression {
    margin: 0 auto;
    min-height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.wavy {
    background: linear-gradient(60deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    position: absolute;
    top: 0;
    transform:translateX(-50%);
    overflow: hidden;
    height: 120px;
    width: calc(100vw - 10px);
    border-radius: 20px;
    border-bottom-left-radius: 50% 20%;
    border-bottom-right-radius: 50% 20%;
}

.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 75px;
    color: #35495e;
    letter-spacing: 1px;
}
.subtitle {
    font-weight: 300;
    font-size: 36px;
    word-spacing: 0;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.subtitle > strong {
    display: flex;
    align-items: center;
}
.inline-logo {
    width: 40px;
    height: 40px;
    margin-left: 16px;
    margin-right: 4px;
}
.links {
    padding-top: 15px;
    width: 100%;
    display: flex;
    justify-content: center;
}

.about {
    /* position: relative; */
}
.wavy.about {
background: #ee55a4;
    top: unset;
    left: 0;
    right: 0;
    border-radius: 0;
}
</style>
