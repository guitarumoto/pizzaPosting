const { Post } = require('../models');

exports.createPost = async (req, res) => {
    const { title, description, ingredients, price } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const userId = req.user.id;

    try {
        const newPost = await Post.create({
            title,
            description,
            ingredients,
            price,
            imageUrl,
            userId,
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Erro ao criar a publicação." });
    }
};

