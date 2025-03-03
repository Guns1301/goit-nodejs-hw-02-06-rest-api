const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { Subscription } = require("../helpers/constants");

const subscriptionOptions = Object.values(Subscription);

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "Awesome Guest",
    },

    password: {
      type: String,
      required: [true, "Password is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
    },
    avatarURL: {
      type: String,
      default: function () {
        // Setting up gravatars link as a default avatar
        return gravatar.url(this.email, { size: "250" }, true);
      },
    },
    subscription: {
      type: String,
      enum: subscriptionOptions,
      default: Subscription.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verification token is required"],
      default: uuid(),
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
    // соль (salt) - это дополнительный аргумент который делает строку еще более усложенной при хэшировании
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password); // сравнение введенного пароля и захэшированного из базы - если совпадает, метод compare возвращает true
};

const User = model("user", userSchema);

module.exports = User;
