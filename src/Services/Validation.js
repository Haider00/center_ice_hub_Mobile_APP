import { Component } from 'react';

class Validation extends Component {
  emailValidation(email) {
    var res = false;
    if (email != null) {
      if (email.length === 0) {
        res = 'Please enter an email address';
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        res = 'Please enter an email in correct format';
      } else {
        res = true;
      }
    }
    return res;
  }

  countryValidation(country) {
    var res = false;
    if (country != null) {
      if (country.length === 0) {
        res = 'Please enter a country';
      } else {
        res = true;
      }
    }
    return res;
  }

  dateofbirthValidation(Dateofbirth) {
    var res = false;
    if (Dateofbirth != null) {
      if (Dateofbirth.length === 0) {
        res = 'Please enter Date of Birth';
      } else {
        res = true;
      }
    }
    return res;
  }

  nameValidation(name) {
    var res = false;
    if (name != null) {
      if (name.length === 0) {
        res = 'Please enter a name';
      } else if (name.length > 16) {
        res = 'Please enter a name no more than 16 characters';
      } else if (name.length < 3) {
        res = 'Please enter a name at least 3 characters';
      } else {
        res = true;
      }
    }
    return res;
  }

  ageValidation(age) {
    var res = false;
    if (age != null) {
      if (age === '') {
        res = 'Please enter age';
      } else if (age < 5) {
        res = 'Age must be greater than 5 years';
      } else if (age > 100) {
        res = 'Age must be less than 100 years';
      } else {
        res = true;
      }
    }
    return res;
  }

  cityValidation(city) {
    var res = false;
    if (city != null) {
      if (city.length === 0) {
        res = 'Please enter a city';
      } else if (city.length > 25) {
        res = 'Please enter a city no more than 25 characters.';
      } else if (city.length < 3) {
        res = 'Please enter a city at least 3 characters.';
      } else {
        res = '';
      }
    }

    return res;
  }

  passwordValidation(pass) {
    var res = false;
    if (pass != null) {
      if (pass.length === 0) {
        res = 'Please enter a password';
      } else if (pass.length < 6) {
        res = 'Please enter a password at least 6 characters.';
      } else {
        res = true;
      }
    }

    return res;
  }

  confirmPasswordValidation(pass, confirmPass) {
    var res = false;
    if (confirmPass != null) {
      if (confirmPass.length === 0) {
        res = 'Please re-enter password';
      } else if (confirmPass !== pass) {
        res = 'Password not matched';
      } else {
        res = true;
      }
    }

    return res;
  }

  sexValidation(sex) {
    var res = false;
    if (sex != null) {
      if (sex === '') {
        res = 'Please enter a gender';
      } else if (sex === 'Sex') {
        res = 'Please enter a gender';
      } else {
        res = '';
      }
    }
    return res;
  }
}

export default Validation;
