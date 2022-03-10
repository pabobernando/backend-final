const mongoose = require('mongoose');
const { Schema } = mongoose;
const AutoINcrement = require('mongoose-sequence')(mongoose);

// 1. buat schema baru dengan nama userSchema
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: false,
      //required: [true, 'field username must be fill in '],
      minlength: 3,
      maxlength: 8,
    },
    userId: {
      type: Number,
    },
    email: {
      type: String,
      required: [true, 'field email must be fill in '],
      maxlength: [255, 'Panjang email maksimal 255 karakter'],
    },
    password: {
      type: String,
      required: [true, 'Password email must be fill in '],
      // minlength: 3,
      maxlength: [255, 'Panjang Password maksimal 255 karakter'],
    },
    experience: {
      type: String,
      required: false,
    },
    lvl: {
      type: String,
      required: false,
    },
    totalScore: {
      type: Number,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    socialMediaUrl: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    token: [String],
  },
  {
    timestamps: true,
  }
);

// gimana cara memindahkan  1 & 2 ke controller agar schemanya rapih

//1. validasi email sesuai dengan parameter email
userSchema.path('email').validate(
  function (value) {
    // (1) email regular expression
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    // (2) test email, hasilnya adalah `true` atau `false`
    // jika ternyata `true` maka validasi berhasil
    // jika ternyata `false` maka validasi gagal
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} harus merupakan email yang valid`
);

// 2. tambahkan auto increment pada field userID
userSchema.plugin(AutoINcrement, { inc_field: 'userId' });

userSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('User', userSchema);
