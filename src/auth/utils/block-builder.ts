export class BlockBuilder {

  static login() {
    return [
      {
        type: 'input',
        name: 'email',
        label: 'Email',
      },
      {
        type: 'input',
        name: 'password',
        label: 'Password',
        inputType: 'password'
      },
      {
        type: 'button',
        label: 'Login',
        action: 'SUBMIT_LOGIN'
      }
    ];
  }

  static otp() {
    return [
      {
        type: 'input',
        name: 'otp',
        label: 'Enter OTP',
      },
      {
        type: 'button',
        label: 'Verify OTP',
        action: 'VERIFY_OTP'
      }
    ];
  }

  static twoFA() {
    return [
      {
        type: 'input',
        name: 'code',
        label: '2FA Code',
      },
      {
        type: 'button',
        label: 'Verify',
        action: 'VERIFY_2FA'
      }
    ];
  }
}
