class Utils {
  static EmptyValueValidator = (value) => {
    return value.trim().length === 0;
  };

  static PhoneNumberValidator = (phoneNumber) => {
    return (
      phoneNumber.trim().match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/) !== null &&
      phoneNumber.trim().length > 0
    );
  };

  static RandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };
}

export default Utils;
