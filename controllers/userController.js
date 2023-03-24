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
    const user = await importedRestaurant.create(req.body);
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
      data: restaurant,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
    console.log("error:", err);
  }
};

export const depositAccount = asyncHandler(async (req, res) => {
  let account = await importedUser.findById(req.params.id);
  if (!account) {
    res.status(404);
    throw new Error("account is not found");
  }

  const { cash } = req.body;

  if (cash != null) {
    if (cash < 1) {
      res.status(404);
      throw new Error("You can just deposit money");
    }
    account.cash += Number(cash);
  }

  const updatedCash = await importedUser.findByIdAndUpdate(
    req.params.id,
    account
  );

  res.status(200).json(updatedCash);
});

export const updateCredit = asyncHandler(async (req, res) => {
  let account = await importedUser.findById(req.params.id);
  if (!account) {
    res.status(404);
    throw new Error("account is not found");
  }

  const { credit } = req.body;

  if (credit != null) {
    if (account.credit + credit < 0) {
      res.status(403);
      throw new Error("Credit limit exceeded");
    } else if (account.cash + credit < 0) {
      res.status(403);
      throw new Error("Cash limit exceeded");
    } else {
      account.credit += credit;
      account.cash += credit;
    }
  }

  const updatedCredit = await importedUser.findByIdAndUpdate(
    req.params.id,
    account
  );

  res.status(200).json(updatedCredit);
});
