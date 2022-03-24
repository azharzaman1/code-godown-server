import Snippet from "../models/snippetModal.js";
import User from "../models/auth/userModal.js";

export const addSnippet = async (req, res) => {
  const userID = req.body.userID;
  const snippet = req.body.snippet;
  console.log(req.body);

  try {
    const added = await Snippet.create(snippet);

    if (!added) {
      res.statusMessage = "Unable to post";
      return res.sendStatus(500);
    }

    console.log("Snippet Added", added);

    const foundUser = await User.findById(userID).exec();
    if (!foundUser) {
      res.statusMessage = "Not Found";
      res.sendStatus(404);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { snippets: [...foundUser.snippets, added._doc._id] },
      {
        new: true,
      }
    ).exec();

    // ...foundUser.snippets, added._doc._id

    if (!updatedUser) {
      res.statusMessage = "Unable to update";
      res.sendStatus(500);
    }

    console.log("Updated User", updatedUser);

    res.statusMessage = "Added successfully";
    res.status(201).json({ added, updatedUser });
  } catch (err) {
    res.statusMessage = err.message;
    console.log(err.message);
  }
};

export const getSnippets = async (req, res) => {
  try {
    const found = await Snippet.find().exec();
    if (!found) {
      res.statusMessage = "Nothing Found";
      return res.sendStatus(204);
    }
    res.statusMessage = "Data Found";
    res.status(200).json({ found });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const getManySnippets = async (req, res) => {
  const ids = req.body.ids;
  try {
    const result = await Snippet.find({
      _id: { $in: ids },
    });

    if (!result) {
      res.statusMessage = "Nothing Found";
      return res.sendStatus(204);
    }
    res.statusMessage = "Data Found";
    res.status(200).json({ result });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const getSnippetById = async (req, res) => {
  const id = req.params.id;
  try {
    const found = await Snippet.findOne({ slug: id }).exec();
    if (!found) {
      res.statusMessage = "Data Found";
      return res.sendStatus(204);
    }

    res.status(200).json({ message: `Found`, found });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const updateSnippet = async (req, res) => {
  const id = req.params.id || req.body.id;

  try {
    const updated = await Snippet.findOneAndUpdate({ slug: id }, req.body, {
      new: true,
    }).exec();

    if (!updated) {
      res.statusMessage = "Not Found";
      return res.sendStatus(404);
    }
    res.statusMessage = "Updated";
    res.status(201).json({ updated });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const deleteSnippet = async (req, res) => {
  const id = req.params.id || req.body.id;
  const found = await Snippet.findOne({ slug: id }).exec();
  if (!found) {
    res.statusMessage = "Not Found";
    return res.sendStatus(404);
  }

  try {
    const deleted = await Snippet.deleteOne({ slug: id }).exec();

    if (!deleted) {
      res.statusMessage = "Unable to delete";
      return res.sendStatus(500);
    }
    res.statusMessage = "Deleted";
    res.status(200).json({ deleted });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};
