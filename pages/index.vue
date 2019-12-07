<template>
    <section class="container">
        <h1 class="title">
            Hewwo
        </h1>
        <h2 class="subtitle">
            You're at: Bubbly
        </h2>
        <div class="links">
            <Button class="form-btn" style="margin-right:10px"
                text="Login" @clicked="$router.push('/auth/login')" />
            <Button class="form-btn" 
                text="Register" @clicked="$router.push('/auth/register')" fill />
        </div>
    </section>
</template>

<script>
import Button from '@/components/misc/Button'
export default {
    layout: 'blank',
    components: {Button},
}
</script>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>
