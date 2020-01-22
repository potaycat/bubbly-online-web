<template>
<transition name="fade" appear >
    <div class="total_darkness no-bg" @click.self="$emit('close')">
        <!-- TODO refactor transition tags -->
        <transition name="zoom_from_click" appear @enter="enter" >
            <div class="prfl-peak shiny-white-bg box-shadow-3" ref="drpdwn">
                <img class="pfp" :src="profile.profile_pic" />
                <div class="prfl-peak__name" >{{ profile.alias }}</div>
                <div class="prfl-peak__cmd">
                    <Button class="prfl-peak__cmd__btn" :colorScnd="'#'+profile.fave_color"
                        text="To profile" @clicked="$router.push(`/user/${profile.username}`)" fill/>
                        
                    <Button v-if="!isSelf" class="prfl-peak__cmd__btn"
                        :colorScnd="'#'+profile.fave_color" text="Private chat" @clicked="confirmToPrivate" />
                    <Button v-if="!isSelf&&!isPublic" class="prfl-peak__cmd__btn"
                        :colorScnd="'#'+profile.fave_color" text="Kick" @clicked="kick" />
                    <Button v-if="profile.is_admin==false && !isSelf && !isPublic" class="prfl-peak__cmd__btn"
                        :colorScnd="'#'+profile.fave_color" text="Promote to admin" @clicked="promote"/>
                </div>
            </div>
        </transition>
    </div>
</transition>
</template>

<script>
import Button from '@/components/misc/Button'
import { performToPrivate } from '@/mixins/performFollow'
import { child } from '@/mixins/fancyTransition/zoom_from_click'

export default {
    components: { Button },
    mixins: [ performToPrivate, child ],
    props: ['profile', 'threadInfo'],
    computed: {
        isAdmin() {
            return this.threadInfo.roommate_info.is_admin
        },
        isSelf() {
            return this.profile.username == this.$store.state.auth.my_profile.username
        },
        isPublic() {
            return this.threadInfo.room_type == "public"
        }
    },
    methods: {
        promote() {
            this.loading = true
            this.$axios.patch(`chat/${this.threadInfo.id}/roommates/${this.profile.username}`,
                {"is_admin": true},
                this.$store.state.auth.head
            )
                .then(res => {
                    this.$emit('close', true)
                })
        },
        kick() {
            this.loading = true
            this.$axios.delete(`chat/${this.threadInfo.id}/roommates/${this.profile.username}`,
                this.$store.state.auth.head
            )
                .then(res => {
                    this.$emit('close', true)
                })
                .catch(err => {
                    this.$emit('close')
                })
        }
    },
}
</script>

<style>
.prfl-peak {
    /* width: 300px;
    height: 200px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin: 0 9%;
    border-radius: 20px;
}

.prfl-peak .pfp {
    width: 90px;
    height: 90px;
    margin-top: -40px;
    border: 3px solid rgb(253, 247, 247);
}
.prfl-peak .prfl-peak__name {
    font-weight: bold;
    font-size: 20px;
    margin: 2px 0;
}

.prfl-peak__cmd {
    display: flex;
    flex-wrap: wrap;
    margin: 15px 0 2px;
    justify-content: center;
}
.prfl-peak__cmd__btn{
    /* width: 140px; */
    margin: 3px 8px;
}
</style>
