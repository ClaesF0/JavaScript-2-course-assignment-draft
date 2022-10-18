const {resolve} = require('path');

export default {
    build: {
        rollupOptions: {
            input: {
                signIn: resolve(__dirname, 'signin.html'),
                signUp: resolve(__dirname, 'signup.html'),
                index: resolve(__dirname, 'index.html'),
                profile: resolve(__dirname, 'profile.html'),
                createPost: resolve(__dirname, 'create-post.html'),
                myPosts: resolve(__dirname, 'my-posts.html'),
                singlePost: resolve(__dirname, 'single-post.html'),
                editPost: resolve(__dirname, 'edit-post.html'),

            },
        },
    },
};
