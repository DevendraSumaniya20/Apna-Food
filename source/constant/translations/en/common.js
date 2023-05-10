const emailMaxLength = 50;
const passwordMaxLength = 30;

const Errors = {
  EmailRequired: 'Please enter your email',
  EmailInvalid: 'Please enter a valid email',
  EmailMaxLength: `Email must be less than ${emailMaxLength} characters`,
  PasswordRequired: 'Please enter your password',
  PasswordMinLength: 'Please enter at least 5 characters',
  PasswordMaxLength: `Password must be less than ${passwordMaxLength} characters`,
  PasswordInvalid:
    'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
  Generic: 'An error has occurred. Please try again later.',
};

export default {
  hey: 'Hey',
  languageSelector: 'Select a language',
  Login: 'Login',
  Password: 'Password',
  SignUp: 'Sign Up',
  EnterAnEmailorPhone: 'Enter an email or phone number',
  EnteraPassword: 'Enter a password',
  ForgetPassword: 'Forgot Password',
  DontHaveanAccount: "Don't have an account?",
  EmailError: Errors.EmailRequired,
  EmailProper: Errors.EmailInvalid,
  EmailLength: Errors.EmailMaxLength,
  PasswordError: Errors.PasswordRequired,
  PasswordLessCharacters: Errors.PasswordMinLength,
  PasswordLength: Errors.PasswordMaxLength,
  PasswordRegex: Errors.PasswordInvalid,
  Back: 'Back',
  RestaurantList: 'Restaurant List',
  Error: 'Error',
  Pleasetryagainlater: Errors.Generic,
  GotoDwarka: "Let's go to Dwarka",
  MapView: 'Map View',
  Email_To_Long: 'Your email is too long',
  Forgot_Password: 'Forgot Password',
  ForgotPasswordTextDesc:
    'Please enter the email associated with your account to reset your password.',
  Forgot_Password_Placeholder_EmailText: 'Enter your email',
  Forgot_Password_Submit: 'Submit',
};
