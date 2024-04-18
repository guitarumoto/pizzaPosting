const { Post, User, Sequelize } = require('../models');
const Op = Sequelize.Op;

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

exports.getPosts = async (req, res) => {
    const { ingredients, maxPrice } = req.query;

    let whereClause = {};
    if (ingredients) {
        const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());
        whereClause.ingredients = {
            [Op.or]: ingredientsArray.map(ingredient => ({
                [Op.like]: `%${ingredient}%`
            }))
        };
    }
    if (maxPrice) {
        whereClause.price = { [Op.lte]: Number(maxPrice) };
    }

    try {
        const posts = await Post.findAll({
            where: whereClause,
            include: [{ model: User, as: 'user', attributes: ['name', 'email'] }]
        });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Erro ao buscar publicações." });
    }
};
