import ProgrammingLang from "../models/programmingLangModal.js";

const getAllProgrammingLangs = async (req, res) => {
  try {
    const langs = await ProgrammingLang.find().exec();
    if (!langs) {
      res.statusMessage = "Nothing found";
      res.sendStatus(404);
    }

    res.statusMessage = "Data found";
    res.status(200).json({ data: langs });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

const postProgrammingLang = async (req, res) => {
  console.log("Called");
  const language = req.body;
  console.log(req.body);
  try {
    const posted = await ProgrammingLang.create(language);
    if (!posted) {
      res.statusMessage = "Unable to post";
      res.sendStatus(500);
    }

    console.log("Posted", posted);

    res.sendStatus(201);
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export { getAllProgrammingLangs, postProgrammingLang };
