import mongoose from "mongoose";
// import slugify from "slugify";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name of account"],
    // trim: true,
    unique: [true, "Name's account has already exists"],
    maxlength: [20, "Name is 20 characters max"],
  },
  //   slug: String,
  cash: {
    type: Number,
    required: [true, "Please add a cash"],
  },
  credit: {
    type: Number,
    required: [true, "Please add a credit"],
  },
  // toJSON: {
  //   // virtuals: true,
  //   transform: function (_, ret) {
  //     ret.id = ret._id;
  //     delete ret._id;
  //     delete ret._v;
  //   },
  // },
  // toObject: {
  //   // virtuals: true,
  //   transform: function (_, ret) {
  //     ret.id = ret._id;
  //     delete ret._id;
  //     delete ret.__v;
  //   },
  // },
});

// RestaurantsSchema.pre("save", function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

export default mongoose.model("user", UserSchema);
