exports.usersignupvalidator = (req,res,next) =>
{
  //name is not null and length- 4-10
  req.check("name","Name is required").notEmpty();
  
  // email is not null and valid
  req.check("email","email must between 2 to 20 letter ")
  .matches(/.+\@.+\..+/)
  .withMessage("Email must contain @")
  .isLength({min:4,  max:2000})
  // .withMessage("Email must contain at least 4 letter")

  //password
  req.check("password","password is required").notEmpty();
  req.check("password")
  .isLength({min:6})
  .withMessage("Password must contain at least 6 characters")
  .matches(/\d/)
  .withMessage("password must contain a number")

  //error
  const errors = req.validationErrors()
  if(errors)
  {
    const firsterror = errors.map((error) => error.msg)[0]
    return res.status(400).json({error: firsterror})
  }

  next();
}