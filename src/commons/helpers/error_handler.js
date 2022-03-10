exports.okCreate = async (res, data, extra) => {
  const result = {
    success: true,
    statusCode: 201,
    message: 'Success Create Data',
    data,
    ...extra,
  };
  res.status(201).json(result);
};

exports.okSend = async (res, data, extra) => {
  const result = {
    success: true,
    statusCode: 201,
    message: 'Success Send Data',
    data,
    ...extra,
  };
  res.status(201).json(result);
};

exports.okRead = async (res, data, extra) => {
  const result = {
    success: true,
    statusCode: 200,
    message: 'Success Read Data',
    data,
    ...extra,
  };
  res.status(200).json(result);
};

exports.okDeleted = async (res, data, extra) => {
  const result = {
    success: true,
    statusCode: 200,
    message: 'Success Deleted',
    data,
    ...extra,
  };
  res.status(200).json(result);
};

exports.okPut = (res, data, extra) => {
  const result = {
    success: true,
    statusCode: 200,
    message: 'Success Put (Update/Replace) Data',
    data,
    ...extra,
  };

  res.status(200).json(result);
};

exports.okPatch = async (res, data, extra) => {
  const result = {
    success: true,
    statusCode: 200,
    message: 'Success Patch (Update/Modify) Data',
    data,
    ...extra,
  };

  res.status(200).json(result);
};

exports.dataNotFound = async (res, data, extra) => {
  const result = {
    success: false,
    statusCode: 404,
    message: 'Data Not Found',
    data,
    ...extra,
  };
  res.status(404).json(result);
};

exports.conflictExist = async (res, data, extra) => {
  const result = {
    success: false,
    statusCode: 409,
    message: 'Data Already Exist',
    data,
    ...extra,
  };

  res.status(409).json(result);
};

exports.conflictExist = async (res, data, extra) => {
  const result = {
    success: false,
    statusCode: 409,
    message: 'Data Already Exist',
    data,
    ...extra,
  };

  res.status(409).json(result);
};

exports.validationInvalid = async (res, errors, extra) => {
  const result = {
    success: false,
    statusCode: 422,
    message: 'invalid validation',
    errors,
    ...extra,
  };
  res.status(422).json(result);
};

exports.notFound = async (res, data, extra) => {
  const result = {
    success: false,
    statusCode: 404,
    message: 'Not Found',
    data,
    ...extra,
  };
  res.status(404).json(result);
};

exports.forbidden = async (res, data, extra) => {
  const result = {
    success: false,
    statusCode: 403,
    message: 'Forbidden',
    data,
    ...extra,
  };
  res.status(403).json(result);
};

exports.failed = async (res, data, message) => {
  const result = {
    success: false,
    statusCode: 500,
    data,
    message,
  };
  res.status(500).json(result);
};
