
const Codes = {
  Required: 'required',
  Invalid: 'invalid',
  TooShort: 'too_short',
  TooLong: 'too_long',
  TooEarly: 'too_early',
  TooLate: 'too_late',
  Duplicate: 'duplicate',
};

const Required = {
  presence: {
    allowEmpty: false,
    message: Codes.Required,
  },
};

const Email = {
  email: {
    message: Codes.Invalid,
  },
};

const Length = (min, max) => {
  const val = {
    length: {},
  };
  if (min && max && min === max) {
    val.length = {
      is: min, wrongLength: Codes.Invalid,
    };
    return val;
  }
  if (min) {
    val.length = {
      minimum: min, tooShort: Codes.TooShort,
    };
  }
  if (max) {
    val.length = {
      maximum: max, tooLong: Codes.TooLong,
    };
  }
  return val;
};

const DateTime = (min, max, dateOnly = false) => {
  const val = {
    datetime: {
      dateOnly,
      notValid: Codes.Invalid,
    },
  };
  if (min) {
    val.datetime = {
      earliest: min,
      tooEarly: Codes.TooEarly,
    };
  }
  if (max) {
    val.datetime = {
      latest: max,
      tooLate: Codes.TooLate,
    };
  }
  return val;
};

const BooleanType = {
  type: {
    type: 'boolean',
    message: Codes.Invalid,
  },
};

const GeoJSON = type => ({
  geojson: {
    type,
    message: Codes.Invalid,
  },
});

module.exports = {
  Codes,
  Required,
  Email,
  Length,
  DateTime,
  BooleanType,
  GeoJSON,
};
