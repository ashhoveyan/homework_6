const posts = [];

export default {
    createPost (req, res) {
        const { title, description, userId } = req.body;
        const post = { id: posts.length + 1, title, description, userId };
        posts.push(post);
        res.status(201).json({ message: 'Post created successfully', post });
    },
    getPosts (req, res) {
        const { userId } = req.query;
        if (userId) {
            const userPosts = posts.filter(post => post.userId === parseInt(userId));
            res.status(200).json(userPosts);
        } else {
            res.status(200).json(posts);
        }
    },
    getSinglePost (req, res) {
        const post = posts.find(p => p.id === parseInt(req.params.id));
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    },
    updatePost  (req, res)  {
        const { id } = req.params;
        const { title, description, userId } = req.body;
        const post = posts.find(p => p.id === parseInt(id));
        if (post) {
            post.title = title;
            post.description = description;
            post.userId = userId;
            res.status(200).json({ message: 'Post updated successfully', post });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    },
    deletePost (req, res)  {
        const { id } = req.params;
        const index = posts.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            posts.splice(index, 1);
            res.status(200).json({ message: 'Post deleted successfully' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    }
}