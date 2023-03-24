import importedUser from "../modules/user.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await importedUser.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
    console.log("error:", err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await importedUser.create(req.body);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
    console.log("error:", err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await importedUser.findById(req.params.id);
    if (!user) {
      return new Error(`${req.params.id} not found`);
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
    console.log("error:", err);
  }
};

export const depositAccountAndUpdatedCredit = async (req, res) => {
  let account = await importedUser.findById(req.params.id);
  if (!account) {
    res.status(404);
    throw new Error("account is not found");
  }

  const { cash, credit } = req.body;

  if (cash != null) {
    if (Number(cash) < 1) {
      res.status(404);
      throw new Error("You can just deposit money");
    }
    account.cash += Number(cash);
  }
  if (credit != null) {
    if (account.credit + Number(credit) < 0) {
      res.status(403);
      throw new Error("Credit limit exceeded");
    } else if (account.cash + Number(credit) < 0) {
      res.status(403);
      throw new Error("Cash limit exceeded");
    } else {
      account.credit += Number(credit);
      account.cash += Number(credit);
    }
  }

  const updatedData = await importedUser.findByIdAndUpdate(
    req.params.id,
    account
  );

  res.status(200).json(updatedData);
};

export const transferring = async (req, res) => {
  let theGiver = await importedUser.findById(req.params.id1);
  // let theGiver = await importedUser.findOne({name: req.params.id1});
  let theReceiver = await importedUser.findById(req.params.id2);

  if (!theGiver) {
    res.status(404);
    throw new Error("The giver is not found");
  }
  if (!theReceiver) {
    res.status(404);
    throw new Error("The receiver is not found");
  }

  const { credit } = req.body;

  if (credit != null) {
    if (Number(credit) < 0) {
      res.status(404);
      throw new Error("It must be a positive number");
    }
    if (theGiver.credit - Number(credit) < 0) {
      res.status(403);
      throw new Error("Credit limit of the giver exceeded");
    }
    theGiver.credit -= Number(credit);
    theReceiver.credit += Number(credit);
  }

  const updatedGiver = await importedUser.findByIdAndUpdate(
    // theGiver._id,
    // theGiver,
    // {
    //   new: true,
    //   runValidators: true,
    // }
    req.params.id1,
    theGiver,
    { new: true, runValidators: true }
  );
  const updatedReceiver = await importedUser.findByIdAndUpdate(
    // theReceiver._id,
    // theReceiver,
    // {
    //   new: true,
    //   runValidators: true,
    // }
    req.params.id2,
    theReceiver,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: { updatedGiver, updatedReceiver },
  });
};
