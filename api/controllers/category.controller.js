const Category= require('../models/category.model')

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: req.query
    })

    if (!categories) {
      res.status(404).json({
        message: 'No category found',
        result: categories
      })
    }

    res.status(200).json({
      message: "All category fetched",
      result: categories,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error getting all category",
      result: error,
    });
  }
}

const getOneCategory = async (req, res) => {
  try {
    const category= await Category.findByPk(req.params.id)

    if (!category) {
      res.status(404).json({
        message: "No Category found",
        result: category,
      });
    }

    res.status(200).json({
      message: "Category fetched",
      result: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error getting one Category",
      result: error,
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const category= await Category.create(req.body)

    res.status(201).json({
      message: 'Category created',
      result: category
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Error creating Category',
      result: error
    })
  }
}

const updateOneCategory = async (req, res) => {
  try {
    const [result] = await Category.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (result === 0) {
      res.status(404).json({
        message: "No Category found",
        result: result,
      });
    }

    res.status(200).json({
      message: "Category updated",
      result: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating Category",
      result: error,
    });
  }
};

const deleteOneCategory = async (req, res) => {
  try {
    const category= await Category.destroy(
    {
      where: {
        id: req.params.id,
      },
    });

    if (!category) {
      res.status(404).json({
        message: "No Category found",
        result: category,
      });
    }

    res.status(200).json({
      message: "Category deleted",
      result: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error getting one Category",
      result: error,
    });
  }
};

const getCategoryJokes = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id)

    if (!category) {
      res.status(404).json({
        message: "No Category found",
        result: category,
      });
    }
    
    const jokes = await category.getJokes() //Lazy loading

    res.status(200).json({
      message: "Category Jokes fetched",
      result: jokes,
    });
  } catch (error) {
  console.log(error);
    res.status(500).json({
      message: "Error getting one Category",
      result: error,
    });
  }
}

module.exports = {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateOneCategory,
  deleteOneCategory,
  getCategoryJokes
}