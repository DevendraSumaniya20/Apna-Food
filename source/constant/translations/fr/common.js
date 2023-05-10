const emailMaxLength = 50;
const passwordMaxLength = 30;

const Errors = {
  EmailRequired: 'Veuillez saisir votre adresse e-mail',
  EmailInvalid: 'Veuillez saisir une adresse e-mail valide',
  EmailMaxLength: `L'adresse e-mail doit comporter moins de ${emailMaxLength} caractères`,
  PasswordRequired: 'Veuillez saisir votre mot de passe',
  PasswordMinLength: `Le mot de passe doit comporter au moins 5 caractères`,
  PasswordMaxLength: `Le mot de passe doit comporter moins de ${passwordMaxLength} caractères`,
  PasswordInvalid: `Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial `,
  Generic: 'Une erreur est survenue. Veuillez réessayer plus tard.',
};

export default {
  hey: 'Salut',
  languageSelector: 'Sélectionner une langue',
  Login: 'Connexion',
  Password: 'Mot de passe',
  SignUp: "S'inscrire",
  EnterAnEmailorPhone: 'Saisir une adresse e-mail ou un numéro de téléphone',
  EnteraPassword: 'Saisir un mot de passe',
  ForgetPassword: 'Mot de passe oublié',
  DontHaveanAccount: "Vous n'avez pas de compte?",
  EmailError: Errors.EmailRequired,
  EmailProper: Errors.EmailInvalid,
  EmailLength: Errors.EmailMaxLength,
  PasswordError: Errors.PasswordRequired,
  PasswordLessCharacters: Errors.PasswordMinLength,
  PasswordLength: Errors.PasswordMaxLength,
  PasswordRegex: Errors.PasswordInvalid,
  Back: 'Retour',
  RestaurantList: 'Liste des restaurants',
  Error: 'Erreur',
  Pleasetryagainlater: Errors.Generic,
  GotoDwarka: 'Allons à Dwarka',
  MapView: 'Vue de la carte',
  Email_To_Long: 'Votre adresse e-mail est trop longue',
  Forgot_Password: 'Mot de passe oublié',
  ForgotPasswordTextDesc: `Veuillez saisir l'adresse e-mail associée à votre compte pour réinitialiser votre mot de passe.`,
  Forgot_Password_Placeholder_EmailText: 'Saisir votre adresse e-mail',
  Forgot_Password_Submit: 'Soumettre',
};
