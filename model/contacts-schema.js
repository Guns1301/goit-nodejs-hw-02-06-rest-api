const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please, set name for contact."],
      // свойство required отвечает является ли поле обязательным. если true - обязательное
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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
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

contactSchema.plugin(mongoosePaginate);

const Contact = model("contact", contactSchema); // первый аргумент - название коллекции с которой эта модель будет работать в единственном числе. второй аргумент - схема

module.exports = Contact;
