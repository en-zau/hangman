<script>
export default {
    name: 'LetterSimple',
    props: {
        letter: {
            type: String,
            required: true
        }
    }
}
</script>

<template>
    <button>{{ letter }}</button>
</template>