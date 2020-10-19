<template>
<div class="btn-link">
    <button v-if="link" @click="visitRoute" :class="['solar-button', { 'full-width': isFullWidth }]" type="button">
        <slot></slot>
    </button>

    <button v-else @click="onClick" :class="['solar-button', { 'full-width': isFullWidth }]" type="button">
        <slot></slot>
    </button>
</div>
</template>

<script lang="ts">
import {
    defineComponent
} from "vue";

export default defineComponent({
    name: "SolarButton",
    components: {},
    props: {
        link: String,
        isFullWidth: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        visitRoute() {
            this.$router.push(this.$props.link!);
        },
        onClick() {
            this.$emit('button:click')
        }
    },
});
</script>

<style lang="scss" scoped>
@import "@/scss/global.scss";

.solar-button {
    background: lighten($solar-blue, $amount: 10%);
    color: white;
    padding: 0.8rem;
    transition: background-color 0.5s;
    margin: 0.3rem 0.2rem;
    display: inline-block;
    cursor: pointer;
    font-size: 1rem;
    min-width: 100px;
    border: none;
    border-bottom: 2px solid darken($color: $solar-blue, $amount: 20%);
    border-radius: 3px;

    &:hover {
        background: lighten($color: $solar-blue, $amount: 20%);
        transition: background-color 0.5s;
    }

    &:disabled {
        background: lighten($color: $solar-blue, $amount: 15%);
        border-bottom: 2px solid lighten($color: $solar-blue, $amount: 20%);
    }

    &:active {
        background: $solar-yellow;
        border-bottom: 2px solid lighten($color: $solar-yellow, $amount: 20%);
    }
}

.full-width {
    display: block;
    width: 100%;
}
</style>
