const { Schema, model } = require("mongoose"); // создание схемы и модели

const contactSchema = new Schema(
  //  первый агрумент - описывает схему
  {
    name: {
      type: String,
      required: [true, "Please, set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  // второй аргумент - обьект настроек
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

const Contact = model("contact", contactSchema); // первый аргумент - название коллекции с которой эта модель будет работать в единственном числе. второй аргумент - схема

module.exports = Contact;
