<template>
    <div class="cards-wrapper">
        <CommunityInfo :community="community" />

        <PostCard
            v-for="post in posts"
            :key="post.id"
            :show_user="true"
            :id="post.id"
            :slug="post.slug"
            :timestamp="post.timestamp"
            :title="post.title"
            :author="post.author"
            :link="post.link2author"
            :previewText="post.preview_text"
            :photos="post.pics"
            :community="post.allocated_to"
        />
    </div>
</template>

<script>
import PostCard from "@/components/post/PostCard";
import CommunityInfo from "@/components/community/CommunityInfo";
import MembersBlock from "@/components/community/MembersBlock";
export default {
    layout: "immerse",
    components: {
        CommunityInfo,
        PostCard,
        MembersBlock
    },

    async asyncData({ $axios, params }) {
        let communityInfoRes = await $axios.$get(
            `/communities/${params.name}/?format=json`
        );
        // let communityPostsRes = await $axios.$get(`/posts/feed?format=json&community=${communityInfoRes.id}`)

        return {
            community: communityInfoRes
            // posts: communityPostsRes
        };
    },
    head: {
        title: "Cộng đồng trên this"
    }
};
</script>

<style>
</style>
