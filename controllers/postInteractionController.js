const { Comment, Like } = require('../models');

exports.addComment = async (req, res) => {
  const { content, postId } = req.body;
  try {
    const comment = await Comment.create({
      content,
      postId
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao adicionar comentário." });
  }
};

exports.getPostInteraction = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.findAll({
      where: { postId },
      attributes: ['postId','content']
    });

    const likesCount = await Like.count({
      where: { postId }
    });

    res.json({
      comments,
      likesCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar comentários e likes." });
  }
};

exports.addLike = async (req, res) => {
  const { postId } = req.body;

  try {
    const like = await Like.create({ postId });
    res.status(201).json({ message: "Publicação curtida com sucesso!", likeId: like.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao curtir a publicação." });
  }
};