const validate = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  // Trim values to prevent empty spaces from passing validation
  if (!firstName?.trim() || !lastName?.trim()) {
    throw new Error("First name and last name are required.");
  }

  if (!validate.isEmail(emailId?.trim())) {
    throw new Error("Please provide a valid email address.");
  }

  if (!validate.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol."
    );
  }
};

const editoptions = (req)=>{

  const allowedFields = [
 "firstName" , "lastName", "age", "gender" 
  ]

  const iseditAllowed = Object.keys(req.body).every(field => allowedFields.includes(field));

  return iseditAllowed;



}


module.exports = { validateSignUpData, editoptions };

